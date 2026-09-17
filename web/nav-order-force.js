/* Skill Saga — global learner bottom navigation order
 * Fixed order on every learner screen: Home → Learn → Play → Compete → Profile.
 * Presentation/navigation layer only; destination logic is untouched.
 */
(function(){
'use strict';
var observer=null;
var order=['home','learn','play','compete','profile'];
function nav(){return document.querySelector('.nav')}
function keyOf(b){
  if(!b)return '';
  var d=b.dataset||{};
  if(d.s)return String(d.s).toLowerCase();
  var a=(b.getAttribute('onclick')||'').toLowerCase();
  for(var i=0;i<order.length;i++)if(a.indexOf("'"+order[i]+"'")>=0||a.indexOf('"'+order[i]+'"')>=0||a.indexOf('go('+order[i])>=0)return order[i];
  var text=(b.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();
  if(text.indexOf('home')>=0)return 'home';
  if(text.indexOf('learn')>=0)return 'learn';
  if(text.indexOf('play')>=0)return 'play';
  if(text.indexOf('compete')>=0)return 'compete';
  if(text.indexOf('profile')>=0)return 'profile';
  return '';
}
function normalize(){
  var n=nav();if(!n)return false;
  var buttons=Array.prototype.slice.call(n.querySelectorAll('button'));
  var by={};buttons.forEach(function(b){var k=keyOf(b);if(k&&!by[k])by[k]=b});
  var primary=order.map(function(k){return by[k]}).filter(Boolean);
  if(primary.length<2)return false;
  var changed=primary.some(function(b,i){return n.children[i]!==b});
  if(!changed)return true;
  if(observer)observer.disconnect();
  primary.forEach(function(b){n.appendChild(b)});
  if(observer)observer.observe(n,{childList:true});
  return true;
}
function install(){var n=nav();if(!n)return false;if(observer)observer.disconnect();normalize();observer=new MutationObserver(function(){normalize()});observer.observe(n,{childList:true});return true}
function start(){var tries=0;var t=setInterval(function(){tries++;if(install()||tries>80)clearInterval(t)},250);install()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
window.addEventListener('pageshow',start);window.ssNavOrderForce={start:start,normalize:normalize};
})();
