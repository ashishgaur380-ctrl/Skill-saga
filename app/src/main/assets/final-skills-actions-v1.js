/* Skill Saga — Skills / Skill DNA interaction layer v1 */
(function(){'use strict';
function toast(m){if(typeof window.toast==='function')window.toast(m)}
function tx(e){return((e&&e.textContent)||'').replace(/\s+/g,' ').trim()}
function cleanDuplicates(){
 document.querySelectorAll('.ss-home-skills,.skills,.ss-cards').forEach(function(parent){
   var seen={};Array.prototype.slice.call(parent.children).forEach(function(el){var s=tx(el).toLowerCase();var names=['reasoning','numerical','scientific thinking','vocabulary','communication','problem solving'];var n=names.find(function(x){return s.indexOf(x)>=0});if(!n)return;if(seen[n]){el.setAttribute('data-ss-duplicate','1');el.style.display='none'}else seen[n]=el});
 });
}
function openDetail(el){var name=tx(el).replace(/\b\d+%?\b/g,'').replace(/\bskill mastery\b/i,'').trim();window.SKILL_SAGA_SELECTED_SKILL=name;toast(name+' selected. Skill details and practice are ready.')}
function install(){if(window.__SS_SKILLS_ACTIONS_V1)return;window.__SS_SKILLS_ACTIONS_V1=true;cleanDuplicates();var mo=new MutationObserver(function(){setTimeout(cleanDuplicates,0)});mo.observe(document.body,{childList:true,subtree:true});document.addEventListener('click',function(e){var t=e.target;if(!t||!t.closest)return;if(t.closest('.nav'))return;var el=t.closest('.ss-home-skill,.ss-home-skills .ss-card,.ss-card.center,.skill');if(!el)return;var s=tx(el).toLowerCase();if(/reasoning|numerical|scientific thinking|vocabulary|problem solving|communication/.test(s)){e.preventDefault();e.stopImmediatePropagation();openDetail(el)}},true)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();