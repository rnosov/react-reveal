/*
 * React-reveal Global Helpers
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

export const namespace = 'react-reveal';
export let ssr = true, disableSsr = () => ssr = false, globalHide = false;
let counter = 1, effectMap = {}, sheet = false;

export function insertRule(rule) {
  try {
    return sheet.insertRule(rule, sheet.cssRules.length);
  }
  catch(e){
    console.warn('react-reveal - animation failed');
  }
}

export function animation(effect, to = false) {
  if (!sheet) return '';
    const rule = `
        @keyframes ${namespace}-animation-${counter} {
          ${effect}
          ${to?'to {opacity: 1;transform: none;}':''}
        }
      `;
    const effectId = effectMap[effect];
    if (!effectId){
      sheet.insertRule(rule, sheet.cssRules.length);
      effectMap[effect] = counter;
      return `${namespace}-animation-${counter++}`;
    }
    return `${namespace}-animation-${effectId}`;
  //return function() {
  //}
}

function hideAll() {
  window.removeEventListener('scroll', hideAll, true);
  insertRule(`.${namespace} { visibility: hidden; opacity: 0; }`);
  window.removeEventListener('orientationchange', hideAll, true);
  window.document.removeEventListener('visibilitychange', hideAll);
  globalHide = true;
}

//navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")
if (typeof window !== 'undefined' && window.name !== 'nodejs' && window.document && typeof navigator !== 'undefined') { // are we in browser?
  ssr = window.document.querySelectorAll('div[data-reactroot]').length>0; // are we prerendered?
  //if (ssr && 'serviceWorker' in navigator && navigator.serviceWorker.controller) //cached by service worker?
  //  ssr = false;
  //console.log(Date.now() - window.performance.timing.domLoading<500);
  if (ssr && 'performance' in window
      && 'timing' in window.performance
      && 'domContentLoadedEventEnd' in window.performance.timing
      && window.performance.timing.domLoading
      && Date.now() - window.performance.timing.domLoading<500)
    ssr = false;
  let element = document.createElement('style');
  document.head.appendChild(element);
  if (element.sheet && element.sheet.cssRules && element.sheet.insertRule) {
    sheet = element.sheet;
    window.addEventListener('scroll', hideAll, true);
    window.addEventListener("orientationchange", hideAll, true);
    window.document.addEventListener("visibilitychange", hideAll);
  }
}
