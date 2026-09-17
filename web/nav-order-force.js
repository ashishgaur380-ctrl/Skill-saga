/* Skill Saga — fixed learner bottom navigation
 * Always keeps: Home → Learn → Play → Compete → Profile.
 * Works with modern data-s buttons and legacy buttons that only expose text/onclick.
 */
(function(){
'use strict';
var order=['home','learn','play','compete','profile'],timer=null,bodyObserver=null;
function nav(){return document.querySelector('.nav')}
function key(b){
 if(!b)return '';
 var d=b.dataset&&String(b.dataset.s||'').toLowerCase();if(d)return d;
 var oc=String(b.getAttribute('onclick')||'').toLowerCase();
 for(var i=0;i<order.length;i++)if(oc.indexOf("'"+order[i]+"'")>=0||oc.indexOf('"'+order[i]+'"')>=0)return order[i];
 var t=String(b.textContent||'').trim().toLowerCase().replace(/\s+/g,' ');
 for(var j=0;j<order.length;j++)if(t===order[j]||t.indexOf(order[j]+' ')===0||t.indexOf(' '+order[j])>=0)return order[j];
 return '';
}
function css(){if(document.getElementById('ss-fixed-nav-css'))return;var s=document.createElement('style');s.id='ss-fixed-nav-css';s.textContent='.nav{display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;grid-auto-flow:column!important;align-items:stretch!important;width:100%!important}.nav>button{min-width:0!important;width:100%!important;margin:0!important;transform:none!important;order:initial!important}';document.head.appendChild(s)}
function normalize(){css();var n=nav();if(!n)return false;var bs=Array.prototype.slice.call(n.querySelectorAll(':scope > button')),found={};bs.forEach(function(b){var k=key(b);if(k&&!found[k])found[k]=b});var p=order.map(function(k){return found[k]}).filter(Boolean);if(p.length<2)return false;var changed=false;p.forEach(function(b,i){if(n.children[i]!==b)changed=true});if(changed)p.forEach(function(b){n.appendChild(b)});p.forEach(function(b){b.style.transform='none';b.style.order='initial'});return true}
function start(){css();normalize();if(timer)clearInterval(timer);var tries=0;timer=setInterval(function(){normalize();if(++tries>=30)clearInterval(timer)},150);if(bodyObserver)bodyObserver.disconnect();if(document.body){bodyObserver=new MutationObserver(function(){normalize()});bodyObserver.observe(document.body,{childList:true,subtree:true})}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();window.addEventListener('pageshow',start);window.ssNavOrderForce={start:start,normalize:normalize};
})();
