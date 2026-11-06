(window.CASES = window.CASES || {}).case6 = {
  id: "case6", num: 6, title: "The Phantom of the Pantomime", unlock: "case5",
  blurb: "Sir Thespian Gloat has taken his final bow, courtesy of a falling sandbag.",
  culprit: "fennel",
  need: ["rope", "props", "chalk", "stagehand"],
  chains: {
    fly:  { name:"Fly Loft", css:"chain-steel",
      gen:[["🧵","Hemp Spool"],["🪝","Pulley Block"],["🎭","Rigging Rack"],["🏗️","Fly Gallery"]],
      tiers:[["🧶","Hemp Fibre"],["✂️","Frayed Strand"],["🪢","Cut Rope End"]], clue:"rope" },
    props:{ name:"Prop Store", css:"chain-gold",
      gen:[["✨","Glitter Tin"],["🎩","Hat Box"],["👑","Costume Trunk"],["🏪","Prop Warehouse"]],
      tiers:[["✨","Glitter"],["💎","Paste Jewel"],["📋","Stripped Inventory"]], clue:"props" },
    chalk:{ name:"Stage Left", css:"chain-fibre",
      gen:[["🖍️","Chalk Stick"],["📐","Spike-Mark Tape"],["🔨","Scenery Bench"],["🎪","Backstage Wing"]],
      tiers:[["🌫️","Chalk Dust"],["🖐️","Chalk Smear"],["👍","Chalk Thumbprint"]], clue:"chalk" },
    cue:  { name:"Prompt Desk", css:"chain-words",
      gen:[["📖","Prompt Book"],["🔔","Cue Light"],["🎧","Headset"],["🎼","Orchestra Pit"]],
      tiers:[["👂","Whisper"],["💬","Rumour"],["📜","Cue Sheet"]], clue:"stagehand",
      pair:{ tier:3, variants:[["🙅","Fennel's Statement: “I never touched the sandbag rigging.”"],["🧑‍🔧","Stagehand: “Mr. Fennel retied the sandbag himself at the interval.”"]] } },
    mail: { name:"Dressing Room", css:"chain-seance",
      gen:[["💌","Fan Mail Basket"],["💄","Make-up Table"],["🪞","Star Mirror"],["🚪","Star Dressing Room"]],
      tiers:[["💌","Perfumed Note"],["✉️","Angry Letter"],["📜","Threat: “I’ll bring the curtain down!”"]], clue:"fanmail" }
  },
  suspects: {
    fennel:  { name:"Mr. Fennel", face:"puppet:fennel", bio:"The stage manager. Dressed in black, speaks in cues, trusts no one in the dark." },
    dora:    { name:"Dame Dora", face:"puppet:dora", bio:"The pantomime dame. Larger than life and, regrettably, larger than the doorway." },
    crotchet:{ name:"Maestro Crotchet", face:"puppet:crotchet", bio:"The conductor. Considers every cough an insult to Mozart." },
    percy:   { name:"Percy Pennywhistle", face:"puppet:percy", bio:"Sir Thespian's understudy. Has been ready to step in for eleven years." }
  },
  clues: {
    rope:{ title:"The Cut Rope End", emoji:"🪢", who:"fennel",
      text:"The sandbag's rope was cut clean with a rigging knife, not frayed, and only the stage manager may carry a rigging knife into the fly loft." },
    props:{ title:"Stripped Prop Inventory", emoji:"📋", who:"fennel",
      text:"The prop store inventory is missing half the Cinderella carriage, three crowns and a very good chandelier, all signed out by “F.” The pawn shop on Fleet Street has the rest." },
    chalk:{ title:"Chalk Thumbprint on the Winch", emoji:"👍", who:"fennel",
      text:"A fresh chalk thumbprint sits on the sandbag winch. Only the stage manager chalks the spike marks, and nobody else has chalk on his thumbs." },
    stagehand:{ title:"Rigging Alibi Broken", emoji:"⏰", who:"fennel", kind:"contradiction",
      text:"Mr. Fennel swears he never touched the sandbag rigging. A stagehand saw him retie it himself at the interval." },
    fanmail:{ title:"Fan Mail: “I’ll bring the curtain down!”", emoji:"💌", who:null, herring:"The sender meant it as a review. A red herring.",
      text:"An angry letter promises to bring the curtain down on Sir Thespian. It was sent by a critic from Tuesday's matinee, and he meant the curtain at the end of the show." }
  },
  scenes: {
    wing:    { name:"Stage Left", icon:"🎭", chains:["fly","chalk"], need:[], seed:{fly:2,chalk:2}, art:"stage", felt:["#e58f92","#a45c78"] },
    store:   { name:"Prop Store", icon:"👑", chains:["props"], need:["rope"], seed:{props:3}, art:"counting", felt:["#c9a35a","#7a5f25"] },
    prompt:  { name:"Prompt Desk", icon:"📖", chains:["cue"], need:["rope","props"], seed:{cue:3}, art:"hall", felt:["#6fb5a0","#2f7566"] },
    dressing:{ name:"Star Dressing Room", icon:"🪞", chains:["mail"], need:["rope"], seed:{mail:2}, art:"parlour", felt:["#8f78c8","#5a4690"] }
  },
  intro: [
    { who:"The Royal Gaslight Theatre · 9:48 p.m.", face:"🎭", text:"The audience applauded the fall of the sandbag. They thought it was part of the show." },
    { who:"Inspector Bloat", face:"puppet:bloat", text:"Sir Thespian Gloat, flattened mid-song. The panto is called Cinderella. I'm told he was a very convincing prince." },
    { who:"You, the Apprentice", face:"puppet:apprentice", text:"A sandbag does not drop by accident, Inspector. Somebody let it go. Show me the rope." },
    { who:"Poe-tential", face:"raven", text:"Caw. Four suspects, one stage and a hundred witnesses who all think it was the finale." },
    { who:"Inspector Bloat", face:"puppet:bloat", text:"The stage manager, the Dame, the conductor and the understudy. Naturally, the understudy is delighted." },
    { who:"You, the Apprentice", face:"puppet:apprentice", text:"Then we go backstage. We start with a single strand of hemp." }
  ],
  showdown: [
    { claim:"The rope snapped. Old rigging does that. Nobody touched it.", answer:"rope",
      retort:"It was cut clean, Mr. Fennel, with a rigging knife. You are the only one who carries one into the fly loft." },
    { claim:"The prop store? Spotless. I count every crown myself.", answer:"props",
      retort:"Half a carriage, three crowns and a chandelier, all signed ‘F.’ The pawn shop has the receipts." },
    { claim:"Chalk? Everyone has chalk on their hands in a theatre!", answer:"chalk",
      retort:"Not on the winch handle. Only the stage manager marks the spikes, and your thumb fits." },
    { claim:"I never went near the sandbag rigging, not once!", answer:"stagehand",
      retort:"A stagehand watched you retie it at the interval. Your word and his cannot both stand." }
  ],
  finale: {
    title: "“It was YOU, Mr. Fennel!”",
    text: "The <b>cut rope</b>, the <b>stripped inventory</b>, the <b>chalk thumbprint</b> and the <b>retied sandbag</b> all lead to the stage manager. Sir Thespian had spotted the missing props and was about to tell the owner.",
    coda: "Mr. Fennel looks up at the empty fly loft. “Blackout,” he whispers, and the house lights come up.",
    teaser: "More mysteries are on their way. The Inspector is already hungry."
  }
};
