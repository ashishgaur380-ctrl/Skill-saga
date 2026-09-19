/* Skill Saga — Learn force renderer
 * Ensures the approved Learn UI is the only Learn content shown.
 * UI only; preserves the existing Learn -> Chapter -> Topic -> Lesson -> Practice flow.
 */
(function(){
'use strict';
var timer=null,observer=null,busy=false;
function root(){return document.querySelector('.ss-final')}
function clean(){
  var r=root();if(!r)return false;
  var l=r.querySelector(':scope > .lrn') || r.querySelector('.lrn');
  if(!l)return false;
  /* The legacy renderer can append its Academic/Skills/Other blocks as siblings.
     Keep the new Learn tree and remove only those legacy sibling nodes. */
  Array.prototype.slice.call(r.children).forEach(function(ch){
    if(ch!==l && !ch.contains(l)) ch.remove();
  });
  /* If legacy markup was inserted inside the Learn wrapper, keep only the lrn tree. */
  Array.prototype.slice.call(l.parentElement===r?r.children:[]).forEach(function(ch){
    if(ch!==l)ch.remove();
  });
  return true;
}
function looksLikeLegacy(r){
  if(!r)return false;
  var t=(r.innerText||'').replace(/\s+/g,' ');
  return /Academic/.test(t)&&/Skills/.test(t)&&/Other/.test(t);
}
function render(){
  var r=root();if(!r)return false;
  if(!window.ssLearnClasses||typeof window.ssLearnClasses!=='function')return false;
  if(r.querySelector('.lrn')){clean();return true}
  if(!looksLikeLegacy(r))return false;
  if(busy)return false;
  busy=true;
  try{
    Promise.resolve(window.ssLearnClasses()).then(function(){clean()}).catch(function(){}).finally(function(){busy=false});
  }catch(e){busy=false}
  return true;
}
function install(){
  var r=root();if(!r)return false;
  if(observer)observer.disconnect();
  observer=new MutationObserver(function(){
    if(busy)return;
    if(r.querySelector('.lrn'))clean();
    else if(looksLikeLegacy(r))render();
  });
  observer.observe(r,{childList:true,subtree:true});
  render();
  return !!r.querySelector('.lrn');
}
function start(){
  var n=0;if(timer)return;
  timer=setInterval(function(){n++;if(install()||n>120){clearInterval(timer);timer=null}},250);
  install();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
window.addEventListener('pageshow',start);
window.ssLearnForce={start:start,render:render,clean:clean};
})();
