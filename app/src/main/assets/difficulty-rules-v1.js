/* Skill Saga — Difficulty Rules v1
 * Final distribution: Easy 40%, Medium 40%, Hard 20%.
 */
(function(){
'use strict';
var KEY='SKILL_SAGA_DIFFICULTY_RULES_V1';
var LEVELS=Object.freeze({EASY:1,MEDIUM:2,HARD:3});
var LABELS=Object.freeze({1:'🟢 Easy',2:'🟡 Medium',3:'🔴 Hard'});
var WEIGHTS=Object.freeze({1:.40,2:.40,3:.20});
function level(v){var n=Number(v);return n===1||n===2||n===3?n:2;}
function label(v){return LABELS[level(v)];}
function distribution(total){
 total=Math.max(0,Number(total)||0); var e=Math.floor(total*.40),m=Math.floor(total*.40),h=total-e-m;return {easy:e,medium:m,hard:h,total:total};
}
function rebalance(items){
 items=Array.isArray(items)?items.slice():[];
 var groups={1:[],2:[],3:[]}; items.forEach(function(q){groups[level(q&&q.difficulty)].push(q);});
 var target=distribution(items.length); var wanted={1:target.easy,2:target.medium,3:target.hard};
 [1,2,3].forEach(function(d){while(groups[d].length>wanted[d]){var q=groups[d].pop();var dest=[1,2,3].find(function(x){return groups[x].length<wanted[x];});if(dest)groups[dest].push(Object.assign({},q,{difficulty:dest}));else break;}});
 return [].concat(groups[1],groups[2],groups[3]);
}
window.SKILL_SAGA_DIFFICULTY_RULES={levels:LEVELS,labels:LABELS,weights:WEIGHTS,normalize:level,label:label,distribution:distribution,rebalance:rebalance};
window.SKILL_SAGA_DIFFICULTY_LABEL=label;
})();
