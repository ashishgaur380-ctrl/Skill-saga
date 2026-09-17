/* Skill Saga — Learn class horizontal swipe selector
 * UI layer only. Keeps the existing Learn class change event and data flow.
 */
(function(){
'use strict';
var observer=null;
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function css(){
 if(document.getElementById('ss-learn-class-swipe-css'))return;
 var s=document.createElement('style');s.id='ss-learn-class-swipe-css';s.textContent=`
 .lrn-class .lrn-select{display:none!important}
 .lrn-class-strip-wrap{position:relative;margin-top:13px}
 .lrn-class-strip{display:flex;gap:8px;overflow-x:auto;overflow-y:hidden;padding:3px 2px 9px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;cursor:grab;touch-action:pan-x}
 .lrn-class-strip::-webkit-scrollbar{display:none}
 .lrn-class-chip{flex:0 0 58px;height:48px;border:1px solid #d6e0ee;border-radius:14px;background:#fff;color:#172744;font-size:12px;font-weight:900;box-shadow:0 4px 12px #18355b10;scroll-snap-align:center;cursor:pointer;transition:.18s ease}
 .lrn-class-chip.active{background:#1769ff;border-color:#1769ff;color:#fff;box-shadow:0 6px 15px #1769ff33;transform:translateY(-1px)}
 .lrn-class-chip:active{transform:scale(.97)}
 .lrn-class-hint{text-align:center;font-size:8px;color:#71819a;font-weight:800;margin-top:1px}
 .lrn-class-strip-wrap:before,.lrn-class-strip-wrap:after{content:'';position:absolute;top:0;bottom:18px;width:18px;z-index:2;pointer-events:none}
 .lrn-class-strip-wrap:before{left:0;background:linear-gradient(90deg,#f4f9ff,transparent)}
 .lrn-class-strip-wrap:after{right:0;background:linear-gradient(270deg,#f4f9ff,transparent)}
 `;document.head.appendChild(s);
}
function enhance(){
 css();
 var select=document.getElementById('ssLearnClassSelect');
 if(!select)return false;
 var old=select.parentElement;
 var existing=old.parentElement.querySelector('.lrn-class-strip-wrap');
 if(existing){sync(select,existing);return true}
 var wrap=document.createElement('div');wrap.className='lrn-class-strip-wrap';
 var strip=document.createElement('div');strip.className='lrn-class-strip';strip.setAttribute('aria-label','Choose class');
 Array.prototype.slice.call(select.options).forEach(function(opt){
   var b=document.createElement('button');b.type='button';b.className='lrn-class-chip';b.dataset.value=opt.value;b.textContent='Class '+opt.value;
   b.onclick=function(){
     select.value=opt.value;
     select.dispatchEvent(new Event('change',{bubbles:true}));
     setTimeout(function(){sync(select,wrap)},0);
   };
   strip.appendChild(b);
 });
 var hint=document.createElement('div');hint.className='lrn-class-hint';hint.textContent='Swipe left or right to choose a class';
 wrap.appendChild(strip);wrap.appendChild(hint);old.parentElement.appendChild(wrap);
 sync(select,wrap);return true;
}
function sync(select,wrap){
 Array.prototype.forEach.call(wrap.querySelectorAll('.lrn-class-chip'),function(b){b.classList.toggle('active',String(b.dataset.value)===String(select.value))});
 var a=wrap.querySelector('.lrn-class-chip.active');
 if(a){try{a.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'})}catch(e){}}
}
function install(){
 var r=document.querySelector('.ss-final');if(!r)return false;
 if(observer)observer.disconnect();
 observer=new MutationObserver(function(){enhance()});observer.observe(r,{childList:true,subtree:true});
 return enhance();
}
function start(){var n=0,t=setInterval(function(){n++;if(install()||n>100)clearInterval(t)},250);install()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
window.addEventListener('pageshow',start);window.ssLearnClassSwipe={start:start,enhance:enhance};
})();
