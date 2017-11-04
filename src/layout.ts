import { Injectable } from '@angular/core';

@Injectable()
export class Layout {

  colors = {
    primary:    '#488aff',
    secondary:  '#ff3d00',
    danger:     '#f53d3d',
    light:      '#ffffff',
    dark:       '#ff9e80',
    darklight:  '#212121'
  };

  constructor() {}

  setBackgroundColor(type) {
    const color = {
      'background-color': this.colors[type]
    }

    return color;
  }

  setColor(type) {
    const color = {
      'color': this.colors[type]
    }

    return color;
  }

  setStripedColor(i, even, odd) {
    const color = {
      'background-color': (i%2 === 0) ? this.colors[even] : this.colors[odd],
      'color': this.colors.light
    }

    return color;
  }

  setToolbarColor(selector, typeBackground, typeTitle) {
    const backgroundColor = this.colors[typeBackground];
    const color = this.colors[typeTitle];

    const toolbar = document.querySelectorAll(selector + ' .toolbar-background');

    [].forEach.call(toolbar, function(elem) {
      elem.style.backgroundColor = backgroundColor;
    });

    const toolbarTitle = document.querySelectorAll(selector + ' .toolbar-title');

    [].forEach.call(toolbarTitle, function(elem) {
      elem.style.color = color;
    });

    const backButton = document.querySelectorAll(selector + ' .back-button');

    [].forEach.call(backButton, function(elem) {
      elem.style.color = color;
    });
  }

  setCalendarColor(selector) {
    const secondary = this.colors.secondary;
    const dark = this.colors.dark;
    const darklight = this.colors.darklight;
    const light = this.colors.light;

    const calendarTableHeaders = document.querySelectorAll('.monthview-datetable thead tr th');

    [].forEach.call(calendarTableHeaders, function(elem) {
      elem.style.border = '1px solid ' + darklight + ' !important';
      elem.style.color = light;
    });

    const calendarTableColumns = document.querySelectorAll('.monthview-datetable tbody tr td');

    [].forEach.call(calendarTableColumns, function(elem) {
      elem.style.border = '1px solid ' + darklight + ' !important';
      elem.style.color = light;
    });

    const calendarEventDetailItem = document.querySelectorAll(selector + ' .event-detail-container .item');

    [].forEach.call(calendarEventDetailItem, function(elem, i) {
      elem.style.backgroundColor = (i%2 === 0) ? dark : darklight;
      elem.style.color = light;
    });

    Array.from(document.getElementsByClassName('monthview-current')).forEach(
      function(element, index, array) {
        element.setAttribute('style', 'background-color: ' + secondary + ' !important; color: ' + light + ';');
    });

    Array.from(document.getElementsByClassName('no-events-label')).forEach(
      function(element, index, array) {
        element.setAttribute('style', 'color: ' + light + '');
    });
  }

  setSegmentButtonColor() {
    const darklight = this.colors.darklight;
    const light = this.colors.light;

    Array.from(document.getElementsByClassName('segment-button')).forEach(
      function(element, index, array) {
        element.setAttribute('style', 'color: ' + light + '; border: ' + light + '');
    });

    Array.from(document.getElementsByClassName('segment-activated')).forEach(
      function(element, index, array) {
        element.setAttribute('style', 'background-color: ' + darklight + '; border: ' + darklight + '; color: ' + light + '');
    });
  }

  setAlertColor() {
    const secondary = this.colors.secondary;
    const darklight = this.colors.darklight;
    const light = this.colors.light;

    const alertWrapper = document.querySelectorAll('.alert-wrapper');

    [].forEach.call(alertWrapper, function(elem, i) {
      elem.style.backgroundColor = darklight;
      elem.style.display = 'block';
    });

    const alertMainFields = document.querySelectorAll('.alert-title, .alert-message, .alert-radio-label');

    [].forEach.call(alertMainFields, function(elem, i) {
      elem.style.color = light;
    });

    const alertSubFields = document.querySelectorAll('.alert-sub-title');

    [].forEach.call(alertSubFields, function(elem, i) {
      elem.style.color = darklight;
    });

    const alertButtons = document.querySelectorAll('.alert-button');

    [].forEach.call(alertButtons, function(elem, i) {
      elem.style.backgroundColor = secondary;
      elem.style.color = darklight;
    });

    const alertActivatedButton = document.querySelectorAll('.alert-button .activated');

    [].forEach.call(alertActivatedButton, function(elem, i) {
      elem.style.backgroundColor = secondary;
    });

    const alertInputWrapper = document.querySelectorAll('.alert-input-wrapper');

    [].forEach.call(alertInputWrapper, function(elem, i) {
      elem.style.borderBottom = '1px solid ' + secondary;
    });

    const alertInputWrapperInput = document.querySelectorAll('.alert-input-wrapper input');

    [].forEach.call(alertInputWrapperInput, function(elem, i) {
      elem.style.color = secondary;
    });

    const alertRadioInner = document.querySelectorAll('.alert-radio-inner');

    [].forEach.call(alertRadioInner, function(elem, i) {
      elem.style.color = secondary;
    });

  }

}
