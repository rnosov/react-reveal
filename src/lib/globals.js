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
let id = 0, counter = 1, effectMap = {}, sheet = false;

export function insertRule(rule) {
  //console.log(rule);
  try {
    return sheet.insertRule(rule, sheet.cssRules.length);
  } 
  catch(e){
    console.warn('react-reveal - animation failed');
  }
}

export function deleteRule(index) {
  return !sheet||sheet.deleteRule(index);
}

export function animation(effect, to = true) {
  return function() {
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
  }
}

export const newId = () => ++id;
function hideAll() {  
  window.removeEventListener('scroll', hideAll, true); 
  insertRule(`.${namespace} { visibility: hidden; opacity: 0; }`);
  window.removeEventListener('orientationchange', hideAll, true); 
  globalHide = true;
}

//navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")
if (typeof window !== 'undefined' && window.name !== 'nodejs' && window.document) { // are we in browser?
  ssr = window.document.querySelectorAll('div[data-reactroot]').length>0; // are we prerendered?
  let element = document.createElement('style');
  document.head.appendChild(element);
  if (element.sheet && element.sheet.cssRules && element.sheet.insertRule && element.sheet.deleteRule) {    
    sheet = element.sheet;
    window.addEventListener('scroll', hideAll, true);
    window.addEventListener("orientationchange", hideAll, true);
  }
}
export const ruleMap = [];
