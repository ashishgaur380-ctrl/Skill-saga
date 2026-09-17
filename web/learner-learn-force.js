/* Skill Saga — Learn force renderer
 * Ensures the approved Learn UI wins over the legacy Learn renderer.
 * UI only; preserves the existing Learn -> Chapter -> Topic -> Lesson -> Practice flow.
 */
(function(){
'use strict';
var timer=null, observer=null, busy=false;
function root(){return document.querySelector('.ss-final')}
function looksLikeLearn(){
  var r=root(); if(!r) return false;
  if(r.querySelector('.lrn')) return false;
  var t=(r.innerText||'').replace(/\s+/g,' ');
  return /Select Your Class/i.test(t) || (/Academic/.test(t) && /Skills/.test(t) && /Other/.test(t));
}
function render(){
  if(busy || !looksLikeLearn()) return false;
  if(typeof window.ssLearnClasses!=='function') return false;
  busy=true;
  try{ Promise.resolve(window.ssLearnClasses()).finally(function(){busy=false}) }catch(e){busy=false}
  return true;
}
function install(){
  var r=root(); if(!r) return false;
  if(observer) observer.disconnect();
  observer=new MutationObserver(function(){
    if(busy) return;
    if(looksLikeLearn()) render();
  });
  observer.observe(r,{childList:true,subtree:true});
  render();
  return true;
}
function start(){
  var n=0;
  if(timer) return;
  timer=setInterval(function(){
    n++;
    if(install() || n>80){clearInterval(timer);timer=null}
  },250);
  install();
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
window.addEventListener('pageshow',start);
window.ssLearnForce={start:start,render:render};
})();
