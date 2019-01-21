/*
*  Custom Events
*
*  import { EventBus } from './event-bus.js';
*
*  dispatch
*  EventBus.$emit(EventBus.CLICK_ALERT, param);
*
*  addEventListener
*  EventBus.$on(EventBus.CLICK_ALERT, this.hideContent);
* */

import Vue from 'vue';

export const EventBus = new Vue();
EventBus.SHOW_CONTENT = 'showContent';
EventBus.SHOW_CONTENT_COMPLETE = 'showContentComplete';
EventBus.SHOW_LIST = 'showList';
EventBus.SHOW_LIST_COMPLETE = 'showListComplete';