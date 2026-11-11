(window.CASES = window.CASES || {}).case4 = {
  id: "case4", num: 4, title: "A Nasty Piece of Pâtisserie", unlock: "case3",
  blurb: "Monsieur Gâteau has died face-down in his own croquembouche.",
  culprit: "sugarplum",
  need: ["marzipan", "icing", "bribe"],
  chains: {
    bake:  { name:"Test Kitchen", css:"chain-poison",
      gen:[["🥄","Spice Spoon"],["🧂","Pantry Rack"],["⚗️","Candy Bench"],["🏭","Confectionery Works"]],
      tiers:[["✨","Sprinkle"],["🌰","Almond Shaving"],["🍬","Marzipan Bite"],["🔬","Bitter Almond Slide"]], clue:"marzipan" },
    cuff:  { name:"Icing Bench", css:"chain-fibre",
      gen:[["🧁","Cupcake Tin"],["🎂","Cake Turntable"],["🪄","Piping Station"],["🏰","Sugar Palace"]],
      tiers:[["🍥","Crumb"],["🍰","Pink Icing Smear"],["🧥","Sticky Pink Cuff"]], clue:"icing" },
    paper: { name:"Critics' Table", css:"chain-words",
      gen:[["✒️","Fountain Pen"],["📰","Newsstand"],["🖨️","Printing Press"],["🏢","Gazette Office"]],
      tiers:[["👂","Whisper"],["💬","Rumour"],["📃","Printed Page"]], clue:"bribe",
      pair:{ tier:3, variants:[["📰","Sugarplum's Column: “I have never accepted a bribe.”"],["🧾","Receipt: “£50 from M. Gâteau, for four stars. —S.”"]] } },
    pin:   { name:"Pastry Counter", css:"chain-seance",
      gen:[["🌾","Flour Sack"],["🥖","Dough Trough"],["🥐","Proving Drawer"],["🏪","Bakery Counter"]],
      tiers:[["🌫️","Flour Puff"],["🫓","Stubborn Dough"],["🪵","Dented Rolling Pin"]], clue:"pin" }
  },
  suspects: {
    sugarplum:{ name:"Mr. Sugarplum", face:"puppet:sugarplum", bio:"The food critic. Has loved precisely four things in his life, and they were all free." },
    tarte:    { name:"Chef Tarte", face:"puppet:tarte", bio:"The head pâtissier. Shouts in two languages and weeps in a third." },
    brioche:  { name:"Madame Brioche", face:"puppet:brioche", bio:"The widow who owns the bakery. Wears flour like a veil." }
  },
  clues: {
    marzipan:{ title:"Bitter Almond Marzipan", emoji:"🍬", who:"sugarplum",
      text:"The croquembouche's marzipan holds a lethal dose of bitter almond. The marzipan came in a gift box, and the card on it reads: “With compliments, S.”" },
    icing:{ title:"Pink Icing on a Cuff", emoji:"🧥", who:"sugarplum",
      text:"Only the kitchen's Rose Room icing is that particular shade of pink, and a smear of it is drying on Mr. Sugarplum's shirt cuff. Critics are never allowed in the kitchen." },
    bribe:{ title:"Review vs Receipt", emoji:"🧾", who:"sugarplum", kind:"contradiction",
      text:"Mr. Sugarplum swears in print that he has never taken a bribe. A receipt in his own hand says he sold four stars to Monsieur Gâteau for £50." },
    pin:{ title:"Dented Rolling Pin", emoji:"🪵", who:null, herring:"Those dents are from Tuesday's stubborn dough, not murder. A red herring.",
      text:"A rolling pin with a dent in it lies near the body. The dent came from a particularly stubborn brioche, and nobody has ever been killed by a brioche." }
  },
  scenes: {
    kitchen: { name:"Test Kitchen", icon:"🧁", chains:["bake","cuff"], need:[], seed:{bake:2,cuff:2}, art:"bakery", felt:["#e58f92","#a45c78"] },
    critics: { name:"Critics' Table", icon:"📰", chains:["paper"], need:["marzipan"], seed:{paper:3}, art:"study", felt:["#4fa3a5","#2d7f88"] },
    counter: { name:"Pastry Counter", icon:"🥐", chains:["pin"], need:["marzipan"], seed:{pin:2}, art:"counting", felt:["#d98b6a","#8a4d3a"] }
  },
  intro: [
    { who:"Maison Gâteau · 6:40 a.m.", face:"🥐", text:"The bakery smells of warm butter and quiet disaster. The croquembouche has collapsed, and so has its maker." },
    { who:"Inspector Bloat", face:"puppet:bloat", text:"Monsieur Gâteau, face down in the profiteroles. I would call it a sweet end, but I'm told that is in poor taste." },
    { who:"You, the Apprentice", face:"puppet:apprentice", text:"It is in poor taste, Inspector. Probably bitter, too. Bring me the marzipan." },
    { who:"Poe-tential", face:"raven", text:"Caw. Three suspects, one dessert and no forks. Whoever did it has a sweet tooth for revenge." },
    { who:"Inspector Bloat", face:"puppet:bloat", text:"The critic, the chef and the widow who owns the place. All of them were in the shop when it happened." },
    { who:"You, the Apprentice", face:"puppet:apprentice", text:"Then we start with the sugar. Every crime in a bakery starts with a sprinkle." }
  ],
  showdown: [
    { claim:"Poison? In a cake? I merely came for the lemon tart.", answer:"marzipan",
      retort:"The marzipan came in a gift box, Mr. Sugarplum. The card says ‘With compliments, S.’ The almond is bitter, and so is the card." },
    { claim:"I have never set foot in the kitchen. A critic keeps his distance!", answer:"icing",
      retort:"Then why is the Rose Room's pink icing drying on your cuff? Nobody else uses that shade." },
    { claim:"My column is utterly incorruptible. I have never taken a bribe.", answer:"bribe",
      retort:"Your receipt says otherwise: four stars, fifty pounds, signed with your own initial. Gâteau was about to tell the Gazette." }
  ],
  finale: {
    title: "“It was YOU, Mr. Sugarplum!”",
    text: "The <b>bitter marzipan</b>, the <b>pink icing on your cuff</b> and the <b>receipt for four stars</b> all point to the critic. Monsieur Gâteau was going to expose the bribes.",
    coda: "Mr. Sugarplum is led away. He remarks, over his shoulder, that the handcuffs are overdone.",
    teaser: "Next episode: <b>“Dead Calm at Gull Rock”</b>"
  }
};
