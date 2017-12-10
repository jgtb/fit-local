import { Injectable } from '@angular/core'

@Injectable()
export class Layout {

  loginColors = {
    secondary:  '#ffd400',
    light:      '#f4f4f4',
    darklight:  '#2b2b2b'
  }

  colors = {
    primary:    '#004d40',
    secondary:  '#222',
    danger:     '#004d40',
    light:      '#ffffff',
    dark:       '#191919',
    darklight:  '#1e1e1e'
  }

  constructor() {}

  setBackgroundColor(type) {
    const color = {
      'background-color': this.colors[type]
    }

    return color
  }

  setColor(type) {
    const color = {
      'color': this.colors[type]
    }

    return color
  }

  setStripedColor(i, even, odd) {
    const color = {
      'background-color': (i%2 === 0) ? this.colors[even] : this.colors[odd],
      'color': this.colors.light
    }

    return color
  }

  setToolbarColor(selector, typeBackground, typeTitle) {
    const backgroundColor = this.colors[typeBackground]
    const color = this.colors[typeTitle]

    const toolbar = document.querySelectorAll(selector + ' .toolbar-background');

    [].forEach.call(toolbar, function(elem) {
      elem.style.backgroundColor = backgroundColor
    })

    const toolbarTitle = document.querySelectorAll(selector + ' .toolbar-title');

    [].forEach.call(toolbarTitle, function(elem) {
      elem.style.color = color
    })

    const backButton = document.querySelectorAll(selector + ' .back-button');

    [].forEach.call(backButton, function(elem) {
      elem.style.color = color
    })
  }

  setCalendarColor(selector) {
    const secondary = this.colors.secondary
    const dark = this.colors.dark
    const darklight = this.colors.darklight
    const light = this.colors.light

    const calendarTableHeaders = document.querySelectorAll('.monthview-datetable thead tr th');

    [].forEach.call(calendarTableHeaders, function(elem) {
      elem.style.border = '1px solid ' + darklight + ' !important'
      elem.style.color = light
    })

    const calendarTableColumns = document.querySelectorAll('.monthview-datetable tbody tr td');

    [].forEach.call(calendarTableColumns, function(elem) {
      elem.style.border = '1px solid ' + darklight + ' !important'
      elem.style.color = light
    })

    const calendarEventDetailItem = document.querySelectorAll('.' + selector + ' .event-detail-container .item');

    [].forEach.call(calendarEventDetailItem, function(elem, i) {
      elem.style.backgroundColor = (i%2 === 0) ? dark : darklight
      elem.style.color = light
    })

    Array.from(document.getElementsByClassName('monthview-current')).forEach(
      function(element, index, array) {
        element.setAttribute('style', 'background-color: ' + secondary + ' !important; color: ' + light + ';')
    })

    Array.from(document.getElementsByClassName('no-events-label')).forEach(
      function(element, index, array) {
        element.setAttribute('style', 'color: ' + light + '')
    })
  }

  setSegmentButtonColor() {
    const darklight = this.colors.darklight
    const light = this.colors.light

    Array.from(document.getElementsByClassName('segment-button')).forEach(
      function(element, index, array) {
        element.setAttribute('style', 'color: ' + light + '; border: ' + light + '')
    })

    Array.from(document.getElementsByClassName('segment-activated')).forEach(
      function(element, index, array) {
        element.setAttribute('style', 'background-color: ' + darklight + '; border: ' + darklight + '; color: ' + light + '')
    })
  }

  setAlertColor(colorsType) {
    const secondary = colorsType ? this.colors.secondary : this.loginColors.secondary
    const darklight = colorsType ? this.colors.darklight : this.loginColors.darklight
    const light = colorsType ? this.colors.light : this.loginColors.light

    const alertWrapper = document.querySelectorAll('.alert-wrapper');

    [].forEach.call(alertWrapper, function(elem, i) {
      elem.style.backgroundColor = darklight
      elem.style.display = 'block'
    })

    const alertMainFields = document.querySelectorAll('.alert-title, .alert-message, .alert-radio-label');

    [].forEach.call(alertMainFields, function(elem, i) {
      elem.style.color = light
    })

    const alertSubFields = document.querySelectorAll('.alert-sub-title');

    [].forEach.call(alertSubFields, function(elem, i) {
      elem.style.color = light
    })

    const alertButtons = document.querySelectorAll('.alert-button');

    [].forEach.call(alertButtons, function(elem, i) {
      elem.style.backgroundColor = secondary
      elem.style.color = light
    })

    const alertActivatedButton = document.querySelectorAll('.alert-button .activated');

    [].forEach.call(alertActivatedButton, function(elem, i) {
      elem.style.backgroundColor = light
    })

    const alertInputWrapper = document.querySelectorAll('.alert-input-wrapper');

    [].forEach.call(alertInputWrapper, function(elem, i) {
      elem.style.borderBottom = '1px solid ' + secondary
    })

    const alertInputWrapperInput = document.querySelectorAll('.alert-input-wrapper input');

    [].forEach.call(alertInputWrapperInput, function(elem, i) {
      elem.style.color = light
    })

    const alertRadioInner = document.querySelectorAll('.alert-radio-inner');

    [].forEach.call(alertRadioInner, function(elem, i) {
      elem.style.color = light
      elem.style.borderColor = light
    })

  }

}
