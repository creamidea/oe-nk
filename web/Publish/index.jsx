require('./publish.scss')
require('./publish-console.scss')
var PropTypes = React.PropTypes
var TopBar = require('./TopBar')

var Publish = React.createClass({

  getInitialState () {
    var ws = new WebSocket('ws://' + window.location.hostname + ':3001'),
      oldSend = ws.send;
    ws.send = function(message) {
      if (typeof message === 'string' || message instanceof String) {} else {
        message = JSON.stringify(message)
      }
      return oldSend.apply(ws, [message])
    }
    ws.onmessage = this.handleMessage.bind(this);
    return {ws: ws, readOnly: true}
  },

  handleMessage (message) {
    var editor = this.editor;
    var data = JSON.parse(message.data);
    var session = editor.getSession();
    var prefix = '$ ';
    if (data.path)
      prefix = `${data.path} ${prefix}`;
    if (data.command)
      editor.insert(prefix + data.command + '\n')
    if (data.stdout)
      editor.insert(data.stdout + '\n');

    //Get the number of lines
    var count = session.getLength();
    //Go to end of the last line
    editor.gotoLine(count + 1);
    editor.focus()
    // editor.gotoLine(count, session.getLine(count-1).length);
  },
  toggleReadOnly () {
    this.editor.setOptions({readOnly: true, highlightActiveLine: false, highlightGutterLine: false});
    editor.renderer.$cursorLayer.element.style.opacity = 0
  },

  publish () {
    var consoleWrapper = this.refs.consoleWrapper.getDOMNode();
    consoleWrapper.style.display = 'block';
    this.editor.insert('Publish....\n');
    this.state.ws.send({
      command: 'publish',
      argv: []
    })
  },

  changeHandler (e) {
    window.timer = setTimeout(function() {
      // console.log(e);
      // console.log(editor.getCursorPosition());
      var action = e.action,
        lines = e.lines

    }, 300)
  },

  componentDidMount () {
    // console.log(this.refs.publishConsole.getDOMNode())
    var publishConsole = this.refs.publishConsole.getDOMNode()
    var editor = ace.edit(publishConsole)
    var timer = null
    // editor.setOptions({readOnly: true, highlightActiveLine: false, highlightGutterLine: false})
    editor.renderer.setShowGutter(false);
    editor.$blockScrolling = Infinity;
    editor.setTheme("ace/theme/terminal");
    editor.session.setMode("ace/mode/text");
    editor.on('change', this.changeHandler);
    editor.on('paste', function(e) {
      console.log(e)
    });
    editor.on('changeCursor', function() {
      console.log(e)
    });
    this.editor = editor
  },

  render () {
    return (
      <div>
        <div className="console-wrapper" ref="consoleWrapper">
          <TopBar/>
          <div className="publish-console" ref="publishConsole"></div>
        </div>
        <button className="publish" onClick={this.publish}>Publish</button>
      </div>
    );
  }

});

module.exports = Publish
