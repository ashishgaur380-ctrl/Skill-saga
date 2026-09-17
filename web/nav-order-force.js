/* Skill Saga — global learner bottom navigation order
 * Keeps the five primary learner destinations in one fixed order:
 * Home → Learn → Play → Compete → Profile
 * UI/navigation presentation only; does not replace destination logic.
 */
(function(){
'use strict';
var observer=null, bodyObserver=null;
var order=['home','learn','play','compete','profile'];
function nav(){return document.querySelector('.nav')}
function addCss(){
  if(document.getElementById('ss-nav-order-css'))return;
  var s=document.createElement('style');s.id='ss-nav-order-css';s.textContent=`
.nav{display:flex!important}
.nav button[data-s="home"]{order:1!important}
.nav button[data-s="learn"]{order:2!important}
.nav button[data-s="play"]{order:3!important}
.nav button[data-s="compete"]{order:4!important}
.nav button[data-s="profile"]{order:5!important}
`;
  document.head.appendChild(s);
}
function normalize(){
  var n=nav();
  if(!n)return false;
  addCss();
  var buttons=Array.prototype.slice.call(n.querySelectorAll('button'));
  var primary=[];
  order.forEach(function(key){
    var b=buttons.find(function(x){return x.dataset&&x.dataset.s===key});
    if(b)primary.push(b);
  });
  if(primary.length<2)return false;
  var changed=false;
  primary.forEach(function(b,i){if(n.children[i]!==b)changed=true});
  if(!changed)return true;
  if(observer)observer.disconnect();
  primary.forEach(function(b){n.appendChild(b)});
  if(observer)observer.observe(n,{childList:true});
  return true;
}
function install(){
  addCss();
  var n=nav();
  if(!n)return false;
  if(observer)observer.disconnect();
  normalize();
  observer=new MutationObserver(function(){normalize()});
  observer.observe(n,{childList:true});
  return true;
}
function start(){
  addCss();
  install();
  if(bodyObserver)bodyObserver.disconnect();
  bodyObserver=new MutationObserver(function(){
    addCss();
    var n=nav();
    if(n)install();
  });
  if(document.body)bodyObserver.observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
window.addEventListener('pageshow',start);
window.ssNavOrderForce={start:start,normalize:normalize};
})();
