'use strict';

var Model = require('../model');

var assign = require('lodash/object/assign');

/**
 * A factory for diagram-js shapes
 */
class ElementFactory {
  constructor() {
    this._uid = 12;
  }

  createRoot(attrs) {
    return this.create('root', attrs);
  }

  createLabel(attrs) {
    return this.create('label', attrs);
  }

  createShape(attrs) {
    return this.create('shape', attrs);
  }

  createConnection(attrs) {
    return this.create('connection', attrs);
  }

  /**
   * Create a model element with the given type and
   * a number of pre-set attributes.
   *
   * @param  {String} type
   * @param  {Object} attrs
   * @return {djs.model.Base} the newly created model instance
   */
  create(type, attrs) {

    attrs = assign({}, attrs || {});

    if (!attrs.id) {
      attrs.id = type + '_' + (this._uid++);
    }

    return Model.create(type, attrs);
  }
}

module.exports = ElementFactory;