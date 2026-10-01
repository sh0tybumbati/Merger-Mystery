(window.CASES = window.CASES || {}).case2 = {
  id: "case2", num: 2, title: "The Widow’s Undertaker", unlock: "case1",
  blurb: "Plum & Sons: the deceased has already taken the best coffin.",
  culprit: "fitch",
  need: ["fluid", "books", "boots", "alibi2"],
  chains: {
    embalm: { name:"Embalming Room", css:"chain-poison",
      gen:[["🧴","Tonic Shelf"],["🧰","Mortician's Case"],["⚗️","Chem Bench"],["🏥","Embalming Suite"]],
      tiers:[["💧","Drip"],["🫙","Sample Jar"],["🧪","Test Tube"],["🔬","Spectrum Slide"]], clue:"fluid" },
    floor:  { name:"Showroom Floor", css:"chain-gold",
      gen:[["🧹","Dustpan"],["🪵","Lumber Pile"],["🪚","Carpenter's Bench"],["🏭","Coffin Workshop"]],
      tiers:[["🪵","Sawdust"],["🌲","Cedar Shaving"],["👣","Boot Print"]], clue:"boots" },
    ledger: { name:"Counting House", css:"chain-steel",
      gen:[["📒","Cash Box"],["🧮","Abacus Desk"],["🗃️","Ledger Shelf"],["🏦","Little Bank"]],
      tiers:[["🧾","Receipt"],["📃","Invoice"],["💷","Bank Slip"]], clue:"books" },
    log:    { name:"Hearse Garage", css:"chain-words",
      gen:[["🔧","Tool Chest"],["🚲","Delivery Bike"],["🚐","Parlour Van"],["🚚","Hearse Depot"]],
      tiers:[["👂","Whisper"],["💬","Rumour"],["📋","Log Entry"]], clue:"alibi2",
      pair:{ tier:3, variants:[["🕕","Fitch's Statement: “Left at six sharp.”"],["📖","Hearse Log: “Returned 8:05, signed B. Fitch.”"]] } },
    letters:{ name:"Mourning Parlour", css:"chain-fibre",
      gen:[["📮","Post Box"],["📬","Letter Rack"],["🖋️","Writing Desk"],["🏤","Post Office"]],
      tiers:[["🏷️","Stamp"],["✉️","Envelope"],["📨","Poison-Pen Letter"]], clue:"letter" }
  },
  suspects: {
    fitch:   { name:"Mr. Fitch", face:"puppet:fitch", bio:"The junior partner. Hums when nervous. Hums constantly." },
    prunella:{ name:"Miss Plum", face:"puppet:prunella", bio:"The daughter. Inherits the parlour and a worrying hat-pin collection." },
    dolour:  { name:"Rev. Dolour", face:"puppet:dolour", bio:"The vicar. Conducts most of the funerals, and most of the sherry." },
    weep:    { name:"Mrs. Weep", face:"puppet:weep", bio:"The professional mourner. Cries on cue. Has not laughed since 1998." }
  },
  clues: {
    fluid:{ title:"Embalming Fluid in the Sherry", emoji:"🧴", who:"fitch",
      text:"The sherry reeks of formaldehyde, which is only kept in the locked embalming room. There are two keys: Mr. Plum's, and Mr. Fitch's." },
    books:{ title:"Cooked Books", emoji:"📒", who:"fitch",
      text:"Four hundred pounds is missing from the funeral fund. Each withdrawal is signed “I. Plum” in loops identical to Mr. Fitch's apprenticeship exercises." },
    boots:{ title:"Cedar Boot Print", emoji:"👢", who:"fitch",
      text:"A size-eleven print in cedar sawdust leads from the coffin showroom to the back door. Only the junior partner trims coffin lids, and only Mr. Fitch wears size eleven." },
    alibi2:{ title:"Hearse Log vs Statement", emoji:"🚗", who:"fitch", kind:"contradiction",
      text:"Mr. Fitch swears he left at six sharp. The hearse log says he signed the vehicle back in at five past eight." },
    letter:{ title:"Anonymous Letter: “MISS PLUM DID IT”", emoji:"✉️", who:null, herring:"Anonymous letters are not evidence, only rude. A red herring.",
      text:"Block capitals on Plum & Sons stationery accuse Miss Plum. Anonymous letters are not evidence, but they are certainly rude." }
  },
  scenes: {
    embalming:{ name:"Embalming Room", icon:"🧪", chains:["embalm","floor"], need:[], seed:{embalm:2,floor:2}, art:"embalming", felt:["#6fb5a0","#2f7566"] },
    counting: { name:"Counting House", icon:"🧮", chains:["ledger"], need:["fluid"], seed:{ledger:3}, art:"counting", felt:["#c9a35a","#7a5f25"] },
    garage:   { name:"Hearse Garage", icon:"🚚", chains:["log"], need:["fluid","books"], seed:{log:3}, art:"garage", felt:["#7d93b5","#3f5278"] },
    parlour:  { name:"Mourning Parlour", icon:"🌹", chains:["letters"], need:["fluid"], seed:{letters:2}, art:"parlour", felt:["#e58f92","#a45c78"] }
  },
  intro: [
    { who:"Plum & Sons, Funeral Directors · 9:12 a.m.", face:"⚰️", text:"Lady Vesper's parting hint led here: a parlour so tidy that even the dust has been alphabetised." },
    { who:"Inspector Bloat", face:"puppet:bloat", text:"Mr. Ignatius Plum, the undertaker, found in his own showroom coffin. The deluxe model. Quite comfortable, I'm told." },
    { who:"You, the Apprentice", face:"puppet:apprentice", text:"He didn't climb in by himself, Inspector. Somebody tidied him away. Bring me the sherry decanter." },
    { who:"Poe-tential", face:"raven", text:"Caw. Four suspects. Everyone here is professionally sad, so tears prove nothing." },
    { who:"Inspector Bloat", face:"puppet:bloat", text:"The daughter, the vicar, the professional mourner and the junior partner, Mr. Fitch. All very solemn. All very suspicious." },
    { who:"You, the Apprentice", face:"puppet:apprentice", text:"Then we begin with the decanter. Everything starts with a single drip." }
  ],
  showdown: [
    { claim:"I have never touched the embalming room key! (hum hum hum)", answer:"fluid",
      retort:"Then why does the sherry smell of the embalming room, Mr. Fitch? Only two keys exist, and one was in Mr. Plum's pocket." },
    { claim:"The accounts? Immaculate. Mr. Plum signed every page himself.", answer:"books",
      retort:"In the very loops you practised as an apprentice. Four hundred pounds, Mr. Fitch." },
    { claim:"I was never in the showroom. I don't even like cedar.", answer:"boots",
      retort:"Size eleven. Cedar sawdust, straight to the back door. You trim the coffin lids." },
    { claim:"I left at six sharp. Ask anyone! (hum)", answer:"alibi2",
      retort:"The hearse log says five past eight, in your own handwriting." }
  ],
  finale: {
    title: "“It was YOU, Mr. Fitch!”",
    text: "The <b>embalming fluid</b>, the <b>cooked books</b>, the <b>cedar boot print</b> and the <b>hearse log</b> all lead to the junior partner. Mr. Plum had found the missing funeral fund.",
    coda: "Mr. Fitch stops humming. For the first time in years, the parlour is perfectly quiet.",
    teaser: "Case 3 is coming soon."
  }
};
