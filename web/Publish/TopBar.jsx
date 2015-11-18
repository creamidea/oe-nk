var PropTypes = React.PropTypes

var TopBar = React.createClass({

  render: function() {
    return (
      <div className="top-bar">
        <div className="button-group">
          <div className="close"></div>
          <div className="minimun"></div>
          <div className="maximun"></div>
          <div className="title">OENK Publish Console</div>
        </div>
      </div>
    );
  }

});

module.exports = TopBar
