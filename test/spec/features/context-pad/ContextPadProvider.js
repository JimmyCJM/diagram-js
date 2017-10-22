'use strict';

var fs = require('fs');


class ContextPadProvider {
  constructor(contextPad) {
    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {

    if (element.type === 'A') {
      return {
        'action.a': {
          imageUrl: 'data:image/png;base64,' + fs.readFileSync(__dirname + '/resources/a.png', 'base64'),
          action: function(e) {
            e.__handled = true;
          }
        },
        'action.b': {
          imageUrl: 'data:image/png;base64,' + fs.readFileSync(__dirname + '/resources/b.png', 'base64'),
          action: function(e) {
            e.__handled = true;
          }
        }
      };
    } else
    if (element.type === 'drag') {
      return {
        'action.dragstart': {
          className: 'drag-out',
          action: {
            dragstart: function(e) {
              e.__handled = true;
            }
          }
        }
      };
    } else {
      return {
        'action.c': {
          imageUrl: 'data:image/png;base64,' + fs.readFileSync(__dirname + '/resources/c.png', 'base64'),
          action: function(e) {
            e.__handled = true;
          }
        },
        'action.no-image': {
          action: function(e) {
            e.__handled = true;
          }
        }
      };
    }
  }
}

ContextPadProvider.$inject = [ 'contextPad' ];

module.exports = ContextPadProvider;