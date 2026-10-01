/* Flat vector icon set (Dollhouse Cluedo). Every icon is drawn in a 48x48 box; outlines come from CSS (.ic *), so
   they follow the day/night theme. Items are keyed by the emoji used in the case data, so a missing icon simply
   falls back to the emoji. Generators are composed from 4 level bases + the chain's colour + a glyph. */
(function(){
const W="#ffffff",C="#fbf3e4",Y="#f0bf4c",T="#4fa3a5",R="#d1382c",P="#f2b5b5",RS="#e58f92",SK="#a9d3e0",M="#bfe3cf",L="#d3c3ea",BR="#b07a4f",ST="#c5ced8",D="#3a2b33",TAN="#e6c796",SKIN="#f3c9a8",GR="#6fa88a";
const ICON={};

// ---------- forensics ----------
ICON["🌫️"]=`<path d="M10 33a7 7 0 0 1 3-13 10 10 0 0 1 19-2 7.5 7.5 0 0 1 5 15z" fill="${W}"/><path class="ns" d="M17 28h14" stroke="none"/><circle class="ns" cx="16" cy="40" r="1.6" fill="${D}"/><circle class="ns" cx="26" cy="41" r="1.2" fill="${D}"/><circle class="ns" cx="34" cy="39" r="1.6" fill="${D}"/>`;
ICON["💧"]=`<path d="M24 5C17 16 11 22 11 30a13 13 0 0 0 26 0c0-8-6-14-13-25z" fill="${SK}"/><path class="ns" d="M18 31a6 6 0 0 0 5 6" fill="none" stroke="#fff" stroke-width="2.4"/>`;
ICON["🧂"]=`<rect x="14" y="17" width="20" height="23" rx="5" fill="${W}"/><path d="M13 17a11 7 0 0 1 22 0z" fill="${ST}"/><circle class="ns" cx="20" cy="12" r="1.3" fill="${D}"/><circle class="ns" cx="24" cy="10" r="1.3" fill="${D}"/><circle class="ns" cx="28" cy="12" r="1.3" fill="${D}"/><path d="M14 27h20" fill="none"/>`;
ICON["🫙"]=`<rect x="14" y="8" width="20" height="7" rx="2" fill="${ST}"/><path d="M15 15h18l2 5v16a5 5 0 0 1-5 5H18a5 5 0 0 1-5-5V20z" fill="#eaf6f7"/><path d="M13 28h22v8a5 5 0 0 1-5 5H18a5 5 0 0 1-5-5z" fill="${GR}"/>`;
ICON["🧪"]=`<rect x="15" y="6" width="18" height="5" rx="2" fill="${ST}"/><path d="M17 11h14v25a7 7 0 0 1-14 0z" fill="#eaf6f7"/><path d="M17 26h14v10a7 7 0 0 1-14 0z" fill="${T}"/><circle class="ns" cx="22" cy="32" r="1.6" fill="#fff"/><circle class="ns" cx="26" cy="36" r="1.2" fill="#fff"/>`;
ICON["🔬"]=`<rect x="5" y="16" width="38" height="18" rx="3" fill="#e8f6fb"/><rect x="12" y="21" width="16" height="8" fill="${W}"/><circle cx="20" cy="25" r="3.2" fill="${R}"/><circle class="ns" cx="26" cy="25" r="1.4" fill="${GR}"/><path d="M33 22v6" fill="none"/>`;
ICON["🧴"]=`<rect x="19" y="5" width="10" height="8" rx="2" fill="${D}"/><path d="M17 13h14l3 7v18a5 5 0 0 1-5 5H19a5 5 0 0 1-5-5V20z" fill="${P}"/><rect x="17" y="24" width="14" height="11" rx="2" fill="${C}"/><path d="M20 28h8M20 31h6" fill="none" stroke-width="1.8"/>`;

// ---------- witnesses ----------
ICON["👂"]=`<path d="M24 5c-9 0-14 6-14 15 0 6 3 8 5 12 2 4 1 11 9 11 6 0 9-5 9-9 0-4 5-5 5-13C38 11 33 5 24 5z" fill="${SKIN}"/><path d="M22 15c5-3 10 0 9 6-1 4-6 4-6 9" fill="none"/>`;
ICON["💬"]=`<path d="M8 9h32a3 3 0 0 1 3 3v17a3 3 0 0 1-3 3H25l-9 8v-8H8a3 3 0 0 1-3-3V12a3 3 0 0 1 3-3z" fill="${W}"/><circle class="ns" cx="16" cy="21" r="2.4" fill="${D}"/><circle class="ns" cx="24" cy="21" r="2.4" fill="${D}"/><circle class="ns" cx="32" cy="21" r="2.4" fill="${D}"/>`;
ICON["📜"]=`<path d="M11 8h24v28a4 4 0 0 0 4 4H15a4 4 0 0 1-4-4z" fill="${C}"/><path d="M11 8a4 4 0 0 0-4 4h8" fill="${TAN}"/><path d="M17 16h14M17 22h14M17 28h9" fill="none" stroke-width="2"/><circle cx="31" cy="34" r="4" fill="${R}"/>`;
ICON["🛌"]=`<rect x="6" y="14" width="5" height="26" rx="2" fill="${BR}"/><rect x="6" y="26" width="36" height="9" rx="2" fill="${SK}"/><rect x="11" y="20" width="12" height="7" rx="3" fill="${W}"/><path d="M23 26h19v-4a3 3 0 0 0-3-3H23z" fill="${P}"/><rect x="37" y="30" width="5" height="10" rx="2" fill="${BR}"/>`;
ICON["🚪"]=`<rect x="12" y="5" width="24" height="36" rx="3" fill="${BR}"/><rect x="17" y="10" width="14" height="10" rx="1" fill="#c99467"/><rect x="17" y="24" width="14" height="12" rx="1" fill="#c99467"/><circle cx="31" cy="27" r="2" fill="${Y}"/>`;
ICON["⏰"]=`<circle cx="14" cy="9" r="5" fill="${R}"/><circle cx="34" cy="9" r="5" fill="${R}"/><circle cx="24" cy="26" r="15" fill="${C}"/><path d="M24 17v9l6 4" fill="none" stroke-width="2.8"/><path d="M12 40l-3 4M36 40l3 4" fill="none"/>`;
ICON["🕕"]=`<circle cx="24" cy="24" r="17" fill="${C}"/><path d="M24 12v12h-0.1" fill="none" stroke-width="2.8"/><path d="M24 24l-6 8" fill="none" stroke-width="2.8"/><circle class="ns" cx="24" cy="24" r="2" fill="${D}"/>`;
ICON["📖"]=`<path d="M4 12c7-3 14-3 20 2 6-5 13-5 20-2v25c-7-3-14-3-20 2-6-5-13-5-20-2z" fill="${C}"/><path d="M24 14v25" fill="none"/><path d="M10 19h9M10 25h9M29 19h9M29 25h9" fill="none" stroke-width="1.8"/>`;
ICON["📋"]=`<rect x="9" y="8" width="30" height="34" rx="3" fill="${TAN}"/><rect x="13" y="13" width="22" height="25" fill="${C}"/><rect x="18" y="5" width="12" height="7" rx="2" fill="${ST}"/><path d="M17 20h14M17 26h14M17 32h8" fill="none" stroke-width="2"/>`;

// ---------- fibres ----------
ICON["🧵"]=`<rect x="13" y="7" width="22" height="6" rx="2" fill="${TAN}"/><rect x="13" y="35" width="22" height="6" rx="2" fill="${TAN}"/><rect x="15" y="13" width="18" height="22" fill="${RS}"/><path d="M15 19l18 4M15 25l18 4" fill="none" stroke-width="1.8"/><path d="M33 30c6 2 7 8 2 10" fill="none"/>`;
ICON["🪢"]=`<path d="M6 24c6-13 13-6 18 0 5-6 12-13 18 0-6 13-13 6-18 0-5 6-12 13-18 0z" fill="${RS}"/><circle cx="24" cy="24" r="4.5" fill="${P}"/><path d="M10 38l-3 4M38 38l3 4" fill="none"/>`;
ICON["🧣"]=`<path d="M7 11h34v17c-4 3-4-1-8 1s-4-3-8 0-4-3-8 0-4-2-10-1z" fill="${L}"/><path d="M7 17h34M7 23h34" fill="none" stroke-width="1.8"/><path d="M12 29v9M20 29v7M28 29v9M36 29v7" fill="none"/>`;
ICON["🧤"]=`<path d="M13 41V26l-4-7c-1-3 3-5 5-2l3 4V9c0-3 5-3 5 0v11V7c0-3 5-3 5 0v13V9c0-3 5-3 5 0v18l3-4c2-3 6-1 4 3l-6 14c-1 3-3 4-6 4z" fill="${L}"/><path d="M14 36h22" fill="none" stroke-width="2"/>`;
ICON["🪵"]=`<path d="M5 40L22 14l6 8 5-5 10 23z" fill="${TAN}"/><circle class="ns" cx="14" cy="36" r="1.4" fill="${D}"/><circle class="ns" cx="23" cy="33" r="1.4" fill="${D}"/><circle class="ns" cx="31" cy="35" r="1.4" fill="${D}"/><circle class="ns" cx="26" cy="25" r="1.2" fill="${D}"/>`;
ICON["🌲"]=`<path d="M8 36c-2-12 6-20 16-18s14 9 8 15c-5 4-10 0-8-4 2-3 6-1 5 2" fill="none" stroke-width="5" stroke="${TAN}"/><path d="M8 36c-2-12 6-20 16-18s14 9 8 15c-5 4-10 0-8-4 2-3 6-1 5 2" fill="none" stroke-width="2.2"/>`;
ICON["👣"]=`<path d="M13 8c6-3 14 0 15 8 1 7-4 9-3 14 1 6-2 11-8 10-6-1-6-8-6-14 0-6-3-14 2-18z" fill="${BR}"/><path d="M14 36h10M13 30h11M14 24h11" fill="none" stroke-width="2"/><ellipse cx="35" cy="14" rx="3" ry="4" fill="${BR}"/>`;
ICON["👢"]=`<path d="M14 5h14v18l12 6c3 2 3 6 0 8l-1 4H11V30z" fill="${BR}"/><path d="M11 36h28" fill="none"/><rect x="14" y="5" width="14" height="6" fill="${TAN}"/>`;

// ---------- séance ----------
ICON["🕯️"]=`<path d="M24 4c5 6 5 9 0 12-5-3-5-6 0-12z" fill="${Y}"/><rect x="17" y="17" width="14" height="21" rx="2" fill="${C}"/><path d="M17 22c3 4 6-2 14 1" fill="none"/><ellipse cx="24" cy="40" rx="11" ry="4" fill="${ST}"/>`;
ICON["🫗"]=`<path d="M6 30c0-8 8-10 12-8 3-6 12-5 14 1 6 0 10 4 9 9-1 6-8 8-17 8-9 0-18-2-18-10z" fill="#fff0b8"/><path d="M33 10v6" fill="none" stroke-width="3"/><circle cx="33" cy="19" r="3" fill="#fff0b8"/>`;
ICON["🔮"]=`<rect x="5" y="9" width="38" height="28" rx="4" fill="#d6a46c"/><path d="M11 22a13 13 0 0 1 26 0" fill="none" stroke-width="2" stroke-dasharray="2 3"/><path d="M12 30h24" fill="none" stroke-width="2" stroke-dasharray="2 3"/><path d="M24 22c-3-3-7 1-3 5l3 3 3-3c4-4 0-8-3-5z" fill="${C}"/>`;
ICON["👻"]=`<path d="M10 42V22a14 14 0 0 1 28 0v20l-5-4-4 4-5-4-5 4-4-4z" fill="${W}"/><circle class="ns" cx="19" cy="22" r="2.6" fill="${D}"/><circle class="ns" cx="29" cy="22" r="2.6" fill="${D}"/><ellipse class="ns" cx="24" cy="30" rx="3" ry="3.6" fill="${D}"/>`;
ICON["☠️"]=`<path d="M10 22a14 14 0 0 1 28 0c0 5-2 7-5 9v6H15v-6c-3-2-5-4-5-9z" fill="${W}"/><circle class="ns" cx="18" cy="23" r="4" fill="${D}"/><circle class="ns" cx="30" cy="23" r="4" fill="${D}"/><path d="M24 28l-2 4h4z" fill="${D}"/><path d="M19 37v-4M24 37v-4M29 37v-4" fill="none" stroke-width="2"/><path d="M7 41l34-6M41 41L7 35" fill="none" stroke-width="3"/>`;

// ---------- ledger & post ----------
ICON["🧾"]=`<path d="M12 5h24v34l-4-3-4 3-4-3-4 3-4-3-4 3z" fill="${C}"/><path d="M17 13h14M17 19h14M17 25h8" fill="none" stroke-width="2"/><path d="M27 25h4" fill="none" stroke="${R}" stroke-width="2.6"/>`;
ICON["📃"]=`<path d="M10 5h22l8 8v28H10z" fill="${C}"/><path d="M32 5v8h8" fill="${TAN}"/><path d="M15 17h14M15 23h20M15 29h20" fill="none" stroke-width="2"/><rect x="25" y="33" width="10" height="5" fill="${Y}"/>`;
ICON["💷"]=`<rect x="4" y="12" width="40" height="24" rx="3" fill="${M}"/><circle cx="24" cy="24" r="8" fill="${C}"/><path d="M27 19c-4-3-7 0-6 4h5m-5 0v7h7" fill="none" stroke-width="2"/><circle class="ns" cx="9" cy="17" r="1.6" fill="${D}"/><circle class="ns" cx="39" cy="31" r="1.6" fill="${D}"/>`;
ICON["📒"]=`<rect x="9" y="5" width="30" height="36" rx="3" fill="${RS}"/><rect x="9" y="5" width="6" height="36" rx="3" fill="${R}"/><rect x="19" y="11" width="15" height="9" rx="1" fill="${C}"/><path d="M19 26h15M19 31h11" fill="none" stroke-width="2"/>`;
ICON["🏷️"]=`<rect x="8" y="9" width="32" height="30" rx="2" fill="${P}" stroke-dasharray="3 2.4"/><rect x="14" y="15" width="20" height="18" fill="${C}"/><path d="M24 31c-5-4-7-6-7-9a3.4 3.4 0 0 1 7-1 3.4 3.4 0 0 1 7 1c0 3-2 5-7 9z" fill="${R}"/>`;
ICON["✉️"]=`<rect x="5" y="11" width="38" height="27" rx="3" fill="${C}"/><path d="M5 13l19 15 19-15" fill="none"/><circle cx="24" cy="29" r="4.5" fill="${R}"/>`;
ICON["📨"]=`<path d="M9 5h30v22H9z" fill="${W}"/><path d="M14 11h20M14 16h20M14 21h12" fill="none" stroke-width="1.8"/><path d="M5 22l19 13 19-13v17a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z" fill="${C}"/><path d="M5 22l19 13 19-13" fill="none"/><path class="ns" d="M30 17l3 3m0-3l-3 3" stroke="${R}" stroke-width="2.4"/>`;
ICON["🚗"]=`<path d="M5 31v-7l4-9c1-3 3-4 6-4h20c3 0 5 1 6 4l4 9v7z" fill="${D}"/><path d="M12 15l-3 8h30l-3-8z" fill="${SK}"/><path d="M5 31v4h38v-4" fill="${ST}"/><circle cx="14" cy="36" r="5" fill="${C}"/><circle cx="34" cy="36" r="5" fill="${C}"/><rect class="ns" x="41" y="26" width="4" height="3" fill="${Y}"/>`;

// ---------- compose ----------
const inner=e=>ICON[e];
const svg=(body,cls)=>`<svg class="ic${cls?' '+cls:''}" viewBox="0 0 48 48" aria-hidden="true">${body}</svg>`;
window.ic=(e,cls)=>ICON[e]?svg(ICON[e],cls):`<span class="emo">${e}</span>`;

// generators: four level bases (crate, cabinet, counter, little building), tinted by the chain colour, wearing a glyph badge
const CHAIN_FILL={"chain-poison":"var(--mint)","chain-words":"var(--sky)","chain-fibre":"var(--pink)","chain-seance":"var(--lilac)","chain-gold":"var(--gold)","chain-steel":"var(--steel)"};
function badge(glyph,cx,cy,r){
  const g=ICON[glyph]; const s=(r*1.5)/48;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C}"/>`+(g?`<g transform="translate(${cx-24*s} ${cy-24*s}) scale(${s})">${g}</g>`:'');
}
const BASES=[
  (f,g)=>`<rect x="6" y="20" width="36" height="21" rx="3" style="fill:${f}"/><path d="M6 27h36" fill="none"/><path d="M17 20v-5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v5" fill="none"/>${badge(g,24,32,7)}`,
  (f,g)=>`<rect x="10" y="5" width="28" height="37" rx="3" style="fill:${f}"/><path d="M10 23h28" fill="none"/><rect x="14" y="9" width="20" height="11" rx="2" fill="${C}"/><circle cx="24" cy="32" r="0" fill="none"/>${badge(g,24,15,6.5)}<rect x="15" y="27" width="18" height="10" rx="2" fill="${C}"/><circle class="ns" cx="24" cy="32" r="1.8" fill="${D}"/>`,
  (f,g)=>`<rect x="3" y="24" width="42" height="6" rx="2" fill="${TAN}"/><rect x="6" y="30" width="36" height="12" style="fill:${f}"/><path d="M17 42v-6a7 7 0 0 1 14 0v6" fill="${C}"/><rect x="14" y="5" width="20" height="14" rx="3" fill="${C}"/><path d="M24 19v5" fill="none"/>${badge(g,24,12,6.5)}`,
  (f,g)=>`<path d="M4 17L24 4l20 13z" fill="${T}"/><rect x="7" y="17" width="34" height="25" style="fill:${f}"/><path d="M17 42V30a7 7 0 0 1 14 0v12z" fill="${C}"/><path d="M13 23h5M30 23h5" fill="none" stroke-width="3"/>${badge(g,24,14,5.5)}`
];
window.genIc=(chain,level,cls)=>{
  const f=CHAIN_FILL[CHAINS[chain].css]||"var(--cream)", glyph=CHAINS[chain].tiers[0][0];
  return svg(BASES[Math.min(level,4)-1](f,glyph),'gen'+(cls?' '+cls:''));
};

// the raven (Poe-tential): flat, bow-tied, blinks
window.raven=()=>`<svg viewBox="0 0 100 130" class="raven" aria-hidden="true">
  <g stroke="#3a2b33" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round">
    <path d="M40 112l-4 14M60 112l4 14" fill="none" stroke-width="4"/>
    <path d="M22 72c-6 18 4 42 28 42s34-22 26-44c-4-12-12-18-26-18-12 0-24 6-28 20z" fill="#4a3a55"/>
    <path d="M30 84c-10 4-14 18-6 28 8-2 16-8 20-20z" fill="#5a4a68"/>
    <path d="M70 100c10 6 18 8 24 6-4-8-12-12-24-14z" fill="#4a3a55"/>
    <circle cx="50" cy="40" r="26" fill="#4a3a55"/>
    <path d="M70 38l24 8-24 10z" fill="#f0bf4c"/>
    <path d="M40 18l-4-12 10 8 4-10 4 10 8-8-2 12" fill="#4a3a55"/>
    <circle cx="56" cy="36" r="8" fill="#fbf3e4"/>
    <circle class="rv-eye" cx="58" cy="37" r="4" fill="#3a2b33" stroke="none"/>
    <path d="M44 66l6 8 6-8 6 5v-12l-6 5-6-8-6 8-6-5v12z" fill="#d1382c" transform="translate(-2 10)"/>
  </g></svg>`;
})();
