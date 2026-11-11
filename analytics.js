/* Privacy-first play analytics. Everything is stored ON THE DEVICE (localStorage). Nothing is sent anywhere unless
   ANALYTICS_URL is set below AND the player turns on "Share anonymous stats" in Settings. No names, emails or
   free text are ever recorded: only event names, case/chain ids and numbers. */
(function(){
const ANALYTICS_URL = "";                 // e.g. "https://example.com/mm-stats". Leave empty to keep stats local-only.
const KEY="mm-stats-v1", MAX_EVENTS=400;
const STEPS=["intro_start","first_spawn","first_merge","first_upgrade","first_clue","scene_unlock","first_link","showdown_start","case_solved"];
const STEP_OF={spawn:"first_spawn",merge:"first_merge",gen_upgrade:"first_upgrade",clue:"first_clue",scene_unlock:"scene_unlock",link_ok:"first_link",showdown_start:"showdown_start",case_solved:"case_solved",intro_start:"intro_start"};
const rid=()=>Math.random().toString(36).slice(2,10);
let st=null;
try{ st=JSON.parse(localStorage.getItem(KEY)); }catch(e){}
st=Object.assign({v:1,id:rid(),first:Date.now(),sessions:0,playMs:0,counts:{},cases:{},events:[],sent:0},st||{});
const cs=id=>id? (st.cases[id]||(st.cases[id]={plays:0,playMs:0,funnel:{},counts:{}})) : null;
const caseId=()=>{ try{ return typeof CASE!=="undefined" && CASE ? CASE.id : null; }catch(e){ return null; } };
const persist=()=>{ try{ localStorage.setItem(KEY,JSON.stringify(st)); }catch(e){} };

window.track=function(e,d){
  try{
    const id=caseId(), c=cs(id), now=Date.now();
    st.counts[e]=(st.counts[e]||0)+1;
    if(c){ c.counts[e]=(c.counts[e]||0)+1; if(e==="intro_start") c.plays++;
      const step=STEP_OF[e]; if(step && !c.funnel[step]) c.funnel[step]={at:now,play:c.playMs,detail:d&&d.id?String(d.id):undefined}; }
    st.events.push({t:now,e,c:id||undefined,d:d||undefined});
    if(st.events.length>MAX_EVENTS) st.events.splice(0,st.events.length-MAX_EVENTS);
    persist();
  }catch(_){}
};

// ---- play time: counts only while the page is visible and the game screen (not the menu) is showing
let tick=0;
setInterval(()=>{
  try{
    if(document.hidden) return;
    const app=document.getElementById("app"); if(!app || app.classList.contains("hidden")) return;
    st.playMs+=1000; const c=cs(caseId()); if(c) c.playMs+=1000;
    if(++tick%10===0) persist();
  }catch(_){}
},1000);

st.sessions++; const sessionStart=Date.now();
window.addEventListener("load",()=>track("session_start",{n:st.sessions}));
function endSession(){ track("session_end",{s:Math.round((Date.now()-sessionStart)/1000)}); flush(); }
document.addEventListener("visibilitychange",()=>{ if(document.hidden) endSession(); });
window.addEventListener("pagehide",endSession);
window.addEventListener("error",ev=>track("error",{m:String(ev.message||"").slice(0,100),l:ev.lineno}));
window.addEventListener("unhandledrejection",ev=>track("error",{m:String(ev.reason&&ev.reason.message||ev.reason||"").slice(0,100)}));

// ---- opt-in upload (off unless ANALYTICS_URL is set and the player agrees)
function flush(){
  try{
    if(!ANALYTICS_URL || typeof CFG==="undefined" || !CFG.share || !navigator.sendBeacon) return;
    const fresh=st.events.slice(st.sent); if(!fresh.length) return;
    navigator.sendBeacon(ANALYTICS_URL,JSON.stringify({id:st.id,v:1,summary:summary(),events:fresh}));
    st.sent=st.events.length; persist();
  }catch(_){}
}

function summary(){
  const cases={};
  Object.entries(st.cases).forEach(([id,c])=>{
    let reached=null; STEPS.forEach(s=>{ if(c.funnel[s]) reached=s; });
    cases[id]={plays:c.plays,playMin:Math.round(c.playMs/6000)/10,reached,funnel:c.funnel,counts:c.counts};
  });
  return {id:st.id,sessions:st.sessions,playMin:Math.round(st.playMs/6000)/10,since:new Date(st.first).toISOString().slice(0,10),counts:st.counts,cases};
}
window.Stats={
  shareAvailable:!!ANALYTICS_URL,
  steps:STEPS,
  summary,
  export:()=>JSON.stringify({summary:summary(),events:st.events},null,1),
  reset(){ st=Object.assign({v:1,id:rid(),first:Date.now(),sessions:1,playMs:0,counts:{},cases:{},events:[],sent:0}); persist(); }
};
})();
