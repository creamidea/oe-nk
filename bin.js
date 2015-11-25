#!/usr/bin/env node

'use strict'

/*
 * 脚本被单独使用的时候调用的代码
 * node bin.js
 */

var child_process = require('child_process')
var child1, child2

if (process.argv.length > 3) {
  console.log('COMMAND error! The comment must be wrapped by ""');
  console.log('e.g. $ node deploy.js "The comment you want to input."')
  process.exit(0)
} else {
  child1 = child_process.fork(__dirname + '/deploy.js', ['articles', '_articles _draft static README.org', process.argv[2]])
  child2 = child_process.fork(__dirname + '/deploy.js', ['master', '.', process.argv[2]])
  child1.on('exit', function() {
    console.log(`Process:${this.pid} published ${this.spawnargs[2]} over.`)
  })
  child2.on('exit', function() {
    console.log(`Process:${this.pid} published ${this.spawnargs[2]} over.`)
  })
}
