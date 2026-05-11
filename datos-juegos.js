/* datos base de juegos y pokedex */

// tabla principal de juegos: de aqui salen listas, filtros y datos de pantalla
export const JUEGOS = [

  /* generación 1 */
  {
    id:'red-blue', name:'Rojo / Azul', version:'1996 · Game Boy',
    color1:'#cc1111', color2:'#1155cc', gen:1, emoji:'🔴',
    logo:'img/rby.png',
    pokedexes:['kanto'],
    // pokemon exclusivos segun version
    versionExclusives:[
      { id:'red',  name:'Rojo', pokemon:['ekans','arbok','oddish','gloom','vileplume','mankey','primeape','growlithe','arcanine','scyther','electabuzz'] },
      { id:'blue', name:'Azul', pokemon:['sandshrew','sandslash','vulpix','ninetales','meowth','persian','bellsprout','weepinbell','victreebel','magmar','pinsir'] },
    ],
    // versiones alternativas del mismo juego
    versionFilters:[{
      id:'yellow', name:'Amarillo', pokedex:'kanto', note:'Pokédex igual, encuentros distintos',
      pokemon:[], // usa la misma pokedex de rojo/azul
    }],
  },

  /* generación 2 */
  {
    id:'gold-silver', name:'Oro / Plata', version:'1999 · Game Boy Color',
    color1:'#c8900a', color2:'#8898b0', gen:2, emoji:'🥇',
    logo:'img/gsc.png',
    pokedexes:['original-johto'],
    versionExclusives:[
      { id:'gold',   name:'Oro',   pokemon:['spinarak','ariados','gligar','teddiursa','ursaring','delibird','skarmory','mantine'] },
      { id:'silver', name:'Plata', pokemon:['ledyba','ledian','aipom','yanma','marill','azumarill','sneasel','qwilfish','remoraid','octillery'] },
    ],
    versionFilters:[{
      id:'crystal', name:'Cristal', pokedex:'original-johto', note:'Pokédex igual, eventos distintos',
      pokemon:[], // usa la misma pokedex de oro/plata
    }],
  },

  /* generación 3 */
  {
    id:'ruby-sapphire', name:'Rubí / Zafiro', version:'2002 · GBA',
    color1:'#c00030', color2:'#1060c0', gen:3, emoji:'♦️',
    logo:'img/rse.png',
    pokedexes:['hoenn'],
    versionExclusives:[
      { id:'ruby',     name:'Rubí',   pokemon:['seedot','nuzleaf','shiftry','mawile','zangoose','solrock','groudon'] },
      { id:'sapphire', name:'Zafiro', pokemon:['lotad','lombre','ludicolo','sableye','seviper','lunatone','kyogre'] },
    ],
    versionFilters:[{
      id:'emerald', name:'Esmeralda', pokedex:'hoenn', note:'Incluye exclusivos de Rubí y Zafiro',
      pokemon:[], // en esmeralda entran todos los de hoenn
    }],
  },
  {
    id:'firered-leafgreen', name:'RojoFuego / VerdeHoja', version:'2004 · GBA',
    color1:'#e04010', color2:'#208040', gen:3, emoji:'🔥',
    logo:'img/frlg.png',
    pokedexes:['kanto'],
    versionExclusives:[
      { id:'firered',   name:'RojoFuego', pokemon:['ekans','arbok','oddish','gloom','vileplume','mankey','primeape','growlithe','arcanine','scyther','electabuzz'] },
      { id:'leafgreen', name:'VerdeHoja', pokemon:['sandshrew','sandslash','vulpix','ninetales','meowth','persian','bellsprout','weepinbell','victreebel','magmar','pinsir'] },
    ],
  },

  /* generación 4 */
  {
    id:'diamond-pearl', name:'Diamante / Perla', version:'2006 · Nintendo DS',
    color1:'#4444cc', color2:'#cc66aa', gen:4, emoji:'💎',
    logo:'img/dppt.png',
    pokedexes:['original-sinnoh'],
    versionExclusives:[
      { id:'diamond', name:'Diamante', pokemon:['murkrow','honchkrow','stunky','skuntank','cranidos','rampardos','dialga','scizor'] },
      { id:'pearl',   name:'Perla',    pokemon:['misdreavus','mismagius','glameow','purugly','shieldon','bastiodon','palkia','pinsir'] },
    ],
    versionFilters:[{
      id:'platinum', name:'Platino', pokedex:'extended-sinnoh', note:'Pokédex ampliada',
      // pokemon que se usan para el filtro de platino
      pokemon:[
        // iniciales
        'turtwig','grotle','torterra','chimchar','monferno','infernape','piplup','prinplup','empoleon',
        // exclusivos de diamante/perla que aqui cuentan
        'murkrow','honchkrow','stunky','skuntank','cranidos','rampardos','dialga','scizor',
        'misdreavus','mismagius','glameow','purugly','shieldon','bastiodon','palkia','pinsir',
        // añadidos de platino
        'magby','elekid','magmortar','electivire',
        'togekiss',
        'houndour','houndoom',
        'ralts','kirlia','gardevoir','gallade',
        'eevee','vaporeon','jolteon','flareon','espeon','umbreon','leafeon','glaceon',
        'rotom','giratina',
      ],
    }],
  },
  {
    id:'heartgold-soulsilver', name:'HeartGold / SoulSilver', version:'2009 · Nintendo DS',
    color1:'#d0900a', color2:'#7080a0', gen:4, emoji:'❤️',
    logo:'img/hgss.png',
    pokedexes:['updated-johto'],
    versionExclusives:[
      { id:'heartgold', name:'HeartGold', pokemon:['spinarak','ariados','gligar','mantine','skarmory','delibird','teddiursa','ursaring','ho-oh'] },
      { id:'soulsilver', name:'SoulSilver', pokemon:['ledyba','ledian','aipom','yanma','marill','azumarill','qwilfish','remoraid','octillery','lugia'] },
    ],
  },

  /* generación 5 */
  {
    id:'black-white', name:'Negro / Blanco', version:'2010 · Nintendo DS',
    color1:'#333333', color2:'#999999', gen:5, emoji:'⬛',
    logo:'img/bw.png',
    pokedexes:['original-unova'],
    versionExclusives:[
      { id:'black', name:'Negro', pokemon:['gothita','gothorita','gothitelle','vullaby','mandibuzz','reshiram','tornadus'] },
      { id:'white', name:'Blanco',pokemon:['solosis','duosion','reuniclus','rufflet','braviary','zekrom','thundurus'] },
    ],
  },
  {
    id:'black2-white2', name:'Negro 2 / Blanco 2', version:'2012 · Nintendo DS',
    color1:'#1a1a5a', color2:'#c0c0f0', gen:5, emoji:'2️⃣',
    logo:'img/b2w2.png',
    pokedexes:['updated-unova'],
    versionExclusives:[
      { id:'black2', name:'Negro 2', pokemon:['sableye','gothita','gothorita','gothitelle','buneary','lopunny','rufflet','braviary','reshiram','zekrom','tornadus','plusle'] },
      { id:'white2', name:'Blanco 2', pokemon:['solosis','duosion','reuniclus','vullaby','mandibuzz','skitty','delcatty','minun','latias','latios','thundurus','kyurem'] },
    ],
  },

  /* generación 6 */
  {
    id:'x-y', name:'X / Y', version:'2013 · Nintendo 3DS',
    color1:'#0055cc', color2:'#cc1100', gen:6, emoji:'❎',
    logo:'img/xy.png',
    pokedexes:['kalos-central','kalos-coastal','kalos-mountain'],
    versionExclusives:[
      { id:'x', name:'X', pokemon:['clauncher','clawitzer','tyrunt','tyrantrum','swirlix','slurpuff','xerneas','pinsir','pinsir-mega'] },
      { id:'y', name:'Y', pokemon:['skrelp','dragalge','amaura','aurorus','spritzee','aromatisse','yveltal','heracross','heracross-mega'] },
    ],
    megaForms:[
      'venusaur-mega','charizard-mega-x','charizard-mega-y','blastoise-mega',
      'alakazam-mega','gengar-mega','kangaskhan-mega','pinsir-mega','gyarados-mega',
      'aerodactyl-mega','mewtwo-mega-x','mewtwo-mega-y',
      'ampharos-mega','scizor-mega','heracross-mega','houndoom-mega','tyranitar-mega',
      'blaziken-mega','gardevoir-mega','mawile-mega','aggron-mega','medicham-mega',
      'manectric-mega','banette-mega','absol-mega','garchomp-mega','lucario-mega','abomasnow-mega',
    ],
  },
  {
    id:'oras', name:'Rubí Omega / Zafiro Alfa', version:'2014 · Nintendo 3DS',
    color1:'#8a0020', color2:'#004488', gen:6, emoji:'🔴',
    logo:'img/oras.png',
    pokedexes:['updated-hoenn'],
    versionExclusives:[
      { id:'omegaruby',  name:'Rubí Omega',   pokemon:['seedot','nuzleaf','shiftry','mawile','zangoose','solrock','groudon','latios'] },
      { id:'alphasapphire', name:'Zafiro Alfa', pokemon:['lotad','lombre','ludicolo','sableye','seviper','lunatone','kyogre','latias'] },
    ],
    megaForms:[
      'venusaur-mega','charizard-mega-x','charizard-mega-y','blastoise-mega',
      'alakazam-mega','gengar-mega','kangaskhan-mega','pinsir-mega','gyarados-mega',
      'aerodactyl-mega','mewtwo-mega-x','mewtwo-mega-y',
      'ampharos-mega','scizor-mega','heracross-mega','houndoom-mega','tyranitar-mega',
      'blaziken-mega','gardevoir-mega','mawile-mega','aggron-mega','medicham-mega',
      'manectric-mega','banette-mega','absol-mega','garchomp-mega','lucario-mega','abomasnow-mega',
      'sceptile-mega','swampert-mega','sableye-mega','sharpedo-mega','camerupt-mega',
      'altaria-mega','glalie-mega','salamence-mega','metagross-mega','latias-mega','latios-mega','rayquaza-mega',
      'beedrill-mega','pidgeot-mega','slowbro-mega','steelix-mega','diancie-mega','lopunny-mega','gallade-mega',
    ],
  },

  /* generación 7 */
  {
    id:'sun-moon', name:'Sol / Luna', version:'2016 · Nintendo 3DS',
    color1:'#d09000', color2:'#6020a0', gen:7, emoji:'☀️',
    logo:'img/sm.png',
    pokedexes:['original-alola'],
    versionExclusives:[
      { id:'sun',  name:'Sol',  pokemon:['vulpix-alola','ninetales-alola','passimian','lycanroc-midday','solgaleo','cottonee','whimsicott','turtonator','omanyte','omastar','cranidos','rampardos'] },
      { id:'moon', name:'Luna', pokemon:['sandshrew-alola','sandslash-alola','oranguru','lycanroc-midnight','lunala','petilil','lilligant','drampa','kabuto','kabutops','shieldon','bastiodon'] },
    ],
    megaForms:[
      'venusaur-mega','charizard-mega-x','charizard-mega-y','blastoise-mega',
      'beedrill-mega','pidgeot-mega','alakazam-mega','slowbro-mega','gengar-mega',
      'kangaskhan-mega','pinsir-mega','gyarados-mega','aerodactyl-mega','mewtwo-mega-x','mewtwo-mega-y',
      'ampharos-mega','steelix-mega','scizor-mega','heracross-mega','houndoom-mega','tyranitar-mega',
      'sceptile-mega','blaziken-mega','swampert-mega','gardevoir-mega','sableye-mega','mawile-mega',
      'aggron-mega','medicham-mega','manectric-mega','sharpedo-mega','camerupt-mega','altaria-mega',
      'glalie-mega','salamence-mega','metagross-mega','latias-mega','latios-mega','rayquaza-mega',
      'lopunny-mega','gallade-mega','audino-mega','diancie-mega',
      'banette-mega','absol-mega','garchomp-mega','lucario-mega','abomasnow-mega',
    ],
  },
  {
    id:'usum', name:'UltraSol / UltraLuna', version:'2017 · Nintendo 3DS',
    color1:'#c04400', color2:'#4018a0', gen:7, emoji:'🌟',
    logo:'img/usum.png',
    pokedexes:['updated-alola'],
    versionExclusives:[
      { id:'ultrasun',  name:'UltraSol',  pokemon:['vulpix-alola','ninetales-alola','passimian','lycanroc-midday','solgaleo','houndour','houndoom','cottonee','whimsicott','turtonator','omanyte','omastar','cranidos','rampardos','buzzwole','pheromosa','xurkitree','kartana','stakataka'] },
      { id:'ultramoon', name:'UltraLuna', pokemon:['sandshrew-alola','sandslash-alola','oranguru','lycanroc-midnight','lunala','lotad','lombre','ludicolo','drampa','kabuto','kabutops','shieldon','bastiodon','celesteela','guzzlord','blacephalon','blacephalon','poipole','naganadel'] },
    ],
    megaForms:[
      'venusaur-mega','charizard-mega-x','charizard-mega-y','blastoise-mega',
      'beedrill-mega','pidgeot-mega','alakazam-mega','slowbro-mega','gengar-mega',
      'kangaskhan-mega','pinsir-mega','gyarados-mega','aerodactyl-mega','mewtwo-mega-x','mewtwo-mega-y',
      'ampharos-mega','steelix-mega','scizor-mega','heracross-mega','houndoom-mega','tyranitar-mega',
      'sceptile-mega','blaziken-mega','swampert-mega','gardevoir-mega','sableye-mega','mawile-mega',
      'aggron-mega','medicham-mega','manectric-mega','sharpedo-mega','camerupt-mega','altaria-mega',
      'glalie-mega','salamence-mega','metagross-mega','latias-mega','latios-mega','rayquaza-mega',
      'lopunny-mega','gallade-mega','audino-mega','diancie-mega',
      'banette-mega','absol-mega','garchomp-mega','lucario-mega','abomasnow-mega',
    ],
  },
  {
    id:'lets-go', name:"Let's Go! Pikachu / Eevee", version:'2018 · Nintendo Switch',
    color1:'#e0b000', color2:'#c06000', gen:7, emoji:'⚡',
    logo:'img/lgpe.png',
    pokedexes:['letsgo-kanto'],
    versionExclusives:[
      { id:'letsgo-pikachu', name:'Let\'s Go Pikachu', pokemon:['sandshrew','sandslash','oddish','gloom','vileplume','mankey','primeape','growlithe','arcanine','grimer','muk','scyther'] },
      { id:'letsgo-eevee',   name:'Let\'s Go Eevee',   pokemon:['ekans','arbok','vulpix','ninetales','meowth','persian','bellsprout','weepinbell','victreebel','koffing','weezing','pinsir'] },
    ],
    megaForms:[
      'venusaur-mega','charizard-mega-x','charizard-mega-y','blastoise-mega',
      'alakazam-mega','gengar-mega','kangaskhan-mega','pinsir-mega','gyarados-mega',
      'aerodactyl-mega','mewtwo-mega-x','mewtwo-mega-y',
    ],
  },

  /* generación 8 */
  {
    id:'sword-shield', name:'Espada / Escudo', version:'2019 · Nintendo Switch',
    color1:'#2050e0', color2:'#c01020', gen:8, emoji:'⚔️',
    logo:'img/swsh.png',
    // pokedex base y pokedex de los dlc
    pokedexes:['galar'], dlcPokedexes:['isle-of-armor','crown-tundra'],
    dlcNames:['La Isla de la Armadura','Las Nieves de la Corona'],
    // formas gigamax que se muestran para este juego
    gigantamaxForms:[
      'charizard-gmax','butterfree-gmax','pikachu-gmax','meowth-gmax','machamp-gmax',
      'gengar-gmax','kingler-gmax','lapras-gmax','eevee-gmax','snorlax-gmax',
      'garbodor-gmax','melmetal-gmax',
      'corviknight-gmax','orbeetle-gmax','drednaw-gmax','coalossal-gmax',
      'flapple-gmax','appletun-gmax','sandaconda-gmax','toxtricity-amped-gmax',
      'centiskorch-gmax','hatterene-gmax','grimmsnarl-gmax','alcremie-gmax',
      'copperajah-gmax','duraludon-gmax','urshifu-single-strike-gmax','urshifu-rapid-strike-gmax',
      'venusaur-gmax','blastoise-gmax',
    ],
    versionExclusives:[
      { id:'sword', name:'Espada', pokemon:['deino','zweilous','hydreigon','jangmo-o','hakamo-o','kommo-o','farfetchd-galar','sirfetchd','zacian','flapple','gothita','gothorita','gothitelle','rufflet','braviary','turtonator','oranguru'] },
      { id:'shield', name:'Escudo', pokemon:['larvitar','pupitar','tyranitar','goomy','sliggoo','goodra','ponyta-galar','rapidash-galar','zamazenta','appletun','solosis','duosion','reuniclus','vullaby','mandibuzz','drampa','passimian'] },
    ],
  },
  {
    id:'bdsp', name:'Diamante Brillante / Perla Reluciente', version:'2021 · Nintendo Switch',
    color1:'#2255aa', color2:'#bb44aa', gen:8, emoji:'✨',
    logo:'img/bdsp.png',
    pokedexes:['updated-sinnoh'],
    versionExclusives:[
      { id:'brilliantdiamond', name:'Diamante Brillante', pokemon:['murkrow','honchkrow','stunky','skuntank','cranidos','rampardos','dialga','scizor','seel','dewgong','larvitar','pupitar','tyranitar'] },
      { id:'shiningpearl',     name:'Perla Reluciente',   pokemon:['misdreavus','mismagius','glameow','purugly','shieldon','bastiodon','palkia','pinsir','slowpoke','slowbro','slowking','bagon','shelgon','salamence'] },
    ],
  },
  {
    id:'legends-arceus', name:'Leyendas: Arceus', version:'2022 · Nintendo Switch',
    color1:'#7a4a18', color2:'#3a2060', gen:8, emoji:'⚡',
    logo:'img/arceus.png',
    pokedexes:['hisui'],
  },

  /* generación 9 */
  {
    id:'scarlet-violet', name:'Escarlata / Púrpura', version:'2022 · Nintendo Switch',
    color1:'#cc2200', color2:'#7700cc', gen:9, emoji:'🔴',
    logo:'img/sv.png',
    pokedexes:['paldea'], dlcPokedexes:['kitakami','blueberry'],
    dlcNames:['La Máscara Turquesa','El Disco Índigo'],
    versionExclusives:[
      { id:'scarlet', name:'Escarlata', pokemon:['larvitar','pupitar','tyranitar','drifloon','drifblim','stunky','skuntank','deino','zweilous','hydreigon','oranguru','stonjourner','koraidon','great-tusk','scream-tail','brute-bonnet','flutter-mane','slither-wing','sandy-shocks','roaring-moon'] },
      { id:'violet',  name:'Púrpura',   pokemon:['bagon','shelgon','salamence','misdreavus','mismagius','glameow','purugly','goomy','sliggoo','goodra','passimian','eiscue','miraidon','iron-treads','iron-bundle','iron-hands','iron-jugulis','iron-moth','iron-thorns','iron-valiant'] },
    ],
  },
  {
    id:'legends-za', name:'Leyendas: Z-A', version:'2025 · Nintendo Switch',
    color1:'#2fbf58', color2:'#e8c800', gen:9, emoji:'⚡',
    logo:'img/lza.png',
    pokedexes:[], dlcPokedexes:[],
    dlcNames:['Mega Dimensión — Hiperespacial'],
    // pokedex de lumiose (base)
    // lista fija cuando la api no da la pokedex completa del juego
    staticPokedex:[
      'chikorita','bayleef','meganium','tepig','pignite','emboar',
      'totodile','croconaw','feraligatr','fletchling','fletchinder','talonflame',
      'bunnelby','diggersby','scatterbug','spewpa','vivillon',
      'weedle','kakuna','beedrill','pidgey','pidgeotto','pidgeot',
      'mareep','flaaffy','ampharos','patrat','watchog',
      'budew','roselia','roserade','magikarp','gyarados',
      'binacle','barbaracle','staryu','starmie',
      'flabebe','floette','florges','skiddo','gogoat',
      'gastly','haunter','gengar','venipede','whirlipede','scolipede',
      'ralts','kirlia','gardevoir','gallade','houndour','houndoom',
      'swablu','altaria','litwick','lampent','chandelure',
      'inkay','malamar','dratini','dragonair','dragonite',
      'cleffa','clefairy','clefable','snubbull','granbull',
      'zubat','golbat','crobat','woobat','swoobat',
      'geodude','graveler','golem','rockruff','lycanroc',
      'rhyhorn','rhydon','rhyperior','carbink','diancie',
      'phantump','trevenant','pumpkaboo','gourgeist',
      'shuppet','banette','hawlucha','mienfoo','mienshao',
      'scraggy','scrafty','pancham','pangoro',
      'tyrunt','tyrantrum','amaura','aurorus',
      'skrelp','dragalge','clauncher','clawitzer',
      'espurr','meowstic','honedge','doublade','aegislash',
      'spritzee','aromatisse','swirlix','slurpuff','dedenne',
      'goomy','sliggoo','goodra','noibat','noivern',
      'froakie','frogadier','greninja','fennekin','braixen','delphox',
      'chespin','quilladin','chesnaught','helioptile','heliolisk',
      'litleo','pyroar','furfrou','meowth','persian',
      'abra','kadabra','alakazam','snorlax',
      'eevee','vaporeon','jolteon','flareon','espeon','umbreon','leafeon','glaceon','sylveon',
      'pichu','pikachu','raichu','jigglypuff','wigglytuff','mr-mime',
      'scyther','scizor','horsea','seadra','kingdra',
      'slowpoke','slowbro','slowking','exeggcute','exeggutor',
      'lickitung','lickilicky','tangela','tangrowth',
      'elgyem','beheeyem','solosis','duosion','reuniclus',
      'frillish','jellicent','tynamo','eelektrik','eelektross',
      'drilbur','excadrill','pawniard','bisharp',
      'vullaby','mandibuzz','rufflet','braviary',
      'deino','zweilous','hydreigon','larvesta','volcarona',
      'gible','gabite','garchomp','riolu','lucario',
      'hippopotas','hippowdon','snover','abomasnow',
      'rotom','zygarde','mewtwo',
    ],
    // pokedex del dlc con especies extra
    // lista fija para el dlc en el mismo caso
    staticDlcPokedex:[
      'treecko','grovyle','sceptile','torchic','combusken','blaziken',
      'mudkip','marshtomp','swampert','bagon','shelgon','salamence',
      'beldum','metang','metagross','latias','latios','rayquaza',
      'jirachi','deoxys','shinx','luxio','luxray',
      'croagunk','toxicroak','finneon','lumineon',
      'uxie','mesprit','azelf','dialga','palkia','giratina',
      'cresselia','phione','manaphy','darkrai','shaymin','arceus',
      'victini','vanillite','vanillish','vanilluxe',
      'deerling','sawsbuck','karrablast','escavalier',
      'foongus','amoonguss','alomomola','joltik','galvantula',
      'ferroseed','ferrothorn','klink','klang','klinklang',
      'axew','fraxure','haxorus','cubchoo','beartic','cryogonal',
      'shelmet','accelgor','stunfisk','druddigon','golett','golurk',
      'bouffalant','heatmor','durant',
      'cobalion','terrakion','virizion',
      'tornadus','thundurus','landorus',
      'reshiram','zekrom','kyurem','keldeo','meloetta','genesect',
      'rookidee','corvisquire','corviknight','toxel','toxtricity',
      'falinks','dreepy','drakloak','dragapult',
      'zacian','zamazenta','eternatus','kubfu','urshifu','zarude',
      'regieleki','regidrago','glastrier','spectrier','calyrex',
      'annihilape','clodsire','kingambit','baxcalibur','glimmora',
      'magearna','zeraora','marshadow',
      'poipole','naganadel','stakataka','blacephalon','meltan','melmetal',
    ],
    // megas del juego base
    // megas del juego base
    megaForms:[
      'venusaur-mega','charizard-mega-x','charizard-mega-y','blastoise-mega',
      'beedrill-mega','pidgeot-mega','alakazam-mega','slowbro-mega','gengar-mega',
      'kangaskhan-mega','pinsir-mega','gyarados-mega','aerodactyl-mega',
      'ampharos-mega','steelix-mega','scizor-mega','heracross-mega','houndoom-mega','tyranitar-mega',
      'blaziken-mega','gardevoir-mega','mawile-mega','aggron-mega','medicham-mega',
      'manectric-mega','sharpedo-mega','camerupt-mega','altaria-mega',
      'banette-mega','absol-mega','glalie-mega','salamence-mega','metagross-mega',
      'lopunny-mega','lucario-mega','gallade-mega','audino-mega',
      'latias-mega','latios-mega','mewtwo-mega-x','mewtwo-mega-y','diancie-mega',
      'starmie-mega','dragonite-mega','victreebel-mega','hawlucha-mega','malamar-mega',
      'froslass-mega','chandelure-mega','skarmory-mega','excadrill-mega','eelektross-mega',
      'emboar-mega','meganium-mega','feraligatr-mega','pyroar-mega','clefable-mega',
      'scolipede-mega','drampa-mega','falinks-mega','scrafty-mega','floette-eternal-mega',
      'zygarde-mega','greninja-mega','delphox-mega','chesnaught-mega',
    ],
    // megas del dlc
    // megas extra del dlc
    dlcMegaForms:[
      'absol-mega-z','garchomp-mega-z','lucario-mega-z',
      'baxcalibur-mega','chimecho-mega','crabominable-mega','darkrai-mega',
      'glimmora-mega','golisopod-mega','golurk-mega','heatran-mega',
      'magearna-mega','meowstic-mega','raichu-mega-x','raichu-mega-y',
      'scovillain-mega','staraptor-mega','tatsugiri-mega','zeraora-mega',
    ],
  },

];

/* datos para mostrar generaciones */
// datos de apoyo para pintar nombre, color e icono por gen
export const GENERACIONES = [
  { gen:1, name:'Generación I',    region:'Kanto',  color:'#cc3333', icon:'🔴' },
  { gen:2, name:'Generación II',   region:'Johto',  color:'#d4a017', icon:'🥇' },
  { gen:3, name:'Generación III',  region:'Hoenn',  color:'#1a7a40', icon:'💎' },
  { gen:4, name:'Generación IV',   region:'Sinnoh', color:'#4444cc', icon:'💜' },
  { gen:5, name:'Generación V',    region:'Unova',  color:'#555566', icon:'⚫' },
  { gen:6, name:'Generación VI',   region:'Kalos',  color:'#0066cc', icon:'🔵' },
  { gen:7, name:'Generación VII',  region:'Alola',  color:'#e8a800', icon:'🌺' },
  { gen:8, name:'Generación VIII', region:'Galar',  color:'#3060e0', icon:'⚔️' },
  { gen:9, name:'Generación IX',   region:'Paldea', color:'#cc2200', icon:'🌙' },
];

// rango de ids nacionales para saber a que generacion pertenece cada pokemon
export const RANGOS_GEN = {
  1:{ name:'Generación I',    region:'Kanto',  min:1,   max:151  },
  2:{ name:'Generación II',   region:'Johto',  min:152, max:251  },
  3:{ name:'Generación III',  region:'Hoenn',  min:252, max:386  },
  4:{ name:'Generación IV',   region:'Sinnoh', min:387, max:493  },
  5:{ name:'Generación V',    region:'Unova',  min:494, max:649  },
  6:{ name:'Generación VI',   region:'Kalos',  min:650, max:721  },
  7:{ name:'Generación VII',  region:'Alola',  min:722, max:809  },
  8:{ name:'Generación VIII', region:'Galar',  min:810, max:905  },
  9:{ name:'Generación IX',   region:'Paldea', min:906, max:1025 },
};

// listado manual de formas regionales para mezclarlas con la base
export const FORMAS_REGIONALES = [
  // formas de alola
  'rattata-alola','raticate-alola','raichu-alola','sandshrew-alola','sandslash-alola',
  'vulpix-alola','ninetales-alola','diglett-alola','dugtrio-alola','meowth-alola',
  'persian-alola','geodude-alola','graveler-alola','golem-alola','grimer-alola',
  'muk-alola','exeggutor-alola','marowak-alola',
  // formas de galar
  'meowth-galar','ponyta-galar','rapidash-galar','slowpoke-galar','slowbro-galar',
  'slowking-galar','farfetchd-galar','weezing-galar','mr-mime-galar','articuno-galar',
  'zapdos-galar','moltres-galar','corsola-galar','zigzagoon-galar','linoone-galar',
  'darumaka-galar','darmanitan-galar','yamask-galar','stunfisk-galar',
  // formas de hisui
  'growlithe-hisui','arcanine-hisui','voltorb-hisui','electrode-hisui',
  'typhlosion-hisui','qwilfish-hisui','sneasel-hisui','samurott-hisui',
  'lilligant-hisui','zorua-hisui','zoroark-hisui','braviary-hisui',
  'sliggoo-hisui','goodra-hisui','avalugg-hisui','decidueye-hisui',
  'wyrdeer','kleavor','ursaluna','basculegion','sneasler','overqwil','enamorus-incarnate',
  // formas de paldea
  'tauros-paldea-combat-breed','tauros-paldea-blaze-breed','tauros-paldea-aqua-breed',
  'wooper-paldea',
];

// tipos usados para filtros
export const TODOS_TIPOS = [
  'normal','fire','water','electric','grass','ice',
  'fighting','poison','ground','flying','psychic','bug',
  'rock','ghost','dragon','dark','steel','fairy',
];

// color principal de cada tipo
export const COLORES_TIPO = {
  normal:'#9da0aa',  fire:'#ef7c3a',    water:'#4e8fd4',  electric:'#f4c32a',
  grass:'#5bab5d',   ice:'#75c8d5',     fighting:'#ce4069', poison:'#9d5cb5',
  ground:'#d97845',  flying:'#89aae3',  psychic:'#e96a74', bug:'#91bc22',
  rock:'#c7b78b',    ghost:'#5b6bbc',   dragon:'#5b69d6',  dark:'#5a5169',
  steel:'#5a8ea1',   fairy:'#ec8fe6',
};

// etiquetas cortas de estadisticas para el modal
export const ETIQUETAS_STAT = {
  hp:'HP', attack:'ATK', defense:'DEF',
  'special-attack':'SpA', 'special-defense':'SpD', speed:'VEL',
};

// nombres de tipos en español
export const NOMBRES_TIPO = {
  normal:'Normal',   fire:'Fuego',     water:'Agua',      electric:'Eléctrico',
  grass:'Planta',    ice:'Hielo',      fighting:'Lucha',  poison:'Veneno',
  ground:'Tierra',   flying:'Volador', psychic:'Psíquico',bug:'Bicho',
  rock:'Roca',       ghost:'Fantasma', dragon:'Dragón',   dark:'Siniestro',
  steel:'Acero',     fairy:'Hada',
};
