/* Skill Saga — global learner bottom navigation order
 * Keeps the five primary learner destinations in one fixed order:
 * Home → Learn → Play → Compete → Profile
 * UI/navigation presentation only; does not replace destination logic.
 */
(function(){
'use strict';
var observer=null;
var order=['home','learn','play','compete','profile'];
function nav(){return document.querySelector('.nav')}
function normalize(){
  var n=nav();
  if(!n)return false;
  var buttons=Array.prototype.slice.call(n.querySelectorAll('button'));
  var primary=[];
  order.forEach(function(key){
    var b=buttons.find(function(x){return x.dataset&&x.dataset.s===key});
    if(b)primary.push(b);
  });
  if(primary.length<2)return false;
  var changed=false;
  primary.forEach(function(b,i){
    if(n.children[i]!==b)changed=true;
  });
  if(!changed)return true;
  if(observer)observer.disconnect();
  primary.forEach(function(b){n.appendChild(b)});
  if(observer)observer.observe(n,{childList:true});
  return true;
}
function install(){
  var n=nav();
  if(!n)return false;
  if(observer)observer.disconnect();
  normalize();
  observer=new MutationObserver(function(){normalize()});
  observer.observe(n,{childList:true});
  return true;
}
function start(){
  var tries=0;
  var t=setInterval(function(){tries++;if(install()||tries>80)clearInterval(t)},250);
  install();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
window.addEventListener('pageshow',start);
window.ssNavOrderForce={start:start,normalize:normalize};
})();
