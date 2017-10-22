'use strict';

import { forEach } from 'min-dash/lib/collection';

var LOW_PRIORITY = 250;

/**
 * The tool manager acts as middle-man between the available tool's and the Palette,
 * it takes care of making sure that the correct active state is set.
 *
 * @param  {Object}    eventBus
 * @param  {Object}    dragging
 */
export default class ToolManager {

  constructor(eventBus, dragging) {
    this._eventBus = eventBus;
    this._dragging = dragging;

    this._tools = [];
    this._active = null;
  }

  registerTool(name, events) {
    var tools = this._tools;

    if (!events) {
      throw new Error('A tool has to be registered with it\'s "events"');
    }

    tools.push(name);

    this.bindEvents(name, events);
  }

  isActive(tool) {
    return tool && this._active === tool;
  }

  length(tool) {
    return this._tools.length;
  }

  setActive(tool) {
    var eventBus = this._eventBus;

    if (this._active !== tool) {
      this._active = tool;

      eventBus.fire('tool-manager.update', { tool: tool });
    }
  }

  bindEvents(name, events) {
    var eventBus = this._eventBus,
        dragging = this._dragging;

    var eventsToRegister = [];

    eventBus.on(events.tool + '.init', (event) => {
      var context = event.context;

      // Active tools that want to reactivate themselves must do this explicitly
      if (!context.reactivate && this.isActive(name)) {
        this.setActive(null);

        dragging.cancel();
        return;
      }

      this.setActive(name);

    });

    // Todo[ricardo]: add test cases
    forEach(events, function(event) {
      eventsToRegister.push(event + '.ended');
      eventsToRegister.push(event + '.canceled');
    });

    eventBus.on(eventsToRegister, LOW_PRIORITY, (event) => {
      var originalEvent = event.originalEvent;

      // We defer the de-activation of the tool to the .activate phase,
      // so we're able to check if we want to toggle off the current active tool or switch to a new one
      if (!this._active ||
          (originalEvent && originalEvent.target.parentNode.getAttribute('data-group') === 'tools')) {
        return;
      }

      this.setActive(null);
    });
  }
}

ToolManager.$inject = [
  'eventBus',
  'dragging'
];
