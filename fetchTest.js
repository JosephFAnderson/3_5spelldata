const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");
const DOMParser = new JSDOM().window.DOMParser;
const ObjectsToCSV = require('objects-to-csv');

let spellID = 1;

const classData = [
   ["Adept",1],
   ["Apostle of Peace",2],
   ["Ardent",3],
   ["Artificer",4],
   ["Assassin",5],
   ["Bard",6],
   ["Beastmaster",7],
   ["Beguiler",8],
   ["Beloved of Valarian",9],
   ["Blackguard",10],
   ["Blighter",11],
   ["Bone Collector",12],
   ["Champion of Gwynharwyf",13],
   ["Cleric",14],
   ["Court Herald",15],
   ["Crusader",16],
   ["Death Delver",17],
   ["Death Master",18],
   ["Demonologist",19],
   ["Disciple of Thrym",20],
   ["Divine Bard",21],
   ["Dread Necromancer",22],
   ["Druid",23],
   ["Duskblade",24],
   ["Ebonmar Infiltrator",25],
   ["Emissary of Barachiel",26],
   ["Exalted Arcanist",27],
   ["Fatemaker",28],
   ["Harper Scout",29],
   ["Hathran",30],
   ["Healer",31],
   ["Hexblade",32],
   ["Hoardstealer",33],
   ["Hunter of the Dead",34],
   ["Jester",35],
   ["Justic of Weald and Woe",36],
   ["Knight of the Chalice",37],
   ["Knight of the Weave",38],
   ["Merchant Prince",39],
   ["Mortal Hunter",40],
   ["Nar Demonbinder",41],
   ["Nentyar Hunter",42],
   ["Paladin",43],
   ["Prime Underdark Guide",44],
   ["Ranger",45],
   ["Runescarred Berserker",46],
   ["Savant",47],
   ["Sha'ir",48],
   ["Shaman",49],
   ["Shugenja",50],
   ["Slayer of Domiel",51],
   ["Sorcerer",52],
   ["Telflammar Shadowlord",53],
   ["Thayan Slaver",54],
   ["Trapsmith",55],
   ["Urban Druid",56],
   ["Vassal of Bahamut",57],
   ["Vigilante",58],
   ["Warmage",59],
   ["Wizard",60],
   ["Wu Jen",61]
];
const classMap = new Map();
classData.forEach( data => classMap.set(data[0], data[1]) );

const domainData = [
   ["Abyss",1],
   ["Air",2],
   ["Ancestor",3],
   ["Animal",4],
   ["Arborea",5],
   ["Artifice",6],
   ["Baator",7],
   ["Balance",8],
   ["Bestial",9],
   ["Blackwater",10],
   ["Blightbringer",11],
   ["Brahmin",12],
   ["Cavern",13],
   ["Celerity",14],
   ["Celestia",15],
   ["Celestial",16],
   ["Chaos",17],
   ["Charm",18],
   ["City",19],
   ["Cold",20],
   ["Community",21],
   ["Competition",22],
   ["Corrupt",23],
   ["Corruption",24],
   ["Courage",25],
   ["Craft",26],
   ["Creation",27],
   ["Darkness",28],
   ["Death",29],
   ["Deaathbound",30],
   ["Deathless",31],
   ["Demonic",32],
   ["Destiny",33],
   ["Destruction",34],
   ["Diabolic",35],
   ["Divination",36],
   ["Domination",37],
   ["Dragon",38],
   ["Dream",39],
   ["Drow",40],
   ["Dwarf",41],
   ["Earth",42],
   ["Elf",43],
   ["Elysium",44],
   ["Endurance",45],
   ["Entropy",46],
   ["Envy",47],
   ["Evil",48],
   ["Exorcism",49],
   ["Family",50],
   ["Fate",51],
   ["Feast",52],
   ["Fey",53],
   ["Fire",54],
   ["Flame",55],
   ["Force",56],
   ["Fortune",57],
   ["Fury",58],
   ["Ghost",59],
   ["Glory",60],
   ["Gluttony",61],
   ["Gnome",62],
   ["Good",63],
   ["Grave",64],
   ["Greed",65],
   ["Guardian",66],
   ["Hades",67],
   ["Halfling",68],
   ["Hatred",69],
   ["Healing",70],
   ["Herald",71],
   ["Hero",72],
   ["Hunger",73],
   ["Hunt",74],
   ["Illusion",75],
   ["Incarnum",76],
   ["Initiate of Anhur",77],
   ["Initiate of Bane",78],
   ["Initiate of Baravar Cloakshadow",79],
   ["Initiate of Cyric",80],
   ["Initiate of Eillistraee",81],
   ["Initiate of Ghaunadaur",82],
   ["Initiate of Gond",83],
   ["Initiate of Gruumsh",84],
   ["Initiate of Helm",85],
   ["Initiate of Horus-re",86],
   ["Initiate of Ilmater",87],
   ["Initiate of Lathander",88],
   ["Initiate of Malar",89],
   ["Initiate of Milil",90],
   ["Initiate of Mystra",91],
   ["Initiate of Nature",92],
   ["Initiate of Nobanion",93],
   ["Initiate of Selune",94],
   ["Initiate of the Holy Realm",95],
   ["Initiate of Tymora",96],
   ["Initiate of Tyr",97],
   ["Inquisition",98],
   ["Joy",99],
   ["Knowledge",100],
   ["Law",101],
   ["Liberation",102],
   ["Limbo",103],
   ["Luck",104],
   ["Lust",105],
   ["Madness",106],
   ["Magic",107],
   ["Mechanus",108],
   ["Mentalism",109],
   ["Metal",110],
   ["Mind",111],
   ["Moon",112],
   ["Mysticism",113],
   ["Nature",114],
   ["Night",115],
   ["Nobility",116],
   ["Ocean",117],
   ["Oneiromancy",118],
   ["Ooze",119],
   ["Oracle",120],
   ["Orc",121],
   ["Pact",122],
   ["Pain",123],
   ["Pestilence",124],
   ["Planning",125],
   ["Plant",126],
   ["Pleasure",127],
   ["Portal",128],
   ["Pride",129],
   ["Protection",130],
   ["Purification",131],
   ["Renewal",132],
   ["Repose",133],
   ["Retribution",134],
   ["Revered Ancestor",135],
   ["River",136],
   ["Rune",137],
   ["Sanctified",138],
   ["Sand",139],
   ["Scalykind",140],
   ["Seafolk",141],
   ["Sky",142],
   ["Slime",143],
   ["Sloth",144],
   ["Spell",145],
   ["Spider",146],
   ["Spite",147],
   ["Stone",148],
   ["Storm",149],
   ["Strength",150],
   ["Suffering",151],
   ["Summer",152],
   ["Summoning",153],
   ["Sun",154],
   ["Temptation",155],
   ["Thirst",156],
   ["Time",157],
   ["Trade",158],
   ["Transformation",159],
   ["Travel",160],
   ["Trickery",161],
   ["Truth",162],
   ["Tyranny",163],
   ["Undeath",164],
   ["Vile Darkness",165],
   ["War",166],
   ["Warforged",167],
   ["Water",168],
   ["Watery Death",169],
   ["Wealth",170],
   ["Weather",171],
   ["Windstorm",172],
   ["Winter",173],
   ["Wood",174],
   ["Wrath",175],
   ["Zeal",176]
]
const domainMap = new Map();
domainData.forEach( data => domainMap.set(data[0], data[1]) );

const schoolData = [
   ["Abjuration",1],
   ["Conjuration",2],
   ["Divination",3],
   ["Enchantment",4],
   ["Evocation",5],
   ["Illusion",6],
   ["Necromancy",7],
   ["Transmutation",8],
   ["Universal",9]
]
const schoolMap = new Map();
schoolData.forEach( data => schoolMap.set(data[0], data[1]) );

const subschoolData = [
   ["Calling",1],
   ["Charm",2],
   ["Compulsion",3],
   ["Creation",4],
   ["Figment",5],
   ["Glamer",6],
   ["Healing",7],
   ["Pattern",8],
   ["Phantasm",9],
   ["Polymorph",10],
   ["Scrying",11],
   ["Shadow",12],
   ["Summoning",13],
   ["Teleportation",14]
]
const subschoolMap = new Map();
subschoolData.forEach( data => subschoolMap.set(data[0], data[1]) );

const descriptorData = [
   ["Acid",1],
   ["Air",2],
   ["Blood",3],
   ["Chaotic",4],
   ["Cold",5],
   ["Darkness",6],
   ["Death",7],
   ["Earth",8],
   ["Electricity",9],
   ["Evil",10],
   ["Fear",11],
   ["Fire",12],
   ["Force",13],
   ["Good",14],
   ["Incarnum", 15],
   ["Language-dependent",16],
   ["Lawful",17],
   ["Light",18],
   ["Luck",19],
   ["Mind-Affecting",20],
   ["Sleep",21],
   ["Sonic",22],
   ["Teleportation",23],
   ["Water",24]
]
const descriptorMap = new Map();
descriptorData.forEach( data => descriptorMap.set(data[0], data[1]) );

const classCSVData = [];
const domainCSVData = [];
const schoolCSVData = [];
const subschoolCSVData = [];
const descriptorCSVData = [];
const spellCSVData = [];

const fetchSpell = async url => {
   const spellTemplate = {
      name: "",
      components: "",
      casting_time: "",
      range: "null",
      target: "null",
      area: "null",
      effect: "null",
      duration: "",
      saving_throw: "None",
      spell_resistance: "No",
      description: "",
      materials: "null",
      sourcebook: "",
   }   

   const res = await fetch(url);
   const spell = await res.text();
   
   const parser = new DOMParser();
   const doc = parser.parseFromString(spell, 'text/html');

   // Grabs the info in the content div
   const content = doc.getElementById("content").innerHTML;

   // Split the array between spell info and spell description
   const spellArray = content.split("<p>");

   // replace all closing p tags and breaks with spellbookCompanion line break identifier
   // replace all new line characters with empty strings
   spellArray.forEach( (data, index) => {
      if( index !== 0 ) {         
         data = data.trim().replaceAll("</p>", "%br%");
         data = data.trim().replaceAll("<br>", "%br%");
         data = data.trim().replaceAll("\n", "");
         spellArray[index] = data;
      }
   })

   const updatedContent = spellArray.join("");
   const contentArray = updatedContent.split("<br>");

   contentArray.forEach( (element, index) => {
      if( element === "\n" ) {
         return;
      }

      if(index === 0) {
         // This index will contain sourcebook information
         const test2 = element.replaceAll("</a>", "").trim().split("\n");
         const name = test2[1].replace("<h2>", "").replace("</h2>", "");
         spellTemplate.name = name.trim();
         const source = test2[test2.length-1].split(">")[1].replace(")", "");
         spellTemplate.sourcebook = source;
      } else if (index === 2){
         // This index will contain School, Subschool, and Descriptor spell information
         const regex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g
         const taglessElement = element.replace(regex, "").trim();
         const elementArray = taglessElement.split("\n");         
         elementArray.forEach( data => {
            const schoolTemplate = {
               school_id: "",
               spell_id: ""
            }
         
            const subschoolTemplate = {
               subschool_id: "",
               spell_id: ""
            }
         
            const descriptorTemplate = {
               descriptor_id: "",
               spell_id: ""
            }

            if( data.includes("(") ) {
               data = data.replace("(", "");
               data = data.replace(")", "").trim();
               if(data.includes(",")) {
                  const dataArray = data.split(",");

                  dataArray.forEach( data => {
                     data = data.trim();
                     subschoolTemplate.subschool_id = subschoolMap.get(data); 
                     subschoolTemplate.spell_id = spellID
                     subschoolCSVData.push(subschoolTemplate);
                  })
               } else {
                  subschoolTemplate.subschool_id = subschoolMap.get(data); 
                  subschoolTemplate.spell_id = spellID
                  subschoolCSVData.push(subschoolTemplate);
               }
            } else if( data.includes("[") ) {
               data = data.replace("[", "");
               data = data.replace("]", "").trim();
               if(data.includes(",")) {
                  const dataArray = data.split(",");

                  dataArray.forEach( data => {
                     data = data.trim();
                     // spellTemplate.descriptor.push( [descriptorMap.get(data), spellID] )
                     descriptorTemplate.descriptor_id = descriptorMap.get(data);
                     descriptorTemplate.spell_id = spellID;
                     descriptorCSVData.push(descriptorTemplate)
                  })
               } else {
                  descriptorTemplate.descriptor_id = descriptorMap.get(data);
                  descriptorTemplate.spell_id = spellID;
                  descriptorCSVData.push(descriptorTemplate)
               }
            } else {
               // spellTemplate.school.push( [schoolMap.get(data), spellID] )
               schoolTemplate.school_id = schoolMap.get(data);
               schoolTemplate.spell_id = spellID;
               schoolCSVData.push(schoolTemplate);
            }
         })

      } else if (index === 3){
         // This index will always store the class and domains that can cast the spell
         const classInfo = element.trim().split("\n");
         classInfo.shift();
         classInfo.forEach( className => {
            const classTemplate = {
               level: "",
               class_id: "",
               spell_id: ""
            }

            const domainTemplate = {
               level: "",
               domain_id: "",
               spell_id: ""
            }

            className = className.replace("</a>", "");
            const slicePoint = className.indexOf(">") + 1;
            const target = className.slice(slicePoint);
            const classArray = [target.slice(0, target.length-2).trim(), target.slice(-2).trim().replace(",", "")];

            if( classMap.get( classArray[0] ) !== undefined ) {
               // spellTemplate.class.push([classArray[1], classMap.get(classArray[0]), spellID])
               classTemplate.level = classArray[1];
               classTemplate.class_id = classMap.get(classArray[0]);
               classTemplate.spell_id = spellID;
               classCSVData.push(classTemplate);
            }

            if( domainMap.get( classArray[0] ) !== undefined ) {
               // spellTemplate.domain.push([classArray[1], domainMap.get(classArray[0]), spellID]);
               domainTemplate.level = classArray[1];
               domainTemplate.domain_id = domainMap.get(classArray[0]);
               domainTemplate.spell_id = spellID;
               domainCSVData.push(domainTemplate);
            }
            
         })
      } else if (index === 4) {
         // This index will always store the component info
         element = element.replaceAll("</abbr>,", "");
         const componentInfo = element.trim().split("\n");
         componentInfo.shift();
         const componentArray = [];
         componentInfo.forEach( component => {
            const slicePoint = component.indexOf(">") + 1;
            const target = component.slice(slicePoint);
            componentArray.push(target);
         })
         spellTemplate.components = componentArray.join(", ");
      } else if (index === 5) {
         //This index will always have the casting time
         const castTime = element.slice(31).trim();
         spellTemplate.casting_time = castTime;
      } else if (index === contentArray.length-1) {
         //This index will always have the spell description
         const description = element.trim().split("\n");
         description[1] = description[1].replace("</div>", "");
         spellTemplate.description = description[1];
      } else {
         element = element.replace("<strong>", "");
         element = element.replace("\n", "");
         const dataArray = element.split(":</strong>");
         
         switch(dataArray[0]) {
            case "Range":
               spellTemplate.range = dataArray[1].trim();
               break;
            case "Target":
               spellTemplate.target = dataArray[1].trim();
               break;
            case "Area":
               spellTemplate.area = dataArray[1].trim();
               break;
            case "Effect":
               spellTemplate.effect = dataArray[1].trim();
               break;
            case "Duration":
               spellTemplate.duration = dataArray[1].trim();
               break;
            case "Saving Throw":
               spellTemplate.saving_throw = dataArray[1].trim();
               break;
            case "Spell Resistance":
               spellTemplate.spell_resistance = dataArray[1].trim();
               break;
            default:
               console.log(dataArray[0]);
         }
      }
   })

   spellID++;
   spellCSVData.push(spellTemplate);
}

const fetchSpellTable = async () => {

   for( let i = 1; i < 246; i++ ) {
      const res = await fetch(`https://dndtools.net/spells/?page=${i}`);
      const table = await res.text();
   
      const parser = new DOMParser();
      const doc = parser.parseFromString(table, 'text/html');

      const content = doc.getElementsByTagName("table");

      for( let j = 1; j < 21; j++){
         const row = content[0].rows[j];

         if(!row.getElementsByTagName("td")[2].innerHTML.includes("ToB")){
            const cell = row.getElementsByTagName("td")[0].innerHTML
            const url = "https://dndtools.net" + cell.substring(cell.indexOf(`="`)+2, cell.indexOf(`">`));
            await fetchSpell(url);  
         }         
      }
      
      console.log("Page: " + i + " done");
   }

   console.log("Creating school csv");
   createCSV(schoolCSVData, "./school.csv");
   console.log("Creating subschool csv");
   createCSV(subschoolCSVData, "./subschool.csv");
   console.log("Creating descriptor csv");
   createCSV(descriptorCSVData, "./descriptor.csv");
   console.log("Creating class csv");
   createCSV(classCSVData, "./class.csv");
   console.log("Creating domain csv");
   createCSV(domainCSVData, "./domain.csv");
   console.log("Creating spell csv");
   createCSV(spellCSVData, "./spell.csv");
}

const createCSV = async (data, path) => {
   const csv = new ObjectsToCSV(data);

   await csv.toDisk(path);
}

fetchSpellTable();