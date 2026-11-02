(()=>{
const catalog = [
  {
    "id": "squat",
    "name": "Bodyweight squat",
    "group": "Legs",
    "equipment": "bodyweight",
    "difficulty": "beginner",
    "cues": [
      "Stand with feet comfortably apart.",
      "Sit down between your hips, keeping your heels grounded.",
      "Stand tall without locking your knees."
    ],
    "timed": false
  },
  {
    "id": "wall-pushup",
    "name": "Wall push-up",
    "group": "Push",
    "equipment": "bodyweight",
    "difficulty": "beginner",
    "cues": [
      "Place palms on a stable wall at shoulder height.",
      "Keep a straight line from head to heels.",
      "Bend your elbows, then press away from the wall."
    ],
    "timed": false
  },
  {
    "id": "glute-bridge",
    "name": "Glute bridge",
    "group": "Legs",
    "equipment": "bodyweight",
    "difficulty": "beginner",
    "cues": [
      "Lie on your back with knees bent and feet flat.",
      "Lift your hips while keeping your ribs down.",
      "Lower with control."
    ],
    "timed": false
  },
  {
    "id": "dead-bug",
    "name": "Dead bug",
    "group": "Core",
    "equipment": "bodyweight",
    "difficulty": "beginner",
    "cues": [
      "Lie on your back with arms raised and knees bent.",
      "Slowly extend opposite arm and leg.",
      "Return and alternate; count each side as one repetition."
    ],
    "timed": false
  },
  {
    "id": "bird-dog",
    "name": "Bird dog",
    "group": "Core",
    "equipment": "bodyweight",
    "difficulty": "beginner",
    "cues": [
      "Start on hands and knees.",
      "Reach opposite arm and leg without rotating your hips.",
      "Return and switch sides; count each side as one repetition."
    ],
    "timed": false
  },
  {
    "id": "calf-raise",
    "name": "Standing calf raise",
    "group": "Legs",
    "equipment": "bodyweight",
    "difficulty": "beginner",
    "cues": [
      "Stand near a stable support.",
      "Rise onto the balls of your feet.",
      "Lower your heels slowly."
    ],
    "timed": false
  },
  {
    "id": "db-row",
    "name": "Dumbbell row",
    "group": "Pull",
    "equipment": "dumbbells",
    "difficulty": "beginner",
    "cues": [
      "Hinge at your hips with a neutral back.",
      "Draw your elbows toward your ribs.",
      "Lower the weights with control."
    ],
    "timed": false
  },
  {
    "id": "db-press",
    "name": "Dumbbell floor press",
    "group": "Push",
    "equipment": "dumbbells",
    "difficulty": "beginner",
    "cues": [
      "Lie on the floor with knees bent.",
      "Press the weights above your chest.",
      "Lower until your upper arms gently meet the floor."
    ],
    "timed": false
  },
  {
    "id": "band-pull",
    "name": "Band pull-apart",
    "group": "Pull",
    "equipment": "resistanceBand",
    "difficulty": "beginner",
    "cues": [
      "Hold a light band in front of your chest.",
      "Pull your hands apart without shrugging.",
      "Return slowly; inspect the band before use."
    ],
    "timed": false
  },
  {
    "id": "pushup",
    "name": "Push-up",
    "group": "Push",
    "equipment": "bodyweight",
    "difficulty": "intermediate",
    "cues": [
      "Place hands just wider than shoulders.",
      "Lower your chest while maintaining a straight torso.",
      "Press through your palms; choose wall push-ups if needed."
    ],
    "timed": false
  },
  {
    "id": "reverse-lunge",
    "name": "Reverse lunge",
    "group": "Legs",
    "equipment": "bodyweight",
    "difficulty": "intermediate",
    "cues": [
      "Stand tall and step one foot back.",
      "Bend both knees through a comfortable range.",
      "Return and alternate; count each side as one repetition."
    ],
    "timed": false
  },
  {
    "id": "plank",
    "name": "Forearm plank",
    "group": "Core",
    "equipment": "bodyweight",
    "difficulty": "intermediate",
    "cues": [
      "Place elbows under shoulders.",
      "Keep ribs and hips aligned.",
      "Breathe steadily; stop when you cannot maintain your position."
    ],
    "timed": true
  }
];

const integer=(n,min,max)=>Number.isInteger(n)&&n>=min&&n<=max;
function newId(){return [...crypto.getRandomValues(new Uint8Array(16))].map(x=>x.toString(16).padStart(2,'0')).join('');}
const emptyStore=()=>({version:1,active:null,history:[]});
function newSession(blocks,now=new Date().toISOString(),id=newId()) {
 if(!Array.isArray(blocks)||blocks.length<1||blocks.length>8)throw Error('Choose 1–8 exercises.');
 const sets=[];
 for(const b of blocks){const exercise=catalog.find(x=>x.id===b.id);if(!exercise||!integer(b.sets,1,5))throw Error('Choose a valid exercise and 1–5 sets.');for(let i=0;i<b.sets;i++)sets.push({exerciseId:b.id,ordinal:i+1,reps:null,seconds:null,loadKg:null});}
 return {id,startedAt:now,finishedAt:null,sets};
}
function logSet(session,index,reps,seconds,loadKg){
 const next=structuredClone(session),set=next?.sets?.[index],exercise=catalog.find(e=>e.id===set?.exerciseId);
 if(!exercise||!Number.isFinite(loadKg)||loadKg<0||loadKg>500)throw Error('External load must be 0–500 kg.');
 if(exercise.timed){if(!integer(seconds,1,600))throw Error('Hold duration must be 1–600 seconds.');set.seconds=seconds;set.reps=null;set.loadKg=0;}
 else{if(!integer(reps,1,100))throw Error('Repetitions must be 1–100.');set.reps=reps;set.seconds=null;set.loadKg=loadKg;}
 return next;
}
const loggedSets=s=>s.sets.filter(x=>x.reps!==null||x.seconds!==null);
function finish(store,now=new Date().toISOString()){
 if(!store.active||!loggedSets(store.active).length)throw Error('Log at least one completed set before saving.');
 return {version:1,active:null,history:[{...structuredClone(store.active),finishedAt:now},...store.history].slice(0,20)};
}
function validSession(s,finished){
 if(!s||typeof s.id!=='string'||s.id.length>80||typeof s.startedAt!=='string'||!Number.isFinite(Date.parse(s.startedAt))||(finished?!Number.isFinite(Date.parse(s.finishedAt)):s.finishedAt!==null)||!Array.isArray(s.sets)||!s.sets.length||s.sets.length>40)return false;
 return s.sets.every(x=>{const e=catalog.find(e=>e.id===x.exerciseId);if(!e||!integer(x.ordinal,1,5))return false;if(x.reps===null&&x.seconds===null&&x.loadKg===null)return true;return e.timed?x.reps===null&&integer(x.seconds,1,600)&&x.loadKg===0:x.seconds===null&&integer(x.reps,1,100)&&Number.isFinite(x.loadKg)&&x.loadKg>=0&&x.loadKg<=500;});
}
function parseStore(text){
 if(text===null)return emptyStore();
 if(typeof text!=='string'||text.length>1_000_000)throw Error('Stored demo data is too large. Export or reset it before continuing.');
 let s;try{s=JSON.parse(text);}catch{throw Error('Stored demo data could not be read. It was not replaced.');}
 if(s?.version!==1||!Array.isArray(s.history)||s.history.length>20||(s.active!==null&&!validSession(s.active,false))||!s.history.every(h=>validSession(h,true)&&loggedSets(h).length))throw Error('Stored demo data is invalid or from a different version. It was not replaced.');
 return s;
}
function persist(next,storage){const text=JSON.stringify(next);parseStore(text);storage.setItem('fitforge-portfolio-v1',text);return next;}

const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let store=emptyStore(),blocks=[],storageBlocked=false;
function say(message){$('#notice').textContent=message;}
function error(e){$('#storageError').hidden=false;$('#storageError').textContent=e.message||'The change could not be saved.';}
try{store=parseStore(localStorage.getItem('fitforge-portfolio-v1'));}catch(e){storageBlocked=true;error(e);}
function commit(next){if(storageBlocked)throw Error('Stored data could not be loaded. Reset the demo explicitly before saving new data.');try{persist(next,localStorage);}catch(e){throw Error('Could not save to browser storage. Your previous saved state has not been replaced. Check storage permissions.');}store=next;$('#storageError').hidden=true;}
const tabs=[...document.querySelectorAll('[data-tab]')];
function tab(key,focus=false){tabs.forEach(b=>{const yes=b.dataset.tab===key;b.setAttribute('aria-selected',String(yes));b.tabIndex=yes?0:-1;$('#panel-'+b.dataset.tab).hidden=!yes;});if(focus)$('#tab-'+key).focus();}
tabs.forEach((b,i)=>{b.onclick=()=>tab(b.dataset.tab);b.onkeydown=e=>{let n;if(e.key==='ArrowRight')n=(i+1)%3;if(e.key==='ArrowLeft')n=(i+2)%3;if(e.key==='Home')n=0;if(e.key==='End')n=2;if(n!==undefined){e.preventDefault();tab(tabs[n].dataset.tab,true);}};});
$('#exercise').innerHTML=catalog.map(e=>`<option value="${e.id}">${esc(e.name)} / ${esc(e.equipment)}</option>`).join('');
function renderPlan(){$('#plan').innerHTML=blocks.length?blocks.map((b,i)=>`<div class="plan-row"><span class="number">${String(i+1).padStart(2,'0')}</span><div><strong>${esc(catalog.find(e=>e.id===b.id).name)}</strong><p>${b.sets} planned sets</p></div><button data-remove="${i}" aria-label="Remove exercise ${i+1}">Remove</button></div>`).join(''):'<p class="empty">Choose an exercise to start your routine.</p>';$('#start').disabled=!blocks.length||Boolean(store.active)||storageBlocked;}
$('#builder').onsubmit=e=>{e.preventDefault();try{if(blocks.length>=8)throw Error('This demo supports up to eight exercises.');const candidate=[...blocks,{id:$('#exercise').value,sets:Number($('#sets').value)}];newSession(candidate);blocks=candidate;renderPlan();say('Exercise added to this routine. Start a workout to save it.');}catch(e){error(e);}};
$('#plan').onclick=e=>{const b=e.target.closest('[data-remove]');if(b){blocks.splice(Number(b.dataset.remove),1);renderPlan();$('#exercise').focus();}};
$('#start').onclick=()=>{try{commit({...store,active:newSession(blocks)});render();tab('active',true);say('Workout saved locally. Log the repetitions or duration you actually complete.');}catch(e){error(e);}};
function renderActive(){const s=store.active;if(!s){$('#active').innerHTML='<h2>No active workout.</h2><p class="empty">Build a routine in Plan to begin. A saved active workout will resume here after reload.</p>';return;}$('#active').innerHTML=`<div class="section-title"><h2>Active workout.</h2><span>${loggedSets(s).length} / ${s.sets.length} sets logged</span></div>${s.sets.map((set,i)=>{const e=catalog.find(e=>e.id===set.exerciseId),done=set.reps!==null||set.seconds!==null;return `<form data-set="${i}" class="set-row"><div><h3>${esc(e.name)} / set ${set.ordinal}</h3><p class="muted">${esc(e.cues[0])}</p></div><label>${e.timed?'Actual hold (seconds)':'Actual repetitions'}<input name="actual" aria-label="${e.timed?'Hold duration':'Repetitions'} for set ${i+1}" type="number" min="1" max="${e.timed?600:100}" value="${set.reps??set.seconds??''}" required></label>${e.timed?'':`<label>External load (kg)<input name="load" aria-label="External load for set ${i+1}" type="number" min="0" max="500" step="0.1" value="${set.loadKg??0}" required></label>`}<button type="submit">${done?'Update logged set':'Log completed set'}</button><span class="saved">${done?'Logged ✓':''}</span></form>`;}).join('')}<button id="finish" class="primary">Save session to history ↗</button><p class="muted small">You may save a partial session. Unlogged sets do not count as completed.</p>`;}
$('#active').onsubmit=e=>{const form=e.target.closest('[data-set]');if(!form)return;e.preventDefault();try{const i=Number(form.dataset.set),entry=new FormData(form),actual=Number(entry.get('actual')),load=Number(entry.get('load')??0);commit({...store,active:logSet(store.active,i,actual,actual,load)});render();say('Completed set saved on this browser.');$('#active').querySelector(`[data-set="${i}"] button`).focus();}catch(e){error(e);}};
$('#active').onclick=e=>{if(e.target.id==='finish'){try{commit(finish(store));render();tab('history',true);say('Session saved. Only your logged sets were counted.');}catch(e){error(e);}}};
function renderHistory(){$('#history').innerHTML=store.history.length?store.history.map(s=>`<article class="history-row"><p class="eyebrow">${esc(new Date(s.finishedAt).toLocaleString())}</p><h3>${loggedSets(s).length} logged sets / ${s.sets.length} planned</h3><p>${s.sets.filter(x=>x.reps!==null).reduce((sum,x)=>sum+x.reps,0)} repetitions · ${s.sets.filter(x=>x.seconds!==null).reduce((sum,x)=>sum+x.seconds,0)} hold seconds</p><p class="muted">${loggedSets(s).length===s.sets.length?'All planned sets logged':'Partial session'}</p></article>`).join(''):'<p class="empty">No sessions yet. Your first saved workout will appear here.</p>';}
function render(){renderPlan();renderActive();renderHistory();}
$('#export').onclick=()=>{if(storageBlocked){error(Error('Resolve the stored-data error before exporting.'));return;}const blob=new Blob([JSON.stringify(store,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='fitforge-browser-demo.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);say('Export prepared. It contains only this browser demo, not native app data.');};
$('#reset').onclick=()=>{if(!confirm('Delete the active workout and history stored by this browser demo?'))return;try{localStorage.removeItem('fitforge-portfolio-v1');store=emptyStore();storageBlocked=false;blocks=[];$('#storageError').hidden=true;render();tab('plan');say('Browser demo reset. The native app was not changed.');}catch(e){error(e);}};
render();

})();