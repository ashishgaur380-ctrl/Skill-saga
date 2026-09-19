/* Skill Saga — permanent learner bottom navigation lock
 * Always keeps: Home → Learn → Play → Compete → Profile.
 * Uses CSS order instead of moving DOM nodes, so legacy renderers cannot make
 * Play/Learn/Compete jump when another screen (especially Profile) is opened.
 */
(function(){
'use strict';
var order=['home','learn','play','compete','profile'];
var timer=null,bodyObserver=null;
function nav(){return document.querySelector('.nav')}
function key(b){
 if(!b)return '';
 var d=b.dataset&&String(b.dataset.s||'').toLowerCase();
 if(d){ for(var i=0;i<order.length;i++) if(d===order[i]) return d; }
 var oc=String(b.getAttribute('onclick')||'').toLowerCase();
 for(var j=0;j<order.length;j++){
   if(oc.indexOf("'"+order[j]+"'")>=0||oc.indexOf('"'+order[j]+'"')>=0)return order[j];
 }
 var t=String(b.textContent||'').trim().toLowerCase().replace(/\s+/g,' ');
 for(var k=0;k<order.length;k++) if(t===order[k]||t.indexOf(order[k]+' ')===0||t.indexOf(' '+order[k])>=0)return order[k];
 return '';
}
function css(){
 if(document.getElementById('ss-fixed-nav-css'))return;
 var s=document.createElement('style');s.id='ss-fixed-nav-css';
 s.textContent='.nav{display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;grid-auto-flow:row!important;align-items:stretch!important;width:100%!important}.nav>button{min-width:0!important;width:100%!important;margin:0!important;transform:none!important}';
 document.head.appendChild(s);
}
function normalize(){
 css();
 var n=nav();if(!n)return false;
 var bs=Array.prototype.slice.call(n.querySelectorAll(':scope > button')),seen={};
 bs.forEach(function(b){
   var k=key(b);
   if(k&&!seen[k])seen[k]=b;
 });
 var count=0;
 order.forEach(function(k,i){
   var b=seen[k];
   if(b){b.style.setProperty('order',String(i+1),'important');b.style.setProperty('transform','none','important');count++;}
 });
 return count>=2;
}
function start(){
 css();normalize();
 if(timer)clearInterval(timer);
 timer=setInterval(normalize,100);
 if(bodyObserver)bodyObserver.disconnect();
 if(document.body){bodyObserver=new MutationObserver(function(){normalize()});bodyObserver.observe(document.body,{childList:true,subtree:true});}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
window.addEventListener('pageshow',start);
window.ssNavOrderForce={start:start,normalize:normalize};
})();
