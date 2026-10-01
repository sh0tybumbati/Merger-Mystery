/* =========================================================
   DATA  — everything content-related lives here (data-driven!)
   ========================================================= */
const COLS = 6, ROWS = 7, CELLS = COLS * ROWS;
const START_COMPOSURE = 3;

/* ---- the active case: content comes from cases/*.js (window.CASES) ---- */
let CASE, CHAINS, SUSPECTS, CLUES, SCENES, SCENE_IDS, CULPRIT, NEED, SHOWDOWN, INTRO;
function setCase(id){
  CASE=CASES[id]; CHAINS=CASE.chains; SUSPECTS=CASE.suspects; CLUES=CASE.clues; SCENES=CASE.scenes; SCENE_IDS=Object.keys(SCENES);
  CULPRIT=CASE.culprit; NEED=CASE.need; SHOWDOWN=CASE.showdown; INTRO=CASE.intro;
}
const CASE_LIST = () => Object.values(CASES).sort((a,b)=>a.num-b.num);

/* Generators: merge two of the same chain+level to level up.
   charges = spawns before cooldown; cd = seconds to refill; w = spawn weights for item tiers 1,2,3…
   (higher levels unlock higher-tier items; final tier is never spawned directly — it must be merged) */
const GEN_LEVELS = [
  { charges:6,  cd:30, w:[100] },
  { charges:8,  cd:30, w:[65,35] },
  { charges:10, cd:28, w:[30,50,20] },
  { charges:14, cd:26, w:[10,35,55] }
];
const GEN_MAX = GEN_LEVELS.length;
function spawnTable(c,l){                       // -> [[tier,weight],…] capped below the chain's final tier
  const cap = maxTier(c)-1;
  return GEN_LEVELS[l-1].w.map((w,i)=>[i+1,w]).filter(([t])=>t<=cap);
}
const mkGen = (c,l=1)=>({ g:1, c, l, ch:GEN_LEVELS[l-1].charges, cd:0 });
const genInfo = (c,l)=>CHAINS[c].gen[l-1];
function needText(id){ return SCENES[id].need.map(c=>CLUES[c].title).join(" + "); }

/* =========================================================
   STATE
   ========================================================= */
const PROFILE_KEY="mm-profile-v1", SAVE_PREFIX="mm-save-v5-";
const defaultProfile=()=>({ cur:"case1", solved:{}, ins:5, mag:2, daily:{last:"",streak:0} });
function loadProfile(){ try{ const p=JSON.parse(localStorage.getItem(PROFILE_KEY)); if(p&&p.cur) return Object.assign(defaultProfile(),p); }catch(e){} return defaultProfile(); }
function saveProfile(){ try{ localStorage.setItem(PROFILE_KEY,JSON.stringify(P)); }catch(e){} }
let P = loadProfile(), S;
function seedBoard(id){
  const g = Array(CELLS).fill(null);
  Object.entries(SCENES[id].seed).forEach(([c,n])=>{ for(let k=0;k<n;k++){ let i; do{ i=Math.floor(Math.random()*CELLS);}while(g[i]); g[i]=mkGen(c); } });
  return g;
}
function fresh(){
  const first=SCENE_IDS[0], boards = { [first]: seedBoard(first) };
  return { seen:{}, seenGen:{}, boards, scene:first, unlocked:[first], grid:boards[first], clues:[], links:{}, composure:START_COMPOSURE, solved:false, started:false, tut:0 };
}
function load(){
  try{ const s=JSON.parse(localStorage.getItem(SAVE_PREFIX+CASE.id)); if(s&&s.boards&&s.boards[s.scene]){ s.grid=s.boards[s.scene]; s.seen=s.seen||{}; s.seenGen=s.seenGen||{}; return s; } }catch(e){}
  return fresh();
}
function save(){ try{ localStorage.setItem(SAVE_PREFIX+CASE.id, JSON.stringify(S,(k,v)=>k==="grid"?undefined:v)); }catch(e){} }
function peekSave(id){ try{ const s=JSON.parse(localStorage.getItem(SAVE_PREFIX+id)); return s?{started:!!s.started,solved:!!s.solved,clues:(s.clues||[]).length}:{}; }catch(e){ return {}; } }
function openCase(id){ setCase(id); P.cur=id; saveProfile(); S=load(); selected=null; armedClue=null; focus=null; }
setCase(CASES[P.cur]?P.cur:"case1"); S = load();

/* ---------- generator cooldowns ---------- */
function tickGens(){
  const now=Date.now(); let changed=false;
  Object.values(S.boards).flat().forEach(it=>{ if(it&&it.g&&it.cd&&now>=it.cd){ it.ch=GEN_LEVELS[it.l-1].charges; it.cd=0; changed=true; } });
  return changed;
}

/* =========================================================
   HELPERS
   ========================================================= */
const $ = id => document.getElementById(id);
let toastT;
function toast(msg){ const t=$("toast"); t.textContent=msg; t.classList.remove("hidden"); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.add("hidden"),2200); }
const item = (c,t,v) => { const ch=CHAINS[c]; return (ch.pair && t===ch.pair.tier && v!==undefined) ? ch.pair.variants[v] : ch.tiers[t-1]; };
const itemOf = it => item(it.c,it.t,it.v);
const mkItem = (c,t) => { const it={c,t}, pr=CHAINS[c].pair; if(pr && t===pr.tier) it.v=scarceVariant(c); return it; };
function scarceVariant(c){          // keep both sides of a contradiction available: pick the variant we have fewer of
  const pr=CHAINS[c].pair, n=pr.variants.map(()=>0);
  S.grid.forEach(x=>{ if(x&&!x.g&&x.c===c&&x.t===pr.tier&&x.v!==undefined) n[x.v]++; });
  return n[0]===n[1] ? Math.floor(Math.random()*2) : (n[0]<n[1]?0:1);
}
const maxTier = c => CHAINS[c].tiers.length;

/* ---------- shared "puppet rig": spindly, huge-headed, stitched, striped ---------- */
const PUPPETS={
  vesper:    {coat:"#d3c3ea",trim:"#7d5ba6",skin:"#f8e4d2",hair:"veil", hairc:"#eee4fa"},
  morrow:    {coat:"#fbf3e4",trim:"#4fa3a5",skin:"#f3dfc9",hair:"bald", hairc:"#3a2b33",specs:1},
  crane:     {coat:"#3a2b33",trim:"#fbf3e4",skin:"#efe3d6",hair:"slick",hairc:"#2a1f26",tall:1},
  bloat:     {coat:"#f0bf4c",trim:"#d1382c",skin:"#f6e0c6",hair:"bowler",hairc:"#3a2b33",stache:1},
  apprentice:{coat:"#f2b5b5",trim:"#4fa3a5",skin:"#f8e4d2",hair:"bob",  hairc:"#3a2b33"},
  fitch:     {coat:"#7aa88f",trim:"#f0bf4c",skin:"#efe3d6",hair:"slick",hairc:"#6b4630",tall:1},
  prunella:  {coat:"#3a2b33",trim:"#f2b5b5",skin:"#f8e4d2",hair:"bob",  hairc:"#8a5a3c"},
  dolour:    {coat:"#4a3a55",trim:"#fbf3e4",skin:"#f3dfc9",hair:"bald", hairc:"#3a2b33",specs:1,stache:1},
  weep:      {coat:"#5a5478",trim:"#d3c3ea",skin:"#f3e3d2",hair:"veil", hairc:"#4a3a55"}
};
function puppet(k){
  const P=PUPPETS[k], cy=P.tall?34:42, K="#3a2b33", st='stroke="'+K+'" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"';
  let hair="";
  let back="";
  if(P.hair==="veil"){ back='<path d="M15 '+(cy+8)+'Q12 '+(cy-42)+' 50 '+(cy-40)+'Q88 '+(cy-42)+' 85 '+(cy+8)+'L94 98L6 98Z" fill="'+P.hairc+'" '+st+'/>';
    hair='<path d="M22 '+(cy-14)+'Q50 '+(cy-40)+' 78 '+(cy-14)+'Q50 '+(cy-22)+' 22 '+(cy-14)+'Z" fill="'+P.hairc+'" '+st+'/><ellipse cx="50" cy="'+(cy-33)+'" rx="13" ry="5.5" fill="'+P.trim+'" '+st+'/>'; }
  if(P.hair==="slick")  hair='<path d="M22 '+(cy-2)+'Q22 '+(cy-34)+' 50 '+(cy-34)+'Q78 '+(cy-34)+' 78 '+(cy-2)+'Q66 '+(cy-20)+' 50 '+(cy-20)+'Q34 '+(cy-20)+' 22 '+(cy-2)+'Z" fill="'+P.hairc+'" '+st+'/>';
  if(P.hair==="bob")    hair='<path d="M19 '+(cy+12)+'Q14 '+(cy-36)+' 50 '+(cy-35)+'Q86 '+(cy-36)+' 81 '+(cy+12)+'Q76 '+(cy-14)+' 50 '+(cy-18)+'Q24 '+(cy-14)+' 19 '+(cy+12)+'Z" fill="'+P.hairc+'" '+st+'/>';
  if(P.hair==="bowler") hair='<path d="M27 '+(cy-22)+'Q50 '+(cy-56)+' 73 '+(cy-22)+'Z" fill="'+P.hairc+'" '+st+'/><rect x="28" y="'+(cy-30)+'" width="44" height="6" fill="'+P.trim+'"/><ellipse cx="50" cy="'+(cy-22)+'" rx="31" ry="5" fill="'+P.hairc+'" '+st+'/>';
  if(P.hair==="bald")   hair='<path d="M46 '+(cy-30)+'Q41 '+(cy-42)+' 52 '+(cy-41)+'" fill="none" '+st+'/>';
  const eye=x=>'<circle cx="'+x+'" cy="'+cy+'" r="4.6" fill="'+K+'"/><circle cx="'+(x+1.4)+'" cy="'+(cy-1.4)+'" r="1.4" fill="#fff"/><path d="M'+(x-6)+' '+(cy-9)+'h12" '+st+'/>';
  const specs=P.specs?'<circle cx="38" cy="'+cy+'" r="10.5" fill="#fff" fill-opacity=".35" '+st+'/><circle cx="62" cy="'+cy+'" r="10.5" fill="#fff" fill-opacity=".35" '+st+'/><path d="M48.5 '+cy+'h3" '+st+'/>':'';
  const stache=P.stache?'<path d="M35 '+(cy+13)+'Q50 '+(cy+6)+' 65 '+(cy+13)+'Q50 '+(cy+20)+' 35 '+(cy+13)+'Z" fill="'+K+'"/>':'';
  const arm=(d)=>'<path d="'+d+'" fill="none" stroke="'+K+'" stroke-width="9.5" stroke-linecap="round"/><path d="'+d+'" fill="none" stroke="'+P.coat+'" stroke-width="5" stroke-linecap="round"/>';
  return '<svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+
    '<path d="M43 128L41 147M57 128L59 147" fill="none" stroke="'+K+'" stroke-width="4.5" stroke-linecap="round"/><ellipse cx="38" cy="148.5" rx="7" ry="3" fill="'+K+'"/><ellipse cx="62" cy="148.5" rx="7" ry="3" fill="'+K+'"/>'+
    arm("M36 86Q19 102 26 122")+arm("M64 86Q81 102 74 122")+'<circle cx="26" cy="123" r="4" fill="'+P.skin+'" '+st+'/><circle cx="74" cy="123" r="4" fill="'+P.skin+'" '+st+'/>'+
    '<path d="M50 '+(cy+30)+'V82" '+st+'/><path d="M33 82h34L63 130H37Z" fill="'+P.coat+'" '+st+'/>'+
    '<path d="M50 82L42 92H58Z" fill="'+P.trim+'" '+st+'/><circle cx="50" cy="104" r="2" fill="'+K+'"/><circle cx="50" cy="114" r="2" fill="'+K+'"/><circle cx="50" cy="124" r="2" fill="'+K+'"/>'+
    back+'<ellipse cx="50" cy="'+cy+'" rx="29" ry="32" fill="'+P.skin+'" '+st+'/>'+
    '<circle cx="29" cy="'+(cy+12)+'" r="5.5" fill="#f29aa0" fill-opacity=".55"/><circle cx="71" cy="'+(cy+12)+'" r="5.5" fill="#f29aa0" fill-opacity=".55"/>'+
    eye(38)+eye(62)+specs+'<path d="M50 '+(cy+3)+'v8" fill="none" stroke="'+K+'" stroke-width="2" stroke-linecap="round"/>'+stache+
    '<path d="M43 '+(cy+21)+'h14" fill="none" '+st+'/>'+hair+'</svg>';
}
const faceHTML = f => f.startsWith("puppet:") ? puppet(f.slice(7)) : f==="raven" ? (typeof raven==="function"?raven():"🐦‍⬛") : f;

/* ---------- particle burst ---------- */
function burstAt(x,y,glyphs){
  if(CFG.reduce) return;
  for(let n=0;n<7;n++){
    const e=document.createElement("span"); e.className="fx"; e.textContent=glyphs[n%glyphs.length];
    e.style.left=x+"px"; e.style.top=y+"px";
    const a=Math.random()*Math.PI*2, r=30+Math.random()*50;
    e.style.setProperty("--dx",Math.cos(a)*r+"px"); e.style.setProperty("--dy",(Math.sin(a)*r-20)+"px"); e.style.setProperty("--r",(Math.random()*120-60)+"deg");
    e.addEventListener("animationend",()=>e.remove()); document.body.appendChild(e); setTimeout(()=>e.remove(),900);
  }
}
function fx(i,glyphs){
  setTimeout(()=>{ const c=document.querySelector('.cell[data-i="'+i+'"]'); if(!c) return;
    const r=c.getBoundingClientRect(); burstAt(r.left+r.width/2,r.top+r.height/2,glyphs); },0);
}

/* =========================================================
   EVIDENCE TABLE
   ========================================================= */
let selected = null, lastPop = -1, focus = null;

function renderTable(){
  tickGens();
  renderHud();
  scanSeen();
  if(focus!==null && !S.grid[focus]) focus=null;
  const g = $("grid"); g.innerHTML = "";
  S.grid.forEach((it,i)=>{
    const d = document.createElement("div");
    d.className = "cell" + (((i%COLS)+Math.floor(i/COLS))%2?" alt":"") + (selected===i?" sel":"");
    d.dataset.i = i;
    if(it){
      const e = document.createElement("div");
      if(it.g){
        const [emo,name] = genInfo(it.c,it.l), cool = it.ch<=0;
        e.className = "item gen "+CHAINS[it.c].css+(S.tut===0&&!cool?" glow":"")+(cool?" cool":"")+(it.l===GEN_MAX?" lvmax":"")+(lastPop===i?" pop":"");
        e.title = name;
        e.innerHTML = emo+'<span class="lv">Lv'+it.l+'</span>'+
          (cool ? '<span class="cdtxt" data-cd="'+it.cd+'"></span>'
                : '<span class="pips">'+"●".repeat(it.ch)+"○".repeat(GEN_LEVELS[it.l-1].charges-it.ch)+'</span>');
      } else {
        const [emo,name] = itemOf(it);
        e.className = "item "+CHAINS[it.c].css + (lastPop===i?" pop":"");
        e.title = name;
        e.innerHTML = emo + '<span class="tier">'+it.t+'</span>';
      }
      d.appendChild(e);
    }
    g.appendChild(d);
  });
  lastPop = -1;
  tickCooldownText();
  // tray (just the bin now; sources live on the board)
  const tr = $("tray"); tr.innerHTML = "";
  const bin = document.createElement("div"); bin.className="bin"+(selected==="bin"?" sel":""); bin.id="bin"; bin.style.flex=1; bin.innerHTML="<b>🪦</b>File away (drag or select, then tap)";
  tr.appendChild(bin);
  renderInfo(); renderCoach(); renderScenes();

}

function tickCooldownText(){
  const now=Date.now();
  document.querySelectorAll(".cdtxt").forEach(el=>{ el.textContent = "⏳"+Math.max(0,Math.ceil((+el.dataset.cd-now)/1000))+"s"; });
}

/* ---------- discovery tracking: a tile is revealed in a chain once it has appeared on any board ---------- */
const seenKey=(c,t,v)=>c+":"+t+(v!==undefined?":"+v:"");
function scanSeen(){
  Object.values(S.boards).forEach(b=>b.forEach(it=>{
    if(!it) return;
    if(it.g){ if((S.seenGen[it.c]||0)<it.l) S.seenGen[it.c]=it.l; }
    else { S.seen[seenKey(it.c,it.t)]=1; if(it.v!==undefined) S.seen[seenKey(it.c,it.t,it.v)]=1; }
  }));
}
const tile=(emo,cls,badge,cur,title)=>'<div class="ct '+cls+(cur?' cur':'')+'" title="'+(title||'')+'">'+emo+(badge!==''?'<span class="n">'+badge+'</span>':'')+'</div>';
const unknown=(badge,cur)=>'<div class="ct q'+(cur?' cur':'')+'">?'+(badge!==''?'<span class="n">'+badge+'</span>':'')+'</div>';
const ARROW='<span class="arr">›</span>';

function itemChainHTML(it){
  const ch=CHAINS[it.c], css=ch.css, out=[];
  ch.tiers.forEach(([emo,name],i)=>{
    const t=i+1, cur=it.t===t;
    if(ch.pair && t===ch.pair.tier){                       // the two clashing variants sit side by side
      const v=ch.pair.variants.map((vr,vi)=>S.seen[seenKey(it.c,t,vi)]? tile(vr[0],css,t,cur&&it.v===vi,vr[1]) : unknown(t,cur&&it.v===vi));
      out.push(v[0]+'<span class="arr bolt">⚡</span>'+v[1]);
    } else out.push(S.seen[seenKey(it.c,t)] ? tile(emo,css,t,cur,name) : unknown(t,cur));
  });
  const cl=CLUES[ch.clue];
  out.push(S.clues.includes(ch.clue) ? tile(cl.emoji,"clue","🔎",false,cl.title) : unknown("🔎",false));
  return '<div class="chain">'+out.join(ARROW)+'</div>';
}
function genChainHTML(it){
  const out=[];
  for(let l=1;l<=GEN_MAX;l++){
    const known=(S.seenGen[it.c]||0)>=l, [emo,name]=genInfo(it.c,l);
    out.push(known ? '<div class="ct gen'+(it.l===l?' cur':'')+'" title="'+name+'">'+emo+'<span class="lv">Lv'+l+'</span></div>'
                   : '<div class="ct q'+(it.l===l?' cur':'')+'">?<span class="lv">Lv'+l+'</span></div>');
  }
  return '<div class="chain">'+out.join(ARROW)+'</div>';
}
function renderInfo(){
  const el=$("genInfo"), it = focus!==null ? S.grid[focus] : null;
  if(!it){ el.classList.add("hidden"); return; }
  el.classList.remove("hidden");
  if(it.g){
    const L=GEN_LEVELS[it.l-1], [emo,name]=genInfo(it.c,it.l);
    el.innerHTML='<b>'+emo+' '+name+'</b> · Lv '+it.l+'/'+GEN_MAX+genChainHTML(it)+
      '<div class="stat">⚡ '+(it.ch>0?it.ch+'/'+L.charges+' charges':'recharging')+' · ⏳ '+L.cd+'s refill</div>'+
      '<div class="spawns"><span>Spawns</span>'+spawnTable(it.c,it.l).map(([t])=>{ const [e,n]=item(it.c,t); return tile(e,CHAINS[it.c].css+' sm',t,false,n); }).join('')+'</div>';
  } else {
    const [emo,name]=itemOf(it);
    el.innerHTML='<b>'+emo+' '+name+'</b>'+itemChainHTML(it);
  }
}

function pickTier(c,l){
  const t=spawnTable(c,l), tot=t.reduce((a,x)=>a+x[1],0); let r=Math.random()*tot;
  for(const [ti,w] of t){ if((r-=w)<0) return ti; }
  return t[0][0];
}
function emptyCells(){ return S.grid.map((v,i)=>v?-1:i).filter(i=>i>=0); }

function spawnFrom(i){
  tickGens();
  const gen=S.grid[i];
  if(!gen||!gen.g) return;
  focus=i;
  if(gen.ch<=0){ renderTable(); toast("Still recharging."); return; }
  const empty = emptyCells();
  if(!empty.length){ toast("Table's full — merge or file something away."); return renderTable(); }
  const j = empty[Math.floor(Math.random()*empty.length)];
  tut(0); Sfx.play("spawn");
  gen.ch--; if(gen.ch<=0) gen.cd = Date.now()+GEN_LEVELS[gen.l-1].cd*1000;
  S.grid[j] = mkItem(gen.c,pickTier(gen.c,gen.l));
  lastPop = j; commit();
}

function renderScenes(){
  const bar=$("scenes"); bar.innerHTML="";
  SCENE_IDS.forEach(id=>{
    const sc=SCENES[id], open=S.unlocked.includes(id), b=document.createElement("button");
    b.className=(id===S.scene?"on":"")+(open?"":" locked"); b.dataset.scene=id;
    b.innerHTML=sc.icon+"<br>"+(open?sc.name:"🔒 "+sc.name);
    bar.appendChild(b);
  });
}
$("scenes").addEventListener("click",e=>{
  const b=e.target.closest("button"); if(!b) return;
  const id=b.dataset.scene;
  if(!S.unlocked.includes(id)) return toast("Locked. Find: "+needText(id));
  switchScene(id);
});
function switchScene(id){ S.scene=id; S.grid=S.boards[id]; selected=null; focus=null; drag=null; commit(); }
function checkUnlocks(){
  const opened=[];
  SCENE_IDS.forEach(id=>{
    if(!S.unlocked.includes(id) && SCENES[id].need.every(c=>S.clues.includes(c))){
      S.unlocked.push(id); S.boards[id]=seedBoard(id); opened.push(id);
    }
  });
  return opened;
}

// Inspector rewards each clue with a fresh Lv1 lead (generator) for a chain whose clue is still missing
function grantLead(){
  const open = SCENES[S.scene].chains.filter(c=>!S.clues.includes(CHAINS[c].clue));
  const empty = emptyCells();
  if(!open.length || !empty.length) return null;
  const c = open[Math.floor(Math.random()*open.length)], i = empty[Math.floor(Math.random()*empty.length)];
  S.grid[i]=mkGen(c); lastPop=i;
  return genInfo(c,1);
}

function act(from,to){        // from: cell index, to: cell index | "bin"
  if(from===to) return renderTable();
  const a = S.grid[from];
  if(!a) return;
  if(focus===from && to!=="bin") focus=to;                // the info panel follows the tile you moved
  if(to==="bin"){
    if(a.g){ toast("Generators can't be filed away."); return renderTable(); }
    S.grid[from]=null; toast("Filed away."); return commit();
  }
  const b = S.grid[to];
  if(!b){ S.grid[to]=a; S.grid[from]=null; if(focus===from) focus=to; return commit(); }
  if(a.g && b.g && a.c===b.c && a.l===b.l){            // upgrade a generator
    if(a.l>=GEN_MAX){ toast("Already at max level."); return renderTable(); }
    S.grid[from]=null; S.grid[to]=mkGen(a.c,a.l+1); lastPop=to; focus=to; tut(2); Sfx.play("upgrade"); fx(to,["⭐","🎉"]);
    const [emo,name]=genInfo(a.c,a.l+1), before=spawnTable(a.c,a.l).length, after=spawnTable(a.c,a.l+1).length;
    toast("⬆ "+emo+" "+name+" (Lv"+(a.l+1)+")! "+GEN_LEVELS[a.l].charges+" charges"+(after>before?" · now spawns "+item(a.c,after)[1]:""));
    return commit();
  }
  if(!a.g && !b.g && a.c===b.c && a.t===b.t){          // merge evidence
    const pr=CHAINS[a.c].pair;
    if(pr && a.t===pr.tier){                            // contradiction merge
      if(a.v===b.v){ toast("These two statements agree. You need testimony that clashes."); return renderTable(); }
      S.grid[from]=null; S.grid[to]=null; tut(1); commit(); reveal(CHAINS[a.c].clue); return;
    }
    S.grid[from]=null; tut(1);
    if(a.t < maxTier(a.c)){ b.t++; if(pr && b.t===pr.tier) b.v=scarceVariant(b.c); lastPop=to; Sfx.play("merge",b.t); fx(to,["✨","⭐"]); commit(); }
    else { S.grid[to]=null; commit(); reveal(CHAINS[a.c].clue); }
    return;
  }
  S.grid[from]=b; S.grid[to]=a; if(focus===from) focus=to; else if(focus===to) focus=from; commit();   // swap
}

/* ---- pointer handling: drag OR tap-tap ---- */
let drag=null, ghost=null;
function endDrag(){                                  // single place that tears down any drag in progress
  if(drag) clearTimeout(drag.timer);
  drag=null;
  if(ghost){ ghost.remove(); ghost=null; }
  document.querySelectorAll(".ghost").forEach(g=>g.remove());
  const bin=$("bin"); if(bin) bin.classList.remove("over");
}
// a cancelled touch (system gesture, notification, lost focus) must not leave the drag icon floating
window.addEventListener("pointercancel",()=>{ if(drag||ghost){ endDrag(); renderTable(); } });
window.addEventListener("blur",()=>{ if(drag||ghost){ endDrag(); renderTable(); } });
document.addEventListener("visibilitychange",()=>{ if(document.hidden && (drag||ghost)){ endDrag(); renderTable(); } });
$("grid").addEventListener("pointerdown", e=>{
  const c = e.target.closest(".cell"); if(!c) return;
  const i = +c.dataset.i, it = S.grid[i];
  endDrag();                                        // never start a gesture with a stale ghost/timer around
  try{ $("grid").setPointerCapture(e.pointerId); }catch(_){}
  drag = { i, x:e.clientX, y:e.clientY, moved:false, had: !!it, long:false };
  if(it){ focus=i; renderInfo(); }
  if(it && it.g){                                   // long-press selects a generator (for tap-tap upgrading)
    const d=drag;
    d.timer=setTimeout(()=>{ if(drag===d && !d.moved){ d.long=true; selected=i; focus=i; renderTable(); } },450);
  }
});
window.addEventListener("pointermove", e=>{
  if(!drag || !drag.had) return;
  if(!drag.moved && Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>(S.grid[drag.i].g?26:12)){
    drag.moved=true; clearTimeout(drag.timer);
    const it = S.grid[drag.i];
    ghost = document.createElement("div"); ghost.className="ghost"; ghost.textContent=it.g?genInfo(it.c,it.l)[0]:itemOf(it)[0];
    document.body.appendChild(ghost);
  }
  if(ghost){ ghost.style.left=e.clientX+"px"; ghost.style.top=e.clientY+"px";
    const el=document.elementFromPoint(e.clientX,e.clientY); $("bin")?.classList.toggle("over", !!el?.closest("#bin")); }
});
window.addEventListener("pointerup", e=>{
  if(!drag) return;
  const d = drag; endDrag();
  const el = document.elementFromPoint(e.clientX,e.clientY);
  const cell = el?.closest(".cell"), bin = el?.closest("#bin");
  if(d.moved && cell && +cell.dataset.i===d.i){ d.moved=false; }   // dropped where it started: treat as a tap
  if(d.moved){
    selected=null;
    if(bin) act(d.i,"bin"); else if(cell) act(d.i,+cell.dataset.i); else renderTable();
    return;
  }
  if(d.long) return;
  // tap
  const i = d.i, it = S.grid[i];
  if(selected===null){
    if(it && it.g){ if(it.ch>0) spawnFrom(i); else { focus=i; selected=i; renderTable(); } }   // tap = spawn
    else if(it){ selected=i; renderTable(); }
    else { focus=null; renderTable(); }
  }
  else if(selected===i){ selected=null; renderTable(); }
  else { const from=selected; selected=null; act(from,i); }
});
$("tray").addEventListener("click", e=>{
  if(e.target.closest("#bin")){
    if(typeof selected==="number"){ const f=selected; selected=null; act(f,"bin"); }
    else toast("Select an item first, or drag it here.");
  }
});

/* =========================================================
   REVEAL & BOARD
   ========================================================= */
function overlay(html){ const o=$("overlay"); o.innerHTML='<div class="modal">'+html+'</div>'; o.classList.remove("hidden"); }
function closeOverlay(){ $("overlay").classList.add("hidden"); }

function reveal(id){
  const c = CLUES[id];
  if(S.clues.includes(id)){ toast("Already on file."); return; }
  S.clues.push(id); tut(3); Sfx.play("clue"); burstAt(innerWidth/2,innerHeight/2.6,["🔍","✨","⭐"]);
  const lead = grantLead(), opened = checkUnlocks(); commit();
  overlay('<div class="big">'+c.emoji+'</div><h2>'+(c.kind==='contradiction'?'⚡ Contradiction!':'Clue Discovered!')+'</h2><div class="paper"><b>'+c.title+'</b><br>'+c.text+'</div>'+
    (lead?'<p style="font-size:13px;color:var(--amber)">🎁 The Inspector sends a new lead: '+lead[0]+' '+lead[1]+' (Lv1)</p>':'')+
    opened.map(id=>'<p style="color:var(--moss)">🔓 <b>New location unlocked:</b> '+SCENES[id].icon+' '+SCENES[id].name+'</p>').join('')+
    '<p><button id="goPin">📌 Pin it to the board</button> <button id="stay">Keep merging</button></p>'+
    (opened.length?'<p><button id="goScene">'+SCENES[opened[0]].icon+' Go to '+SCENES[opened[0]].name+'</button></p>':''));
  if(opened.length) $("goScene").onclick=()=>{ closeOverlay(); showTab("table"); switchScene(opened[0]); };
  $("goPin").onclick=()=>{ closeOverlay(); showTab("board"); };
  $("stay").onclick=closeOverlay;
}

let armedClue=null;
function renderBoard(){
  const sp = $("suspects"); sp.innerHTML=""; sp.classList.toggle("four",Object.keys(SUSPECTS).length>3);
  Object.entries(SUSPECTS).forEach(([k,s],n)=>{
    const d=document.createElement("div"); d.className="card sus"+(armedClue?" armed":"")+(S.solved&&k===CULPRIT?" solved":""); d.dataset.s=k;
    d.style.setProperty("--r",[-1.5,1,-.5][n]+"deg");
    d.innerHTML='<span class="face">'+faceHTML(s.face)+'</span><h4>'+s.name+'</h4>'+s.bio;
    sp.appendChild(d);
  });
  const cl=$("clues"); cl.innerHTML="";
  if(!S.clues.length) cl.innerHTML='<div class="empty">No clues yet.<br>Merge evidence on the Evidence Table to reveal some.</div>';
  S.clues.forEach((id,n)=>{
    const c=CLUES[id], d=document.createElement("div");
    d.className="card clue"+(armedClue===id?" armed":"")+(S.links[id]?" linked":""); d.dataset.c=id;
    d.style.setProperty("--r",[1,-1.2,.6,-.8][n%4]+"deg");
    d.innerHTML='<span class="face">'+c.emoji+'</span><h4>'+c.title+'</h4>'+(c.kind==='contradiction'?'<small class="contra">⚡ CONTRADICTION</small>':'')+c.text+
      (S.links[id]?'<small>🔗 strung to '+SUSPECTS[S.links[id]].name+'</small>':'');
    cl.appendChild(d);
  });
  const linked = NEED.filter(id=>S.links[id]===CULPRIT).length;
  $("confront").classList.toggle("hidden", !(linked===NEED.length && !S.solved));
  $("confront").textContent="⚖️ Confront "+SUSPECTS[CULPRIT].name;
  $("boardTip").textContent = S.solved ? "Case closed." : armedClue ? "Now tap the suspect it points to." : "Tap a clue, then tap the suspect it points to. ("+linked+"/"+NEED.length+" damning threads)";
  const n=S.clues.filter(id=>!S.links[id]).length; const b=$("badge"); b.textContent=n; b.classList.toggle("hidden",!n);
  requestAnimationFrame(drawStrings);
}

function drawStrings(){
  const svg=$("strings"), cork=$("cork").getBoundingClientRect();
  if(!cork.width) return;
  let out="";
  Object.entries(S.links).forEach(([cid,sid])=>{
    const a=document.querySelector('.clue[data-c="'+cid+'"]'), b=document.querySelector('.sus[data-s="'+sid+'"]');
    if(!a||!b) return;
    out+=stringPath(a,b,cork,"#c8102e",4,"");
  });
  svg.innerHTML=out;
}
function stringPath(a,b,cork,col,w,extra){
  const A=a.getBoundingClientRect(), B=b.getBoundingClientRect();
  const x1=A.left+A.width/2-cork.left, y1=A.top-cork.top;
  const x2=B.left+B.width/2-cork.left, y2=B.bottom-cork.top;
  const sag=Math.abs(y1-y2)*.12+24;                       // sagging string
  const mx=(x1+x2)/2, my=(y1+y2)/2+sag;
  return '<path d="M'+x1+' '+y1+' Q'+mx+' '+my+' '+x2+' '+y2+'" stroke="'+col+'" stroke-width="'+w+'" fill="none" stroke-linecap="round" '+extra+'/>';
}

$("clues").addEventListener("click", e=>{
  const c=e.target.closest(".clue"); if(!c||S.solved) return;
  const id=c.dataset.c;
  if(S.links[id]){ delete S.links[id]; armedClue=id; }   // tap a strung clue to re-string it
  else armedClue = armedClue===id ? null : id;
  commit();
});
$("suspects").addEventListener("click", e=>{
  const s=e.target.closest(".sus"); if(!s||!armedClue||S.solved) return;
  const sid=s.dataset.s, cid=armedClue, clue=CLUES[cid];
  armedClue=null;
  if(clue.who===sid){ S.links[cid]=sid; Sfx.play("good"); toast("The string pulls taut. ✔"); commit(); }
  else {
    // wrong: draw a limp string that snaps
    const a=document.querySelector('.clue[data-c="'+cid+'"]'), cork=$("cork").getBoundingClientRect();
    $("strings").insertAdjacentHTML("beforeend", stringPath(a,s,cork,"#777",3,'stroke-dasharray="6 6"'));
    s.classList.add("shake");
    S.composure--; Sfx.play("snap");
    let msg = clue.who ? "Twang! That doesn't connect "+SUSPECTS[sid].name+" to the crime." : "Twang! "+(clue.herring||"A red herring.");
    if(S.composure<=0){ msg+=" (Composure restored — the Inspector gives you a nudge: "+NEED.length+" clues, one culprit.)"; S.composure=START_COMPOSURE; }
    toast(msg); save();
    setTimeout(()=>{ renderBoard(); renderHud(); },450);
  }
});
function startShowdown(){
  let step=0, msg="";
  const draw=()=>{
    const q=SHOWDOWN[step];
    overlay('<div class="scene"><div class="portrait">'+faceHTML(SUSPECTS[CULPRIT].face)+'</div><div class="who">'+SUSPECTS[CULPRIT].name+' · '+(step+1)+' of '+SHOWDOWN.length+'</div>'+
      '<div class="bubble">“'+q.claim+'”</div>'+
      '<div class="dots">🎭 '+"♥".repeat(S.composure)+"♡".repeat(START_COMPOSURE-S.composure)+'</div>'+
      '<div style="font-size:13px;color:var(--amber);min-height:34px" id="sdMsg">'+(msg||"Present the clue that proves her wrong.")+'</div>'+
      '<div class="evi">'+S.clues.map(id=>'<button data-c="'+id+'"><b>'+CLUES[id].emoji+'</b>'+CLUES[id].title+'</button>').join("")+'</div></div>');
    document.querySelectorAll(".evi button").forEach(btn=>btn.onclick=()=>present(btn.dataset.c));
  };
  const present=id=>{
    const q=SHOWDOWN[step];
    if(id===q.answer){
      msg=""; Sfx.play("good");
      overlay('<div class="scene"><div class="portrait">'+puppet("apprentice")+'</div><div class="who">You, the Apprentice</div><div class="bubble">“'+q.retort+'”</div>'+
        '<p><button id="sdNext">'+(step<SHOWDOWN.length-1?"Next claim ▸":"Name the culprit ▸")+'</button></p></div>');
      $("sdNext").onclick=()=>{ step++; step<SHOWDOWN.length ? draw() : finale(); };
    } else {
      S.composure--; Sfx.play("wrong");
      msg = CLUES[id].who==null ? "That isn't admissible evidence!" : "That doesn't answer the claim. Twang!";
      if(S.composure<=0){ S.composure=START_COMPOSURE; msg+=" Poe-tential whispers: “Try the ‘"+CLUES[q.answer].title+"’ clue.” (Composure restored)"; }
      save(); renderHud(); draw(); document.querySelector(".modal").classList.add("shake");
    }
  };
  draw();
}
function finale(){
  const F=CASE.finale; S.solved=true; P.solved[CASE.id]=true; saveProfile(); commit(); Sfx.play("eureka"); burstAt(innerWidth/2,innerHeight/3,["🎉","⭐","✨"]);
  overlay('<div class="spot"><div class="portrait">'+faceHTML(SUSPECTS[CULPRIT].face)+'</div></div><h2>'+F.title+'</h2>'+
    '<p>'+F.text+'</p><p><i>'+F.coda+'</i></p>'+
    '<p style="color:var(--dim);font-size:13px">CASE '+CASE.num+' CLOSED<br>'+F.teaser+'</p>'+
    '<button id="ok">Close</button> <button id="toMenu">Main menu</button>');
  $("ok").onclick=closeOverlay; $("toMenu").onclick=showMenu;
}
$("confront").onclick=startShowdown;

/* =========================================================
   TABS / INIT
   ========================================================= */
function renderHud(){
  $("caseTitle").firstChild.nodeValue=CASE.title; $("caseSub").innerHTML="A MERGER MYSTERY &middot; CASE "+CASE.num;
  $("energy").innerHTML = "🔎 Clues " + S.clues.length + "/" + Object.keys(CLUES).length;
  $("composure").innerHTML = "🎭 Composure " + "♥".repeat(S.composure) + "♡".repeat(START_COMPOSURE-S.composure);
}
function commit(){ save(); renderTable(); renderBoard(); }
function showTab(t){
  const b = t==="board";
  $("viewTable").classList.toggle("hidden",b); $("viewBoard").classList.toggle("hidden",!b);
  $("tabTable").classList.toggle("on",!b); $("tabBoard").classList.toggle("on",b);
  if(b) renderBoard(); else renderTable();
}
/* ---------- tutorial coach ---------- */
const TUT=[
  "① Tap a glowing generator to spawn evidence.",
  "② Drag two matching items together to merge them into a higher tier.",
  "③ Drag two identical generators together to upgrade them: more charges, better items.",
  "④ Reach the final tier of a chain to reveal a clue, then pin it on the Red-String Board."];
function tut(n){ if(S.tut<=n) S.tut=n+1; }
function renderCoach(){
  const c=$("coach");
  if(S.tut>=TUT.length||S.solved){ c.classList.add("hidden"); return; }
  c.classList.remove("hidden"); c.innerHTML=TUT[S.tut]+'<a id="skipTut">skip tips</a>';
}
$("coach").addEventListener("click",e=>{ if(e.target.id==="skipTut"){ S.tut=99; commit(); } });

/* ---------- settings ---------- */
const CFG_KEY="merger-mystery-settings"; let CFG={reduce:false,sfx:true,music:false,theme:"day"};
try{ Object.assign(CFG,JSON.parse(localStorage.getItem(CFG_KEY))||{}); }catch(e){}
const THEMES=["day","night","auto"], THEME_LABEL={day:"Day ☀️",night:"Night 🌙",auto:"Auto (system)"};
const dark=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null;
function isNight(){ return CFG.theme==="night" || (CFG.theme==="auto" && !!(dark&&dark.matches)); }
function applyTheme(){
  const n=isNight(); document.body.classList.toggle("night",n);
  const m=$("themeColor"); if(m) m.setAttribute("content",n?"#171127":"#f6e7d3");
  const b=$("themeBtn"); if(b) b.textContent=n?"☀️":"🌙";
}
if(dark&&dark.addEventListener) dark.addEventListener("change",()=>{ if(CFG.theme==="auto") applyTheme(); });
function applyCfg(){ applyTheme(); document.body.classList.toggle("reduce",!!CFG.reduce); Sfx.setMusic(!!CFG.music); try{ localStorage.setItem(CFG_KEY,JSON.stringify(CFG)); }catch(e){} }

/* ---------- audio: everything synthesised with WebAudio (no asset files) ---------- */
const Sfx=(()=>{
  let ctx=null, master, mus, timer=null, beat=0, next=0, unlocked=false, want=false;
  const F=m=>440*Math.pow(2,(m-69)/12);
  function init(){ if(ctx) return; try{ ctx=new (window.AudioContext||window.webkitAudioContext)();
    master=ctx.createGain(); master.gain.value=.6; master.connect(ctx.destination); mus=ctx.createGain(); mus.gain.value=.3; mus.connect(master); }catch(e){ ctx=null; } }
  function tone(f,t0,dur,o={}){
    const {type="sine",vol=.3,dest=master,slide=0}=o, osc=ctx.createOscillator(), g=ctx.createGain();
    osc.type=type; osc.frequency.setValueAtTime(f,t0);
    if(slide) osc.frequency.exponentialRampToValueAtTime(Math.max(20,f*slide),t0+dur);
    g.gain.setValueAtTime(.0001,t0); g.gain.exponentialRampToValueAtTime(vol,t0+.012); g.gain.exponentialRampToValueAtTime(.0001,t0+dur);
    osc.connect(g); g.connect(dest); osc.start(t0); osc.stop(t0+dur+.05);
  }
  const box=(m,t0,vol=.3,dest=master)=>{ tone(F(m),t0,.9,{vol,dest}); tone(F(m+12),t0,.35,{type:"triangle",vol:vol*.35,dest}); };  // music-box timbre
  const pluck=(m,t0,vol=.3,dest=master)=>{ tone(F(m),t0,.32,{type:"triangle",vol,dest}); tone(F(m+12),t0,.12,{type:"square",vol:vol*.1,dest}); };   // harpsichord-ish pluck
  const PENT=[60,62,64,67,69,72,74,76,79,81,84];
  function play(name,arg=0){
    if(!CFG.sfx||!unlocked) return; init(); if(!ctx) return;
    const t=ctx.currentTime+.01, P=i=>PENT[Math.min(i,PENT.length-1)];
    switch(name){
      case "click":   tone(900,t,.05,{type:"square",vol:.05}); break;
      case "spawn":   tone(300,t,.14,{type:"triangle",vol:.25,slide:2}); break;
      case "merge":   pluck(P(arg+2)+12,t,.3); pluck(P(arg+4)+12,t+.09,.25); break;
      case "upgrade": [0,2,4,6,8].forEach((n,i)=>pluck(P(n)+12,t+i*.07,.28)); break;
      case "clue":    [60,64,67,72,76].forEach((m,i)=>pluck(m+12,t+i*.1,.3)); break;
      case "good":    tone(660,t,.1,{type:"triangle",vol:.25}); tone(990,t+.08,.18,{type:"triangle",vol:.25}); break;
      case "snap":    tone(220,t,.35,{type:"sawtooth",vol:.18,slide:.3}); tone(110,t,.4,{type:"square",vol:.07,slide:.5}); break;
      case "wrong":   tone(140,t,.25,{type:"square",vol:.11}); tone(120,t+.12,.3,{type:"square",vol:.11}); break;
      case "eureka":  [60,64,67,72,76,84].forEach((m,i)=>pluck(m+12,t+i*.12,.3)); break;
    }
  }
  // 3/4 music-box waltz in A minor
  const BPM=118, BEAT=60/BPM;
  const MEL=[76,0,72, 79,0,76, 77,0,74, 72,0,0,  76,0,79, 84,0,79, 77,0,74, 72,0,0];
  const BASS=[48,48,43,48, 48,53,43,48];
  function sched(){
    while(next<ctx.currentTime+.4){
      const b=beat%24, bar=Math.floor(b/3), pos=b%3;
      if(MEL[b]) pluck(MEL[b],next,.5,mus);
      if(pos===0) tone(F(BASS[bar]),next,.3,{type:"triangle",vol:.5,dest:mus});
      else tone(F(BASS[bar]+16),next,.1,{type:"triangle",vol:.14,dest:mus});
      next+=BEAT; beat++;
    }
  }
  function apply(){
    if(!unlocked) return; init(); if(!ctx) return;
    if(want && !timer){ ctx.resume(); next=ctx.currentTime+.1; beat=0; timer=setInterval(sched,120); }
    if(!want && timer){ clearInterval(timer); timer=null; }
  }
  return {
    unlock(){ if(unlocked) return; unlocked=true; init(); if(ctx) ctx.resume(); apply(); },
    setMusic(on){ want=on; apply(); },
    play
  };
})();
window.addEventListener("pointerdown",()=>Sfx.unlock(),{once:true});
document.addEventListener("click",e=>{ if(e.target.closest("button")) Sfx.play("click"); });

/* ---------- screens ---------- */
function showMenu(){
  closeOverlay(); $("app").classList.add("hidden"); $("menu").classList.remove("hidden");
  const c=$("mContinue"); c.classList.toggle("hidden",!S.started);
  c.textContent = S.solved ? "⭐ Case "+CASE.num+" — solved" : "▶ Continue Case "+CASE.num;
  $("verLine").textContent="PROTOTYPE · "+CASE_LIST().length+" CASES";
}
function showGame(){ $("menu").classList.add("hidden"); $("app").classList.remove("hidden"); renderHud(); showTab("table"); }
function startCase(id){                 // begin (or restart) a case from scratch, with its prologue
  openCase(id); S=fresh(); save(); commit(); playIntro(0);
}
function newCase(){ $("mCases").click(); }
function playIntro(i){
  const l=INTRO[i];
  overlay('<div class="scene"><div class="portrait">'+faceHTML(l.face)+'</div><div class="who">'+l.who+'</div><p>“'+l.text+'”</p>'+
    '<div class="dots">'+INTRO.map((_,n)=>n===i?"●":"○").join(" ")+'</div>'+
    '<button id="iNext">'+(i<INTRO.length-1?"Next ▸":"Begin investigation ▸")+'</button> <button id="iSkip" style="font-size:12px;opacity:.7">Skip</button></div>');
  const end=()=>{ S.started=true; save(); closeOverlay(); showGame(); };
  $("iNext").onclick=()=> i<INTRO.length-1 ? playIntro(i+1) : end();
  $("iSkip").onclick=end;
}
$("themeBtn").onclick=()=>{ CFG.theme=isNight()?"day":"night"; applyCfg(); };
$("mContinue").onclick=showGame;
$("mNew").onclick=newCase;
$("menuBtn").onclick=showMenu;
$("mHow").onclick=()=>{
  overlay('<h2>How to Play</h2><ol class="rules">'+
    '<li><b>Generators</b> (gold borders) spawn evidence when tapped. Each has limited charges, then a cooldown.</li>'+
    '<li><b>Merge</b> two matching items to raise their tier. Reach the top tier of a chain to <b>reveal a clue</b>.</li>'+
    '<li><b>Merge two identical generators</b> to upgrade them: more charges, better items. Tap any tile to see its merge chain (undiscovered steps show as ?).</li>'+
    '<li>Prefer tapping? Tap a tile, then tap the one to merge with. Long-press a generator to select it.</li>'+
    '<li>On the <b>Red-String Board</b>, tap a clue, then the suspect it points to. Good strings pull taut; bad ones snap and cost Composure.</li>'+
    '<li>Beware <b>red herrings</b>. Not every clue is evidence.</li>'+
    '<li>Link every damning clue to the culprit, then <b>confront</b> them.</li></ol><button id="ok">Got it</button>');
  $("ok").onclick=closeOverlay;
};
$("mCases").onclick=()=>{
  const cards=CASE_LIST().map(c=>{
    const st=peekSave(c.id), locked=c.unlock && !P.solved[c.unlock];
    const tag = locked ? "🔒 Solve Case "+CASES[c.unlock].num+" first" : st.solved ? "⭐ Solved" : st.started ? "In progress · "+st.clues+" clue"+(st.clues===1?"":"s") : "New";
    return '<div class="casecard'+(locked?' locked':'')+'" data-id="'+c.id+'"><b>'+c.num+' · '+c.title+'</b><small>'+tag+' — '+c.blurb+'</small></div>';
  }).join('');
  overlay('<h2>Case Files</h2>'+cards+'<div class="casecard locked"><b>🔒 3 · ???</b><small>Coming soon</small></div><button id="ok">Close</button>');
  $("ok").onclick=closeOverlay;
  document.querySelectorAll(".casecard[data-id]").forEach(el=>el.onclick=()=>{
    const id=el.dataset.id, c=CASES[id];
    if(c.unlock && !P.solved[c.unlock]) return toast("Solve Case "+CASES[c.unlock].num+" first.");
    closeOverlay();
    const st=peekSave(id);
    if(st.started){ openCase(id); commit(); showGame(); } else startCase(id);
  });
};
$("mSettings").onclick=()=>{
  const draw=()=>{
    overlay('<h2>Settings</h2>'+
      (isStandalone()?'':'<p><button id="sInstall">📲 Install app</button></p>')+
      '<p><button id="sTheme">Theme: '+THEME_LABEL[CFG.theme]+'</button></p>'+
      '<p><button id="sSfx">Sound effects: '+(CFG.sfx?"ON":"OFF")+'</button></p>'+
      '<p><button id="sMusic">Music: '+(CFG.music?"ON":"OFF")+'</button></p>'+
      '<p><button id="sMotion">Reduce motion: '+(CFG.reduce?"ON":"OFF")+'</button></p>'+
      '<p><button id="sErase" class="danger">Erase saved progress</button></p><p><button id="ok">Back</button></p>');
    const inst=$("sInstall"); if(inst) inst.onclick=async()=>{
      if(installEvt){ installEvt.prompt(); await installEvt.userChoice.catch(()=>{}); installEvt=null; }
      else toast(/iphone|ipad|ipod/i.test(navigator.userAgent) ? "On iPhone/iPad: tap Share, then Add to Home Screen." : "Use your browser menu: Install app / Add to Home screen.");
    };
    $("sTheme").onclick=()=>{ CFG.theme=THEMES[(THEMES.indexOf(CFG.theme)+1)%THEMES.length]; applyCfg(); draw(); };
    $("sSfx").onclick=()=>{ CFG.sfx=!CFG.sfx; applyCfg(); draw(); };
    $("sMusic").onclick=()=>{ CFG.music=!CFG.music; applyCfg(); draw(); };
    $("sMotion").onclick=()=>{ CFG.reduce=!CFG.reduce; applyCfg(); draw(); };
    $("sErase").onclick=()=>{ if(confirm("Erase ALL saved progress, including solved cases?")){ Object.keys(CASES).forEach(id=>{ try{ localStorage.removeItem(SAVE_PREFIX+id); }catch(e){} }); P=defaultProfile(); saveProfile(); openCase("case1"); S=fresh(); save(); commit(); closeOverlay(); showMenu(); toast("Save erased."); } };
    $("ok").onclick=closeOverlay;
  }; draw();
};

$("tabTable").onclick=()=>showTab("table");
$("tabBoard").onclick=()=>showTab("board");
$("reset").onclick=()=>{ if(confirm("Restart the case from scratch?")){ S=fresh(); S.started=true; S.tut=0; selected=null; armedClue=null; focus=null; commit(); showTab("table"); } };
window.addEventListener("resize",drawStrings);
setInterval(()=>{                                   // cooldown ticker: full re-render only when a generator refills
  if(drag && drag.moved) return;
  if(!drag) document.querySelectorAll(".ghost").forEach(g=>g.remove());
  if(tickGens()) renderTable(); else tickCooldownText();
},500);
/* ---------- install / offline (PWA) ---------- */
let installEvt=null;
window.addEventListener("beforeinstallprompt",e=>{ e.preventDefault(); installEvt=e; });
window.addEventListener("appinstalled",()=>{ installEvt=null; toast("Installed! Find it on your home screen."); });
const isStandalone=()=>window.matchMedia("(display-mode: standalone)").matches || navigator.standalone===true;
if("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));

applyCfg(); commit(); showMenu();
