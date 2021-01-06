const verbs = [
  ["achten", "обращать внимание, ценить, уважать"],
  ["anerkennen", "признавать"],
  ["anfangen", "начинать"],
  ["angeln", "удить, вылавливать"],
  ["ändern", "менять"],
  ["angreifen", "брать, хватать, нападать"],
  ["anhaben", "носить одежду, быть одетым"],
  ["annehmen", "принимать, допускать"],
  ["ankommen", "прибывать"],
  ["anrufen", "звонить (по телефону)"],
  ["anziehen", "надевать (одежду)"],
  ["sich anziehen", "одеваться"],
  ["ausziehen", "снимать (одежду), вытягивать"],
  ["antworten", "отвечать"],
  ["arbeiten", "работать"],
  ["atmen", "дышать"],
  ["ärgern sich", "злиться"],
  ["ärgern", "злить, раздражать"],
  ["auffallen", "обращать на себя внимание, бросаться в глаза"],
  ["auskommen", "находить общий язык, ладить"],
  ["ausstellen", "выставлять, экспонировать"],
  ["sich ausziehen", "раздеваться"],
  ["aussehen", "выглядеть"],

  ["backen", "печь"],
  ["beben", "сотрясаться (о земле), дрожать"],
  ["baden", "плавать, купаться"],
  ["bedienen", "обслуживать, ухаживать. С 'sich' - угощаться."],
  ["bedeuten", "значить, означать"],
  ["befehlen", "командовать, приказывать"],
  ["sich befinden", "быть, находиться"],
  ["befreien", "освобождать"],
  ["begegnen", "встречать, приключаться"],
  ["beginnen", "затевать, начинать"],
  ["basteln", "мастерить"],
  ["begleiten", "сопровождать, конвоировать"],
  ["behalten", "держать, удерживать, сохранять"],
  ["beißen", "кусать"],
  ["beleben", "приводить в чувство, оживлять, воодушевлять"],
  ["beleidigen", "обижать, оскорблять"],
  ["bellen", "лаять, тявкать"],
  ["belohnen", "награждать, вознаграждать"],
  ["bergen", "спасать, укрывать"],
  ["berichten", "сообщать, доносить"],
  ["bersten", "трескаться, разрываться"],
  ["besitzen", "владеть, обладать"],
  ["bestellen", "заказывать"],
  ["besuchen", "посещать, наведываться"],
  ["beten", "молиться"],
  ["betrügen", "обманывать, дурачить"],
  ["bewegen", "двигать, передвигать"],
  ["bezahlen", "платить"],
  ["biegen", "гнуть, сгибать"],
  ["bieten", "предлагать"],
  ["binden", "связывать"],
  ["bitten", "просить, ходатайствовать"],
  ["blasen", "дуть"],
  ["bleiben", "оставаться"],
  ["blicken", "взглянуть, глядеть"],
  ["blitzen", "сверкать"],
  ["blühen", "цвести"],
  ["braten", "жарить, обжигать"],
  ["brauchen", "нуждаться, иметь потребность"],
  ["bauen", "строить"],
  ["bekommen", "получать, приобретать"],
  ["bewundern", "восхищаться"],
  ["bilden", "образовывать"],
  ["besichtigen", "осматривать"],
  ["befinden sich", "находиться"],
  ["bringen", "приносить"],
  ["beschäftigen sich", "заниматься"],
  ["brauen", "варить (пиво)"],
  ["brausen", "шуметь, реветь, бурлить"],
  ["brechen", "ломать"],
  ["brennen", "гореть"],
  ["bringen", "приносить"],

  ["dauern", "длиться"],
  ["decken", "покрывать"],
  ["denken", "думать"],
  ["dürfen", "мочь"],
  ["danken", "благодарить"],

  ["einladen", "приглашать"],
  ["entschuldigen", "извинять"],
  ["еntwickeln", "развивать"],
  ["erzählen", "рассказывать"],
  ["empfehlen", "рекомендовать"],
  ["essen", "есть"],
  ["erfahren", "узнавать"],
  ["erfinden", "изобретать"],
  ["erinnern", "вспоминать"],
  ["erreichen", "достигать"],
  ["erholen sich", "отдыхать"],

  ["fallen", "падать"],
  ["fahren", "ехать"],
  ["finden", "находить"],
  ["fliegen", "летать"],
  ["fehlen", "отсутствовать"],
  ["feiern", "праздновать"],
  ["fressen", "пожирать"],
  ["fern sehen", "смотреть телевизор"],
  ["fragen", "спрашивать"],
  ["freuen sich", "радоваться"],
  ["führen", "вести, водить"],
  ["füttern", "кормить"],
  ["fühlen sich", "чувствовать"],
  ["frieren", "мёрзнуть"],

  ["geben", "давать"],
  ["gehen", "идти"],
  ["gibt es", "имеется"],
  ["gefallen", "нравится"],
  ["gießen", "поливать"],
  ["gehören", "принадлежать"],
  ["grüßen", "приветствовать"],
  ["gebären", "рождаться"],
  ["glauben", "полагать"],
  ["gratulieren", "поздравлять"],
  ["gründen", "основать"],

  ["haben", "иметь"],
  ["halten", "держать, останавливаться"],
  ["heilen", "лечить"],
  ["heißen", "зваться"],
  ["helfen", "помогать"],
  ["hören", "слушать"],
  ["hängen", "висеть"],

  ["irren sich", "ошибаться"],

  ["kaufen", "покупать"],
  ["kleiden", "одевать"],
  ["küssen", "целовать"],
  ["kämmen sich", "причёсываться"],
  ["kennen", "знать"],
  ["kennenlernen", "знакомиться"],
  ["klettern", "карабкаться"],
  ["kommen", "приходить"],
  ["können", "мочь"],
  ["kosten", "стоить"],

  ["lachen", "смеяться"],
  ["laufen", "бегать"],
  ["leben", "жить"],
  ["legen", "класть"],
  ["lernen", "учиться"],
  ["lesen", "читать"],
  ["lieben", "любить"],
  ["liegen", "лежать"],
  ["lassen", "оставлять"],
  ["lüften", "проветривать"],

  ["machen, tun", "делать"],
  ["meinen", "полагать"],
  ["malen", "рисовать"],
  ["mögen", "любить, нравиться, чувствовать расположение"],
  ["müssen", "быть должным, быть вынужденным"],

  ["nehmen", "брать"],
  ["nennen", "называть"],
  ["nutzen", "использовать"],
  ["nähen", "шить"],

  ["pflanzen", "сажать"],
  ["pflücken", "рвать"],
  ["putzen", "чистить"],
  ["pflegen", "ухаживать"],

  ["rauchen", "курить"],
  ["rechnen", "решать"],
  ["reisen", "путешествовать"],
  ["rodeln", "кататься на санках"],
  ["rufen", "кричать"],
  ["raten", "советовать"],
  ["retten", "спасать"],
  ["reden", "разговаривать"],

  ["sagen", "говорить"],
  ["scheinen", "светить"],
  ["schenken", "дарить"],
  ["schicken", "посылать"],
  ["schmücken", "украшать"],
  ["schreiben", "писать"],
  ["schwimmen", "плавать"],
  ["sehen", "видеть, смотреть"],
  ["sein", "быть"],
  ["singen", "петь"],
  ["sitzen", "сидеть"],
  ["sollen", "долженствовать"],
  ["sorgen", "заботиться"],
  ["sparen", "экономить"],
  ["spielen", "играть"],
  ["springen", "прыгать"],
  ["stehen", "стоять"],
  ["spazieren", "гулять"],
  ["schießen", "стрелять"],
  ["schlafen", "спать"],
  ["schaffen", "создавать"],
  ["suchen", "искать"],
  ["sammeln", "собирать"],
  ["studieren", "учиться в вузе"],
  ["sprechen", "разговаривать"],
  ["schützen", "охранять"],
  ["stricken", "вязать"],
  ["sterben", "умирать"],
  ["schätzen", "ценить"],
  ["streiten sich", "ссориться"],

  ["tanzen", "танцевать"],
  ["tragen", "носить"],
  ["trinken", "пить"],
  ["träumen", "мечтать"],
  ["treiben Sport", "заниматься спортом"],
  ["treffen sich", "встречаться"],
  ["tadeln", "ругать"],
  ["turnen", "заниматься гимнастикой"],
  ["teilnehmen", "участвовать"],
  ["trainieren", "тренироваться"],

  ["übersetzen", "переводить"],

  ["verkaufen", "продавать"],
  ["vorbereiten", "готовиться"],
  ["vergessen", "забывать"],
  ["verbringen", "проводить"],
  ["verstehen", "понимать"],
  ["vorstellen", "представлять"],
  ["verdienen", "зарабатывать"],
  ["vertrauen", "доверять"],
  ["verschmutzen", "загрязнять"],

  ["waschen", "мыть"],
  ["weinen", "плакать"],
  ["werden", "становиться"],
  ["wiederholen", "повторять"],
  ["wissen", "знать"],
  ["wohnen", "жить"],
  ["wollen", "хотеть"],
  ["wünschen", "желать"],
  ["wandern", "путешествовать"],
  ["wählen", "выбирать"],
  ["wachsen", "расти"],
  ["warten", "ждать"],

  ["zählen", "считать"],
  ["zeigen", "показывать"],
  ["zahlen", "платить"],
  ["zerstören", "разрушать"],
];

const irregularVerbs = [
  ["backen", "bäckt / backt", "buk/backte", "hat gebacken", "печь"],
  ["befehlen", "befiehlt", "befahl", "hat befohlen", "приказывать"],
  ["beginnen", "beginnt", "begann", "hat begonnen", "начинать"],
  ["beißen", "beißt", "biß", "hat gebissen", "кусать"],
  ["bergen", "birgt", "barg", "hat geborgen", "спасать"],
  ["bersten", "birst", "barst", "ist geborsten", "лопнуть"],
  ["biegen", "biegt", "bog", "hat gebogen", "гнуть"],
  ["bieten", "bietet", "bot", "hat geboten", "предлагать"],
  ["binden", "bindet", "band", "hat gebunden", "связывать"],
  ["bitten", "bittet", "bat", "hat gebeten", "просить"],
  ["blasen", "bläst", "blies", "hat geblasen", "дуть"],
  ["bleiben", "bleibt", "blieb", "ist geblieben", "оставаться&nbsp;"],
  ["braten", "brät", "briet", "hat gebraten", "жарить"],
  ["brechen", "bricht", "brach", "hat/ist gebrochen", "ломать"],
  ["brennen", "brennt", "brannte", "hat gebrannt", "гореть"],
  ["bringen", "bringt", "brachte", "hat gebracht", "приносить&nbsp;"],
  ["denken", "denkt", "dachte", "hat gedacht", "думать"],
  ["dreschen", "drischt", "drosch", "hat gedroschen", "молотить"],
  ["dringen", "dringt", "drang", "hat/ist gedrungen", "проникать"],
  ["dürfen", "darf", "durfte", "hat gedurft", "мочь (иметь разрешение)"],
  ["empfangen", "empfängt", "empfing", "hat empfangen", "принимать"],
  ["empfehlen", "empfiehlt", "empfahl", "hat empfohlen", "рекомендовать"],
  [
    "erlöschen",
    "erlischt",
    "erlosch",
    "ist erloschen",
    "потухать, прекращаться",
  ],
  ["erschrecken", "erschrickt", "erschrak", "ist erschrocken", "пугаться"],
  ["essen", "isst", "aß", "hat gegessen", "есть, кушать"],
  ["fahren", "fährt", "fuhr", "hat/ist gefahren", "ехать, ездить"],
  ["fallen", "fällt", "fiel", "ist gefallen", "падать"],
  ["fangen", "fängt", "fing", "hat gefangen", "ловить"],
  ["fechten", "ficht", "focht", "hat gefochten", "фехтовать"],
  ["finden", "findet", "fand", "hat gefunden", "находить"],
  ["flechten", "flicht", "flocht", "hat geflochten", "плести"],
  ["fliegen", "fliegt", "flog", "hat/ist geflogen", "летать"],
  ["fliehen", "flieht", "floh", "ist geflohen", "убегать, удирать"],
  ["fließen", "fließt", "floss", "ist geflossen", "течь, литься"],
  ["fressen", "frisst", "fraß", "hat gefressen", "жрать, лопать"],
  ["frieren", "friert", "fror", "hat gefroren", "замерзать"],
  ["gären", "gärt", "gor", "ist gegoren", "бродить"],
  ["gebären", "gebärt/gebiert", "gebar", "hat/ist geboren", "родить"],
  ["geben", "gibt", "gab", "hat gegeben", "давать"],
  ["gedeihen", "gedeiht", "gedieh", "ist gediehen", "расти, преуспевать"],
  ["gehen", "geht", "ging", "ist gegangen", "идти, ходить"],
  ["gelingen", "gelingt", "gelang", "ist gelungen", "удаваться"],
  ["gelten", "gilt", "galt", "hat gegolten", "стоить, цениться"],
  ["genesen", "genest", "genas", "ist genesen", "выздоравливать"],
  ["genießen", "genießt", "genoss", "hat genossen", "наслаждаться"],
  ["geschehen", "geschieht", "geschah", "ist geschehen", "происходить"],
  ["gewinnen", "gewinnt", "gewann", "hat gewonnen", "выигрывать"],
  ["gießen", "gießt", "goss", "hat gegossen", "лить, наливать"],
  ["gleichen", "gleicht", "glich", "hat geglichen", "выравнивать"],
  ["gleiten", "gleitet", "glitt", "ist geglitten", "скользить"],
  ["graben", "gräbt", "grub", "hat gegraben", "копать"],
  ["greifen", "greift", "griff", "hat gegriffen", "браться (за что-л.)"],
  ["haben", "hat", "hatte", "hat gehabt", "иметь"],
  ["halten", "hält", "hielt", "hat gehalten", "держать"],
  ["hängen", "hängt", "hing", "hat gehangen", "висеть"],
  ["hauen", "haut", "haute/hieb", "hat/ist gehauen", "рубить"],
  ["heben", "hebt", "hob", "hat gehoben", "поднимать"],
  ["heißen", "heißt", "hieß", "hat geheißen", "называться"],
  ["helfen", "hilft", "half", "hat geholfen", "помогать"],
  ["kennen", "kennt", "kannte", "hat gekannt", "знать"],
  ["klingen", "klingt", "klang", "hat geklungen", "звенеть"],
  ["kneifen", "kneift", "kniff", "hat gekniffen", "щипать"],
  ["kommen", "kommt", "kam", "ist gekommen", "приходить"],
  ["können", "kann", "konnte", "hat gekonnt", "мочь"],
  ["kriechen", "kriecht", "kroch", "ist gekrochen", "ползать"],
  ["laden", "lädt", "lud", "hat geladen", "грузить, приглашать"],
  ["lassen", "lässt", "ließ", "hat gelassen", "позволять, велеть"],
  ["laufen", "läuft", "lief", "ist gelaufen", "бегать"],
  ["leiden", "leidet", "litt", "hat gelitten", "страдать, терпеть"],
  ["leihen", "leiht", "lieh", "hat geliehen", "одалживать"],
  ["lesen", "liest", "las", "hat gelesen", "читать"],
  ["liegen", "liegt", "lag", "hat gelegen", "лежать"],
  ["löschen", "löscht", "losch", "hat geloschen", "тушить, стирать"],
  ["lügen", "lügt", "log", "hat gelogen", "лгать"],
  ["mahlen", "mahlt", "mahlte", "hat gemahlen", "молоть"],
  ["meiden", "meidet", "mied", "hat gemieden", "избегать"],
  ["melken", "melkt", "melkte", "hat gemolken/gemelkt", "доить"],
  ["messen", "misst", "maß", "hat gemessen", "измерять"],
  ["mißlingen", "mißlingt", "mißlang", "ist mißlungen", "не удаваться"],
  ["mögen", "mag", "mochte", "hat gemocht", "любить, хотеть"],
  ["müssen", "muss", "musste", "hat gemusst", "долженствовать"],
  ["nehmen", "nimmt", "nahm", "hat genommen", "брать"],
  ["nennen", "nennt", "nannte", "hat genannt", "называть"],
  ["pfeifen", "pfeift", "pfiff", "hat gepfiffen", "свистеть"],
  ["preisen", "preist", "pries", "hat gepriesen", "хвалить"],
  ["quellen", "quillt", "quoll", "ist gequollen", "бить ключом"],
  ["raten", "rät", "riet", "hat geraten", "советовать"],
  ["reiben", "reibt", "rieb", "hat gerieben", "тереть"],
  ["reißen", "reißt", "riss", "hat/ist gerissen", "рвать"],
  ["reiten", "reitet", "ritt", "hat/ist geritten", "ездить верхом"],
  ["rennen", "rennt", "rannte", "ist gerannt", "бежать"],
  ["riechen", "riecht", "roch", "hat gerochen", "нюхать"],
  ["ringen", "ringt", "rang", "hat gerungen", "бороться, добиваться"],
  ["rinnen", "rinnt", "rann", "ist geronnen", "течь"],
  ["rufen", "ruft", "rief", "hat gerufen", "кричать, звать"],
  ["salzen", "salzt", "salzte", "hat gesalzen/gesalzt", "солить"],
  ["saufen", "säuft", "soff", "hat gesoffen", "пить, пьянствовать"],
  ["saugen", "saugt", "sog = saugte", "hat gesogen/gesaugt", "сосать"],
  ["schaffen", "schafft", "schuf", "hat geschaffen", "создавать, творить"],
  ["scheiden", "scheidet", "schied", "hat/ist geschieden", "разделять"],
  ["scheinen", "scheint", "schien", "hat geschienen", "светить, сиять"],
  ["schelten", "schilt", "schalt", "hat gescholten", "бранить"],
  ["scheren", "schiert", "schor", "hat geschoren", "стричь"],
  ["schieben", "schiebt", "schob", "hat geschoben", "двигать, толкать"],
  ["schießen", "schießt", "schoss", "hat geschossen", "стрелять"],
  ["schlafen", "schläft", "schlief", "hat geschlafen", "спать"],
  ["schlagen", "schlägt", "schlug", "hat geschlagen", "бить"],
  ["schleichen", "schleicht", "schlich", "ist geschlichen", "красться"],
  ["schleifen", "schleift", "schliff", "hat geschliffen", "точить"],
  ["schließen", "schließt", "schloss", "hat geschlossen", "закрывать"],
  ["schlingen", "schlingt", "schlang", "hat geschlungen", "обвивать"],
  ["schmeißen", "schmeißt", "schmiss", "hat geschmissen", "кидать, бросать"],
  ["schmelzen", "schmilzt", "schmolz", "hat/ist geschmolzen", "таять"],
  ["schneiden", "schneidet", "schnitt", "hat geschnitten", "резать"],
  ["schreiben", "schreibt", "schrieb", "hat geschrieben", "писать"],
  ["schreien", "schreit", "schrie", "hat geschrien", "кричать"],
  ["schreiten", "schreitet", "schritt", "ist geschritten", "шагать"],
  ["schweigen", "schweigt", "schwieg", "hat geschwiegen", "молчать"],
  ["schwellen", "schwillt", "schwoll", "ist geschwollen", "пухнуть"],
  ["schwimmen", "schwimmt", "schwamm", "ist geschwommen", "плавать"],
  ["schwinden", "schwindet", "schwand", "ist geschwunden", "убывать, исчезать"],
  [
    "schwingen",
    "schwingt",
    "schwang",
    "hat geschwungen",
    "махать, размахивать",
  ],
  ["schwören", "schwört", "schwor/schwur", "hat geschworen", "клясться"],
  ["sehen", "sieht", "sah", "hat gesehen", "смотреть"],
  ["sein", "ist", "war", "ist gewesen", "быть"],
  ["senden", "sendet", "sandte", "hat gesandt", "посылать, отправлять"],
  ["singen", "singt", "sang", "hat gesungen", "петь"],
  ["sinken", "sinkt", "sank", "ist gesunken", "опускаться, погружаться"],
  ["sinnen", "sinnt", "sann", "hat gesonnen", "думать, размышлять"],
  ["sitzen", "sitzt", "saß", "hat gesessen", "сидеть"],
  ["sollen", "soll", "sollte", "hat gesollt", "долженствовать"],
  ["speien", "speit", "spie", "hat gespien", "выплёвывать"],
  ["spinnen", "spinnt", "spann", "hat gesponnen", "прясть"],
  ["sprechen", "spricht", "sprach", "hat gesprochen", "говорить"],
  ["sprießen", "sprießt", "spross", "ist gesprossen", "пускать ростки, почки"],
  ["springen", "springt", "sprang", "ist gesprungen", "прыгать, скакать"],
  ["stechen", "sticht", "stach", "ist gestochen", "колоть"],
  ["stehen", "steht", "stand", "hat gestanden", "стоять, находиться"],
  ["stehlen", "stiehlt", "stahl", "hat gestohlen", "воровать"],
  ["steigen", "steigt", "stieg", "ist gestiegen", "подниматься"],
  ["sterben", "stirbt", "starb", "ist gestorben", "умирать"],
  ["stinken", "stinkt", "stank", "hat gestunken", "вонять"],
  ["stoßen", "stößt", "stieß", "hat/ist gestoßen", "толкать"],
  ["streichen", "streicht", "strich", "hat gestrichen", "гладить"],
  ["streiten", "streitet", "stritt", "hat gestritten", "спорить"],
  ["tragen", "trägt", "trug", "hat getragen", "носить"],
  ["treffen", "trifft", "traf", "hat getroffen", "встречать"],
  ["treiben", "treibt", "trieb", "hat/ist getrieben", "гнать"],
  ["treten", "tritt", "trat", "hat/ist getreten", "ступать"],
  ["trinken", "trinkt", "trank", "hat getrunken", "пить"],
  ["trügen", "trügt", "trog", "hat getrogen", "обманывать"],
  ["tun", "tut", "tat", "hat getan", "делать"],
  ["verderben", "verdirbt", "verdarb", "hat/ist verdorben", "портить"],
  [
    "verdrießen",
    "verdrießt",
    "verdross",
    "hat verdrossen",
    "сердить, досаждать",
  ],
  ["vergessen", "vergisst", "vergaß", "hat vergessen", "забывать"],
  ["verlieren", "verliert", "verlor", "hat verloren", "терять"],
  ["verzeihen", "verzeiht", "verzieh", "hat verziehen", "прощать"],
  ["wachsen", "wächst", "wuchs", "ist gewachsen", "расти"],
  ["wägen", "wägt", "wog", "hat gewogen", "взвешивать"],
  ["waschen", "wäscht", "wusch", "hat gewaschen", "мыть"],
  ["weichen", "weicht", "wich", "ist gewichen", "уклоняться, уворачиваться"],
  ["weisen", "weist", "wies", "hat gewiesen", "указывать"],
  [
    "wenden",
    "wendet",
    "wandte = wendete",
    "hat gewandt/gewendet",
    "поворачивать",
  ],
  ["werben", "wirbt", "warb", "hat geworben", "рекламировать"],
  ["werden", "wird", "wurde", "ist geworden", "становиться"],
  ["werfen", "wirft", "warf", "hat geworfen", "кидать"],
  ["wiegen", "wiegt", "wog", "hat gewogen", "качать, весить"],
  ["winden", "windet", "wand", "hat gewunden", "мотать"],
  ["wissen", "weiß", "wusste", "hat gewusst", "знать"],
  ["wollen", "will", "wollte", "hat gewollt", "хотеть"],
  ["ziehen", "zieht", "zog", "hat/ist gezogen", "тащить"],
  ["zwingen", "zwingt", "zwang", "hat gezwungen", "принуждать"],
];

// dict.push(["Inhalt", "Содержание, Оглавление"]);
// dict.push(["Begrüssung", "Приветствие"]);
// dict.push(["befinden", "распологаться"]);
// dict.push(["Leser", "Читатель"]);
// dict.push(["Lehrwerk", "Учебник"]);
// dict.push(["Anfänger", "Новичок"]);
// dict.push(["führen", "вести"]);

export { verbs, irregularVerbs };
