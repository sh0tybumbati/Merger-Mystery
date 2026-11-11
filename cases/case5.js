(window.CASES = window.CASES || {}).case5 = {
  id: "case5", num: 5, title: "Dead Calm at Gull Rock", unlock: "case4",
  blurb: "The lighthouse keeper is dead, the lamp is out and the ferry swears it never sailed.",
  culprit: "mossop",
  need: ["oil", "knot", "ferry"],
  chains: {
    lamp:  { name:"Lamp Room", css:"chain-poison",
      gen:[["🪔","Oil Can"],["🛢️","Fuel Barrel"],["⚗️","Chem Bench"],["🏥","Harbour Lab"]],
      tiers:[["💧","Oil Drop"],["🫙","Sample Jar"],["🧪","Test Tube"],["🔬","Cheap Paraffin Slide"]], clue:"oil" },
    rope:  { name:"Boat House", css:"chain-steel",
      gen:[["🪢","Rope Coil"],["⚓","Anchor Rack"],["🛶","Dinghy"],["⛵","Boat House"]],
      tiers:[["🧵","Tarry Fibre"],["🪢","Frayed Rope"],["🔗","Ferryman's Knot"]], clue:"knot" },
    tide:  { name:"Harbour Office", css:"chain-words",
      gen:[["📓","Notebook"],["📒","Tide Table"],["🗺️","Chart Desk"],["🏛️","Harbour Archive"]],
      tiers:[["👂","Whisper"],["💬","Rumour"],["📃","Harbour Entry"]], clue:"ferry",
      pair:{ tier:3, variants:[["⛈️","Mossop's Statement: “The ferry never sailed; the storm kept us in.”"],["🔔","Keeper's Log: “Ferry bell rang at two. Boat at the jetty.”"]] } },
    shells:{ name:"Shell Cabinet", css:"chain-gold",
      gen:[["🐚","Beach Bucket"],["🧺","Collecting Basket"],["🗄️","Specimen Drawer"],["🏺","Little Museum"]],
      tiers:[["🐚","Shell Chip"],["🐌","Sea Snail"],["🐚","Cone Shell: “Venomous!”"]], clue:"cone" }
  },
  suspects: {
    mossop:{ name:"Mr. Mossop", face:"puppet:mossop", bio:"The ferryman. Says the sea is honest. Says it quite often." },
    gannet:{ name:"Miss Gannet", face:"puppet:gannet", bio:"A naturalist. Collects shells, birds and unfortunate remarks." },
    fogg:  { name:"Admiral Fogg", face:"puppet:fogg", bio:"Retired navy. Insists every room is a ship." },
    winkle:{ name:"Mrs. Winkle", face:"puppet:winkle", bio:"The keeper's cook. Has opinions on soup and the weather." }
  },
  clues: {
    oil:{ title:"Cheap Paraffin in the Lamp", emoji:"🛢️", who:"mossop",
      text:"The lamp was filled with cheap paraffin that smokes and gutters and cannot be seen through fog. Only the ferry brings paraffin to Gull Rock, and it's sold in Mr. Mossop's own tins." },
    knot:{ title:"A Ferryman's Knot", emoji:"🪢", who:"mossop",
      text:"The rope on the gallery rail is tied in a double bowline, which only a ferryman uses. The Admiral ties a naval hitch, and Miss Gannet cannot tie anything." },
    ferry:{ title:"Ferry Alibi Broken", emoji:"⏰", who:"mossop", kind:"contradiction",
      text:"Mr. Mossop says the ferry never sailed that night. The keeper's log says the ferry bell rang at two, and that the boat was at the jetty." },
    cone:{ title:"Cone Shell: “Venomous!”", emoji:"🐚", who:null, herring:"A cone shell is venomous only if you eat it, and Miss Gannet only looks at them. A red herring.",
      text:"A venomous cone shell sits in Miss Gannet's cabinet. It has been there since 1998, and it is the most harmless thing in the whole lighthouse." }
  },
  scenes: {
    lamproom:{ name:"The Lamp Room", icon:"💡", chains:["lamp","rope"], need:[], seed:{lamp:2,rope:2}, art:"lighthouse", felt:["#7d93b5","#3f5278"] },
    harbour: { name:"Harbour Office", icon:"⚓", chains:["tide"], need:["oil"], seed:{tide:3}, art:"counting", felt:["#4fa3a5","#2d7f88"] },
    cabinet: { name:"Shell Cabinet", icon:"🐚", chains:["shells"], need:["oil"], seed:{shells:2}, art:"study", felt:["#c9a35a","#7a5f25"] }
  },
  intro: [
    { who:"Gull Rock Lighthouse · 3:15 a.m.", face:"🗼", text:"The fog is so thick that the lighthouse has been mistaken for a very tall, very rude cloud." },
    { who:"Inspector Bloat", face:"puppet:bloat", text:"Captain Barnacle, the keeper, found at the foot of the lamp stairs. The lamp was out. A ship nearly hit the rocks." },
    { who:"You, the Apprentice", face:"puppet:apprentice", text:"A light does not go out by itself, Inspector. Somebody spoiled the lamp. Bring me the oil can." },
    { who:"Poe-tential", face:"raven", text:"Caw. Four people and a tide. The tide is the only one with an alibi." },
    { who:"Inspector Bloat", face:"puppet:bloat", text:"The ferryman, the naturalist, the Admiral and the cook. The tide comes in at six, so nobody leaves before then." },
    { who:"You, the Apprentice", face:"puppet:apprentice", text:"Then we have until six. We start with a single drop of oil." }
  ],
  showdown: [
    { claim:"The lamp? I never touch the lamp. I only touch the water!", answer:"oil",
      retort:"Then why is the lamp full of paraffin from your tins, Mr. Mossop? Nobody else brings oil to Gull Rock." },
    { claim:"A knot is a knot! Anyone could have tied it.", answer:"knot",
      retort:"A double bowline, Mr. Mossop, the way ferrymen tie them. The Admiral uses a naval hitch, and I checked." },
    { claim:"The ferry never sailed. The storm kept us in all night.", answer:"ferry",
      retort:"The keeper's log says the ferry bell rang at two with the boat at the jetty. Your story and his cannot both be true." }
  ],
  finale: {
    title: "“It was YOU, Mr. Mossop!”",
    text: "The <b>cheap paraffin</b>, the <b>ferryman's knot</b> and the <b>ferry bell at two</b> all lead to Mr. Mossop. The keeper had caught him wrecking ships to salvage the cargo.",
    coda: "Mr. Mossop stares at the dark sea. “Honest, it was,” he mutters. “Until it was inconvenient.”",
    teaser: "Next episode: <b>“The Phantom of the Pantomime”</b>"
  }
};
