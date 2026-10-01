/* Case 1 — everything content-related lives here. Add a new case by adding a file like this and listing it in index.html + sw.js. */
(window.CASES = window.CASES || {}).case1 = {
  id: "case1", num: 1, title: "The Late Mr. Grimsby",
  blurb: "A widow, a doctor, a butler and a cold cup of tea.",
  culprit: "vesper",
  need: ["belladonna", "alibi", "glove"],            // true clues required to close the case
  chains: {
    poison: { name:"Forensic Lab", css:"chain-poison",
      gen:[["🧰","Field Kit"],["🧫","Petri Bench"],["⚗️","Chem Bench"],["🏥","Forensic Lab"]],
      tiers:[["🌫️","Dust Mote"],["🧂","Powder Pinch"],["🧪","Vial of Residue"],["🔬","Lab Slide"]], clue:"belladonna" },
    words:  { name:"Witness Desk", css:"chain-words",
      gen:[["📁","Case Folder"],["🗄️","Filing Cabinet"],["🗃️","Card Index"],["🏛️","Town Archive"]],
      tiers:[["👂","Whisper"],["💬","Rumour"],["📜","Signed Statement"]], clue:"alibi",
      // contradiction tier: two variants; only a *clashing* pair merges (into the clue)
      pair:{ tier:3, variants:[["🛌","Lady Vesper's Statement: “In bed by nine.”"],["🚪","Maid's Statement: “Conservatory door, ten to nine.”"]] } },
    fibre:  { name:"Trace Kit", css:"chain-fibre",
      gen:[["🧺","Sewing Basket"],["🪡","Tailor's Kit"],["🧥","Tailor's Dummy"],["🏬","Tailor Shop"]],
      tiers:[["🧵","Loose Thread"],["🪢","Fibre Tuft"],["🧣","Silk Scrap"]], clue:"glove" },
    seance: { name:"Séance Parlour", css:"chain-seance",
      gen:[["🕯️","Candle Stand"],["🕸️","Dusty Table"],["🔮","Crystal Ball"],["🏚️","Haunted Parlour"]],
      tiers:[["🕯️","Candle Stub"],["🫗","Wax Pool"],["🔮","Spirit Board"]], clue:"ghost" }
  },
  suspects: {
    vesper:{ name:"Lady Vesper", face:"puppet:vesper", bio:"The widow. Prizes rare blooms in her private conservatory." },
    morrow:{ name:"Dr. Morrow", face:"puppet:morrow", bio:"The physician. Was seen at his club all evening." },
    crane: { name:"Mr. Crane", face:"puppet:crane", bio:"The butler. Allergic to every flower; never enters a greenhouse." }
  },
  clues: {
    belladonna:{ title:"Toxin: Belladonna", emoji:"☠️", who:"vesper",
      text:"The slide shows belladonna, a rare bloom. Only a garden that grows it could have supplied it." },
    alibi:{ title:"Alibi Broken", emoji:"⏰", who:"vesper", kind:"contradiction",
      text:"Two statements clash: Lady Vesper claimed she was in bed at nine, yet the maid heard the conservatory door at ten to." },
    glove:{ title:"Lavender Glove", emoji:"🧤", who:"vesper",
      text:"A scrap of lavender silk on the study latch, torn from a left-hand glove. Lavender is Lady Vesper's colour." },
    ghost:{ title:"Spirit Board: “C-R-A-N-E”", emoji:"👻", who:null, herring:"Ghosts leave no fingerprints. A red herring.",
      text:"The planchette spelled CRANE. (Ghosts, sadly, are not admissible evidence.)" }
  },
  scenes: {
    study: { name:"The Study", icon:"📚", chains:["poison","fibre"], need:[], seed:{poison:2,fibre:2}, art:"study", felt:["#4fa3a5","#2d7f88"] },
    hall:  { name:"Servants' Hall", icon:"🧹", chains:["words"], need:["belladonna","glove"], seed:{words:3}, art:"hall", felt:["#d98b6a","#8a4d3a"] },
    seance:{ name:"Séance Parlour", icon:"🕯️", chains:["seance"], need:["belladonna"], seed:{seance:2}, art:"seance", felt:["#8f78c8","#5a4690"] }
  },
  intro: [
    { who:"Grimsby Hollow · 11:04 p.m.", face:"🏚️", text:"The manor leans a little further to the left tonight, as if it were listening." },
    { who:"Inspector Bloat", face:"puppet:bloat", text:"He died of… surprise? Look at that face! And the tea isn't even cold." },
    { who:"You, the Apprentice", face:"puppet:apprentice", text:"Nobody dies of surprise, Inspector. Somebody arranged it. Bring me the teapot." },
    { who:"Poe-tential", face:"raven", text:"Caw. Red string for truth, grey string for gossip. Three suspects, one killer." },
    { who:"Inspector Bloat", face:"puppet:bloat", text:"The widow, the physician and the butler. All upstairs, all lying in their own special ways." },
    { who:"You, the Apprentice", face:"puppet:apprentice", text:"Then we start small. Everything begins with a single speck of dust." }
  ],
  showdown: [
    { claim:"I never touched the tea, darling. I couldn't lift a teapot!", answer:"glove",
      retort:"Your lavender glove was snagged on the study latch, Lady Vesper. Left hand. The very hand that holds your teacup." },
    { claim:"I was in bed all evening. Ask anyone!", answer:"alibi",
      retort:"We did ask. The maid heard the conservatory door at ten to nine. Your story and hers cannot both be true." },
    { claim:"Poison? I wouldn't know belladonna from a buttercup!", answer:"belladonna",
      retort:"Then why is it the one rare bloom in your conservatory? Only your garden grows it." }
  ],
  finale: {
    title: "“It was YOU, Lady Vesper!”",
    text: "The <b>belladonna</b> came from your conservatory. Your <b>alibi</b> collapsed at ten to nine. And your <b>lavender glove</b> was caught on the study latch.",
    coda: "Lady Vesper sighs, straightens her veil, and asks whether there will be biscuits.",
    teaser: "Next episode: <b>“The Widow’s Undertaker”</b>"
  }
};
