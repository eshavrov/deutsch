const groups = [
  // Группа 1. Глаголы стадии
  {
    title: "Глаголы стадии",
    verbs: [
      ["beginnen", "начинать, начинаться"],
      ["anfangen", "начинать"],
      ["erscheinen", "появляться"],
      ["sich verspäten", "опаздывать"],
      ["fortsetzen", "продолжать"],
      ["in Anspruch nehmen", "занимать (время)"],
      ["verschieben", "откладывать"],
      ["beenden", "завершать"],
      ["einstellen", "прекращать"],
      ["aufhören", "переставать"],
    ],
    list: [
      ["Beginn", "Начало"],
      ["Fortsetzung", "Продолжение"],
      ["Beendigung", "Завершение"],
    ],
  },

  // Группа 2. Глаголы движения
  {
    title: "Глаголы движения",
    verbs: [
      ["(sich) bewegen", "двигать(ся)"],
      ["stehenbleiben", "останавливать(ся)"],
      ["halten", "останавливать(ся)"],
      ["heben", "поднимать"],
      ["hochheben", "поднимать"],
      ["steigen", "подниматься"],
      ["senken", "опускать"],
      ["hinausgehen", "выходить"],
      ["eintreten", "входить"],
      ["sich begeben", "отправляться"],
      ["abfahren", "отправляться"],
      ["überqueren", "пересекать"],
      ["gehen (entlang)", "идти вдоль"],
      ["folgen", "следовать"],
      ["biegen (nach links)", "повернуть налево"],
      ["ankommen", "прибывать"],
      ["zurückkommen", "возвращаться"],
      ["zurückkehren", "возвращаться"],
      ["gehen", "идти"],
      ["kommen", "приходить"],
      ["laufen", "бежать"],
      ["rennen", "бежать"],
      ["fliegen", "летать"],
      ["reiten", "скакать"],
    ],
    list: [
      ["BewegungsartenBewegung aufwärts/ abwärts", "Виды движений"],
      ["Geschwindigkeit", "Движение вверх/ вниз"],
      ["Verfolgung", "Скорость"],
      ["Bewegung vom Ausgang bis", "Преследование"],
      ["zum Eingang", "Цикл движений от начальной до конечной точки движения"],
      ["Bewegung im Wasser", "Движение в воде"],
    ],
  },

  // Группа 3. Глаголы наличия/ количества
  {
    title: "Глаголы наличия / количества",
    verbs: [
      ["sein", "быть"],
      ["haben", "иметь"],
      ["es gibt", "имеется"],
      ["anwesend sein", "присутствовать"],
      ["beiwohnen", "присутствовать"],
      ["genügen", "быть достаточным"],
      ["ausreichen", "быть достаточным"],
      ["fehlen", "отсутствовать"],
      ["abwesend sein", "отсутствовать"],
      ["leer sein", "быть пустым"],
      ["sammeln", "собирать"],
      ["zufügen", "добавлять"],
      ["füllen", "наполнять"],
      ["voll sein", "быть полным"],
      ["reduzieren/ kürzen", "сокращать"],
      ["ausschließen", "исключать"],
      ["ausgeben", "тратить"],
      ["verderben", "портить"],
      ["übrigbleiben", "оставаться"],
      ["behalten", "хранить, удерживать"],
      ["besitzen", "владеть"],
      ["gehören", "принадлежать"],
      ["enthalten ", "содержать"],
    ],
    list: [
      ["Vorhandensein und Zugehörigkeit", "Наличие/принадлежность"],
      ["Mangel/ Abwesenheit", "Нехватка"],
      ["Zugeben/ Überfluss", "Добавление, избыток"],
      ["Kürzung", "Сокращение"],
      ["Erhaltung/ Aufbewahrung", "Сохранение"],
    ],
  },

  // Группа 4. Глаголы положения
  {
    title: "Глаголы положения",
    verbs: [
      ["legen", "класть"],
      ["liegen", "лежать"],
      ["sitzen", "сидеть"],
      ["sich setzen", "садиться"],
      ["stehen", "стоять"],
      ["stellen", "ставить"],
      ["hängen", "висеть, вешать"],
      ["sein", "находиться"],
      ["liegen", "находиться"],
    ],
    list: [["Lage/ Position ", "Положение"]],
  },

  // Группа 5. Бытовые глаголы
  {
    title: "Бытовые глаголы",
    verbs: [
      ["leben", "жить"],
      ["geboren sein", "родиться"],
      ["arbeiten", "работать"],
      ["verdienen", "зарабатывать"],
      ["essen", "есть"],
      ["trinken", "пить"],
      ["backen", "печь"],
      ["braten", "жарить"],
      ["sieden/ kochen", "кипятить/ кипеть"],
      ["tragen/ anhaben", "носить"],
      ["anziehen", "надевать"],
      ["waschen (Wäsche)", "стирать"],
      ["bügeln", "гладить"],
      ["zu Bett gehen", "ложиться спать"],
      ["schlafen", "спать"],
      ["wecken", "будить"],
      ["erwachen", "просыпаться"],
      ["aufstehen", "вставать"],
      ["krank sein", "болеть"],
      ["ärztlich behandeln", "лечить"],
      ["genesen/ gesund werden", "выздоравливать"],
    ],
    list: [
      ["Leben", "Жить"],
      ["Arbeiten", "Работать"],
      ["Essen/ trinken", "Есть/ пить"],
      ["Sich kleiden", "Одеваться"],
      ["Schlafen/ Morgentoilette", "Спать/ приводить себя в порядок"],
      ["Krank sein", "Болеть"],
    ],
  },

  // Группа 6. Глаголы чувства
  {
    title: "Глаголы чувства",
    verbs: [
      ["gern haben", "любить"],
      ["lieben", "любить"],
      ["gefallen", "нравиться"],
      ["wollen", "хотеть"],
      ["vorziehen", "предпочитать"],
      ["bewundern", "восхищаться"],
      ["hassen", "ненавидеть"],
      ["anschuldigen", "обвинять"],
      ["leiden", "страдать"],
      ["aushalten", "вынести"],
      ["weinen ", "плакать"],
      ["trösten", "утешать"],
      ["sich beruhigen", "успокоиться"],
      ["lächeln", "улыбаться"],
      ["lachen", "смеяться"],
      ["genießen", "наслаждаться"],
      ["sich freuen", "радоваться, веселиться"],
      ["sicher sein", "быть уверенным"],
      ["zweifeln", "сомневаться"],
      ["müde sein", "уставать, быть уставшим"],
      ["beunruhigen", "волновать"],
      ["erschrecken", "пугать"],
      ["wundern", "удивлять"],
      ["überraschen", "удивлять"],
      ["kränken", "обижать"],
      ["beleidigen", "оскорблять"],
      ["böse sein ", "быть сердитым"],
    ],
    list: [
      ["Gutes Verhalten", "Хорошее отношение"],
      ["Schlechtes Verhalten", "Плохое отношение"],
      ["Kummer/ Freude", "Горе/ радость"],
      ["Stolz/ Bescheidenheit", "Гордость/ скромность"],
      ["Zuversicht/ Zweifel", "Уверенность/ сомнение"],
      ["Fleiß/ Faulheit", "Старание/ лень"],
      ["Andere Gefühle ", "Оттенки эмоции"],
    ],
  },

  // Группа 7. Глаголы восприятия и мышления
  {
    title: "Глаголы восприятия и мышления",
    verbs: [
      ["sehen", "видеть"],
      ["gucken", "смотреть"],
      ["zuhören", "слушать"],
      ["hören", "слышать"],
      ["fühlen/ empfinden", "чувствовать"],
      ["sich erinnern (an A)", "помнить"],
      ["vergessen", "забывать"],
      ["erkennen", "узнавать"],
      ["unterscheiden", "различать"],
      ["lesen", "читать"],
      ["schreiben", "писать"],
      ["zählen", "считать"],
      ["rechnen", "вычислять"],
      ["addieren/ zufügen", "прибавлять"],
      ["abziehen", "вычитать"],
      ["multiplizieren", "умножать"],
      ["dividieren", "делить"],
      ["denken", "думать"],
      ["entscheiden/ beschließen ", "решать"],
      ["sich (D) etwas anders überlegen ", "передумать"],
    ],
    list: [
      ["Empfindung der Welt", "Восприятие мира"],
      ["Schulung/ Lernprozess", "Обучение"],
      ["Einzelne Lernoperationen", "Учебные операции"],
      ["Logische Operationen/ Denken", "Логические операции"],
    ],
  },

  // Группа 8. Рабочие операции
  {
    title: "Рабочие операции",
    verbs: [
      ["tun", "делать"],
      ["machen", "делать"],
      ["ausführen/ erfüllen", "выполнять"],
      ["vorbereiten", "готовить"],
      ["verstecken", "прятать"],
      ["suchen", "искать"],
      ["finden", "находить"],
      ["nehmen", "брать"],
      ["halten", "держать"],
      ["stoßen", "толкать"],
      ["ziehen", "тянуть"],
      ["schmeißen", "бросать"],
      ["öffnen/ aufmachen", "открывать"],
      ["schließen", "закрывать"],
      ["anschließen", "присоединять"],
      ["trennen", "отсоединять"],
      ["lösen/ loslösen", "развязать"],
      ["schneiden", "резать"],
      ["gießen", "лить"],
      ["verschütten", "проливать/ просыпать"],
      ["trocknen ", "сушить"],
    ],
    list: [
      ["Arbeiten/ machen", "Работать/делать"],
      ["Vorbereiten/ prüfen", "Готовить/ проверять"],
      ["Operationen mit der Hand", "Брать (и другие операции рукой)"],
      ["Verbinden/ befestigen", "Соединять/ закреплять"],
      ["Aufmachen/ zumachen", "Закрывать/ открывать"],
      ["Zerstören/ teilen", "Разрушать/ делить на части"],
      ["Operationen mit Wasser", "Операции с водой"],
    ],
  },

  // Группа 9. Глаголы общения
  {
    title: "Глаголы общения",
    verbs: [
      ["sprechen", "говорить"],
      ["sagen", "сказать"],
      ["sich wenden (an А)", "обращаться"],
      ["fragen", "спрашивать"],
      ["bitten", "просить"],
      ["antworten", "отвечать"],
      ["erlauben", "разрешать"],
      ["verbieten", "запрещать"],
      ["raten", "советовать"],
      ["empfehlen", "советовать"],
      ["warnen", "предупреждать"],
      ["anbieten", "предлагать"],
      ["geben", "давать"],
      ["kaufen", "покупать"],
      ["verkaufen", "продавать"],
      ["leihen", "брать взаймы"],
      ["borgen", "брать взаймы"],
      ["verleihen", "давать на время"],
      ["schenken", "дарить"],
      ["einladen", "приглашать"],
      ["besuchen", "посещать"],
      ["willkommen heißen", "тепло встречать"],
      ["willkommen heißen", "приветствовать"],
      ["vorstellen", "представлять"],
      ["schenken", "дарить"],
      ["kennenlernen", "знакомиться"],
      ["bekannt sein", "быть знакомым"],
      ["stören", "мешать/ беспокоить"],
      ["belästigen", "беспокоить"],
      ["entschuldigen", "извинять"],
      ["verzeihen", "прощать"],
      ["sich entschuldigen", "извиняться"],
      ["danken", "благодарить"],
    ],
    list: [
      ["Sprechen", "Говорить"],
      ["Sich wenden an j-n", "Обращаться"],
      ["Antworten", "Отвечать"],
      ["Nehmen", "Брать"],
      ["Geben", "Давать"],
      ["Besuch/ Etikette", "Визит/ этикет"],
      ["Verletzung der Etikette", "Нарушение этикета/ наказание"],
    ],
  },

  //Группа 10. Глаголы борьбы
  {
    title: "Глаголы борьбы",
    verbs: [
      ["angreifen", "нападать"],
      ["kämpfen", "сражаться"],
      ["Widerstand leisten", "сопротивляться"],
      ["verteidigen", "защищать"],
      ["schützen", "защищать"],
      ["nachgeben", "поддаться"],
      ["gewinnen", "выиграть"],
      ["verlieren", "проигрывать"],
      ["schießen", "стрелять"],
      ["töten/ umbringen", "убить"],
      ["verwunden", "ранить"],
      ["eine Niederlage beibringen", "нанести поражение"],
      ["eine Niederlage zerschlagen", "нанести поражение"],
    ],
    list: [
      ["Angreifen", "Нападать"],
      ["Verteidigen", "Защищаться"],
      ["Kampfausgang", "Исход борьбы"],
      ["Waffenverwendung", "Действия с оружием"],
    ],
  },
];

export { groups };
