// Datum
// 1/2 = ein halb; halb ... (siehe Seite 79/Uhrzeit b)
// 1/4 = ein Viertel; Viertel ... (siehe Seite 79/Uhrzeit b)
// 1999 = neunzehnhundertneunundneunzig
// 2014 = zweitausendvierzehn
// heute ist der 1. März = heute ist der erste März/der erste Dritte
// Berlin, 12. April 2002 = Berlin, zwölfter Vierter zweitausendzwei

// Uhrzeit

// a)
// 0.03 Uhr = null Uhr drei
// 7.15 Uhr = sieben Uhr fünfzehn
// 13.17 Uhr = dreizehn Uhr siebzehn
// 24.00 Uhr = vierundzwanzig Uhr

// b)
// ein Uhr
// fünf Minuten vor/nach eins (ein Uhr)
// Viertel vor/nach zwei (zwei Uhr)
// halb drei

const groups = [
  // Zeitmaße, Zeitangaben
  [
    ["Zeitmaße", "Меры времени"],
    ["das Jahr, -e", "год"],
    ["die Woche, -e", "месяц"],
    ["der Tag, -e", "день"],
    ["die Stunde, -n", "час"],
    ["die Minute, -n", "минута"],
    ["die Sekunde, -n", "секунда"],
  ],

  // Woche/Wochentage
  [
    ["Woche", "Неделя"],
    ["Wochentage", "дни недели"],
    ["der Sonntag", "воскресенье"],
    ["der Montag", "понеделььник"],
    ["der Dienstag", "вторник"],
    ["der Mittwoch", "среда"],
    ["der Donnerstag", "четверг"],
    ["der Freitag", "пятница"],
    ["der Samstag; der Sonnabend", "суббота"],

    ["der Wochentag, -e", "день недели"],
    ["das Wochenende", "выходные"],
    ["am Wochenende", "в выходные дни"],
  ],

  // Tag/Tageszeiten
  [
    ["Tageszeiten", "время суток"],

    ["der Tag", "день"],
    [
      "der Nachmittag,-e",
      "после полудня; послеобеденное время; время после полудня",
    ],
    ["der Morgen", "Утро"],
    ["der Abend,-e", "вечер"],
    [
      "der Vormittag,-e",
      "первая половина дня; утро; предобеденное время; время до полудня",
    ],
    ["die Nacht,¨-e", "ночь"],
    ["der Mittag", "полдень; обед"],
  ],

  // Monat/Monatsnamen
  [
    ["der Januar", "Январь"],
    ["der Februar", "Февраль"],
    ["der März", "Март"],
    ["der April", "Апрель"],
    ["der Mai", "Май"],
    ["der Juni", "Июнь"],
    ["der Juli", "Июль"],
    ["der August", "Август"],
    ["der September", "Сентябрь"],
    ["der Oktober", "Октябрь"],
    ["der November", "Ноябрь"],
    ["der Dezember", "Декабрь"],
  ],

  // Jahr/Jahreszeiten
  [
    ["Jahreszeiten", "сезоны", "время года", "времена года"],
    ["der Frühling; das Frühjahr", "весна"],
    ["der Sommer", "лето"],
    ["der Herbst", "осень"],
    ["der Winter", "зима"],
  ],
];

module.exports.groups = groups;
