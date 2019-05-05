import {MDCRipple} from '@material/ripple/index';
import {MDCSelect} from '@material/select';

const ripple = new MDCRipple(document.querySelector('.mdc-button'));
const select = new MDCSelect(document.querySelector('.mdc-select'));
const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
  return new MDCRipple(el);
});