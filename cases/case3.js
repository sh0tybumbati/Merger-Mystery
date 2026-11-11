(window.CASES = window.CASES || {}).case3 = {
  id: "case3", num: 3, title: "Murder on the Marmalade Express", unlock: "case2",
  blurb: "A locked sleeper compartment, a trolley of preserves and a very punctual conductor.",
  culprit: "pomfrey",
  need: ["jar", "key", "button", "alibi3"],
  chains: {
    jam:    { name:"Dining Car", css:"chain-gold",
      gen:[["🛒","Tea Trolley"],["🥫","Pantry Cupboard"],["🍳","Galley Range"],["🍽️","Dining Car"]],
      tiers:[["🍞","Crumb"],["🥄","Sticky Spoon"],["🍯","Hollow Marmalade Jar"]], clue:"jar" },
    luggage:{ name:"Luggage Van", css:"chain-steel",
      gen:[["🎒","Carpet Bag"],["🧳","Steamer Trunk"],["📦","Cargo Crate"],["🚂","Luggage Van"]],
      tiers:[["⚙️","Brass Filing"],["🪙","Brass Shaving"],["🗝️","Duplicate Master Key"]], clue:"key" },
    log:    { name:"Conductor's Corridor", css:"chain-words",
      gen:[["🎫","Ticket Punch"],["🕰️","Platform Clock"],["📟","Telegraph Desk"],["🚉","Station Office"]],
      tiers:[["👂","Whisper"],["💬","Rumour"],["📋","Station Record"]], clue:"alibi3",
      pair:{ tier:3, variants:[["🚶","Pomfrey's Statement: “I never left the corridor.”"],["📨","Telegram: “Conductor seen on Dunmore platform, 11:40.”"]] } },
    buttons:{ name:"Sleeper Compartments", css:"chain-fibre",
      gen:[["🧶","Knitting Bag"],["🛏️","Bunk Mattress"],["🧳","Valet Case"],["🏨","Sleeper Car"]],
      tiers:[["🧵","Loose Thread"],["✨","Brass Fleck"],["🔘","Uniform Button"]], clue:"button" },
    tent:   { name:"Fortune Corner", css:"chain-seance",
      gen:[["🫖","Teapot"],["🃏","Tarot Deck"],["🔮","Crystal Ball"],["⛺","Fortune Tent"]],
      tiers:[["🍃","Tea Leaf"],["☕","Tea Dregs"],["🔮","Reading: “Beware the Colonel”"]], clue:"reading" }
  },
  suspects: {
    pomfrey:{ name:"Mr. Pomfrey", face:"puppet:pomfrey", bio:"The conductor. Has not been late since 1911 and wants you to know it." },
    brisket:{ name:"Colonel Brisket", face:"puppet:brisket", bio:"A retired soldier. Retired from everything except shouting." },
    zola:   { name:"Madame Zola", face:"puppet:zola", bio:"The fortune teller. Has foreseen everything, strangely, after it happened." },
    quill:  { name:"Miss Quill", face:"puppet:quill", bio:"A travelling novelist. Takes notes on everyone, including the dead." }
  },
  clues: {
    jar:{ title:"The Hollow Marmalade Jar", emoji:"🍯", who:"pomfrey",
      text:"Baron Crumpet's marmalade jar has a false bottom, and a cut-glass emerald was hidden in it. The jars are loaded at the depot and checked by one man only: the conductor." },
    key:{ title:"Duplicate Master Key", emoji:"🗝️", who:"pomfrey",
      text:"The compartment was locked from the inside. But brass filings in the luggage van match a freshly cut master key, and only the conductor may carry a master key." },
    button:{ title:"Brass Button in the Baron's Fist", emoji:"🔘", who:"pomfrey",
      text:"The Baron died clutching a brass button stamped with the railway crest. It has a few threads still on it, and they match the conductor's coat. His left cuff is one button short." },
    alibi3:{ title:"Corridor Alibi Broken", emoji:"⏰", who:"pomfrey", kind:"contradiction",
      text:"Mr. Pomfrey swears he never left the corridor all night. A telegram from Dunmore Station says he stood on the platform at 11:40, while the train was supposedly in motion." },
    reading:{ title:"Tea Leaves: “Beware the Colonel”", emoji:"🔮", who:null, herring:"The tea leaves also predicted rain, a wedding and a haunted sandwich. A red herring.",
      text:"Madame Zola's reading names the Colonel. She also named the Colonel last Tuesday, for a missing umbrella." }
  },
  scenes: {
    sleeper:  { name:"Sleeper Compartments", icon:"🛏️", chains:["jam","buttons"], need:[], seed:{jam:2,buttons:2}, art:"carriage", felt:["#7d93b5","#3f5278"] },
    luggage:  { name:"Luggage Van", icon:"🧳", chains:["luggage"], need:["jar"], seed:{luggage:3}, art:"luggage", felt:["#c9a35a","#7a5f25"] },
    corridor: { name:"Conductor's Corridor", icon:"🎫", chains:["log"], need:["jar","key"], seed:{log:3}, art:"hall", felt:["#6fb5a0","#2f7566"] },
    fortune:  { name:"Fortune Corner", icon:"🔮", chains:["tent"], need:["jar"], seed:{tent:2}, art:"seance", felt:["#8f78c8","#5a4690"] }
  },
  intro: [
    { who:"The Marmalade Express · 11:58 p.m.", face:"🚂", text:"The night train rattles through Dunmore without stopping, which is rude of it, because someone has just been murdered." },
    { who:"Inspector Bloat", face:"puppet:bloat", text:"Baron Crumpet, in compartment seven. Locked from the inside. No window, no chimney, no other way in. Marvellous." },
    { who:"You, the Apprentice", face:"puppet:apprentice", text:"A locked room is only a door that someone had the key to, Inspector. Let's start with the jam." },
    { who:"Poe-tential", face:"raven", text:"Caw. Four passengers, one conductor, and a trolley full of preserves. Everyone's lying; the question is only how punctually." },
    { who:"Inspector Bloat", face:"puppet:bloat", text:"The conductor, the Colonel, the fortune teller and a novelist. All of them were on board. None of them can leave." },
    { who:"You, the Apprentice", face:"puppet:apprentice", text:"Then nobody leaves until the next station. Bring me the marmalade." }
  ],
  showdown: [
    { claim:"I haven't the foggiest idea about any jewels, I merely load the jam.", answer:"jar",
      retort:"Loaded, checked and stamped by you, Mr. Pomfrey. The jar has a false bottom, and the emerald is still in it." },
    { claim:"The Baron's door was locked from the inside. Nobody could have entered!", answer:"key",
      retort:"Nobody except the holder of a master key. The filings in the luggage van match a brand-new copy." },
    { claim:"I was in the corridor all night. I am never anywhere else.", answer:"alibi3",
      retort:"Then who stood on the platform at Dunmore at 11:40? The telegram has your name on it." },
    { claim:"I am the most punctual and tidy man on this railway!", answer:"button",
      retort:"Your left cuff is a button short, Mr. Pomfrey. The Baron is holding it." }
  ],
  finale: {
    title: "“It was YOU, Mr. Pomfrey!”",
    text: "The <b>hollow jar</b>, the <b>duplicate key</b>, the <b>broken corridor alibi</b> and the <b>missing button</b> all lead to the conductor. The Baron had found the emerald in his marmalade, and a conductor who smuggles gems cannot afford a witness.",
    coda: "Mr. Pomfrey checks his pocket watch. “Five minutes early,” he says, as the handcuffs click shut.",
    teaser: "Next episode: <b>“A Nasty Piece of Pâtisserie”</b>"
  }
};
