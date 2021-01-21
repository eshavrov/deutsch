const fs = require("fs");
const { createHash } = require("crypto");
const { sp, normalizeVerb } = require("./verbs");

const predlogi = require("./in_data/other/predlogi.json");
const words200 = require("./in_data/de-online_ru/200words.json");
const verbs = require("./in_data/other/verbs.json");
const irregularVerbs = require("./in_data/de-online_ru/irregularVerbs.json");
const irregularVerbs2 = require("./in_data/other/verbs_i.json");

const { list } = require("./in_data/other/a1/all");
const { groups } = require("./in_data/other/verbsGroups");
const { groups: datumGroups } = require("./in_data/other/a1/Datum");

const listA11L1 = require("./in_data/other/a1/case1/a1.1-l1.json");
const listA11L2 = require("./in_data/other/a1/case1/a1.1-l2.json");
const listA11L3 = require("./in_data/other/a1/case1/a1.1-l3.json");
const listA11L4 = require("./in_data/other/a1/case1/a1.1-l4.json");
const listA11L5 = require("./in_data/other/a1/case1/a1.1-l5.json");
const listA11L6 = require("./in_data/other/a1/case1/a1.1-l6.json");
const listA11L8 = require("./in_data/other/a1/case1/a1.1-l8.json");
const listA11L10 = require("./in_data/other/a1/case1/a1.1-l10.json");
const listA1 = require("./in_data/other/a1/case1/a1.json");
const listdasAdjektiv01 = require("./in_data/other/a1/case1/das-adjektiv-01.json");
const listKlassePiriBayern = require("./in_data/other/a1/case1/klasse-piri-bayern.json");
const listDeutschA1Schritte = require("./in_data/other/a1/case1/deutsch-a1-schritte.json");
const listDeutschA2Schritte = require("./in_data/other/a1/case1/deutsch-a2-schritte.json");
const listDeutschB1Schritte = require("./in_data/other/a1/case1/deutsch-b1-schritte.json");

const verbsIrregular = require("./in_data/other/verbs/irregular.json");

const getId = (uni) => {
  return createHash("md5").update(uni).digest("hex");
};

const phraseNormalize = (text) => {
  return text.replace(/\s+/gi, " ").trim();
};

const translateNormalize = (text, { spliter = ";" } = {}) => {
  const chunks = phraseNormalize(text)
    .split(spliter)
    .filter(Boolean)
    .map(phraseNormalize);

  const tmp = {};
  const list = [];

  chunks.forEach((phrase) => {
    const id = getId(phrase.toUpperCase());
    if (!tmp[id]) {
      list.push(phrase);
    }
    tmp[id] = phrase;
  });

  return list.join("; ");
};

const getUniPhraseOriginal = (text) =>
  text
    .replace(/[^a-zäöüß0-9\(\)]/gi, "")
    .trim()
    // .replace("ss", "ß")
    .toUpperCase();

const nestingValidation = (list) => {
  const _list = list.map((text) => [getUniPhraseOriginal(text), text]);

  const newlist = _list
    .sort((a, b) => a.length - b.length)
    .reduce((acc, v) => {
      if (acc.length === 0) {
        return [v];
      }

      let bb = true;

      acc.forEach(([_v]) => {
        if (_v.split(v[0]).length > 1) {
          bb = false;
        }
      });

      // проверяем есть ли среди существующих фраз вхождения в новую
      const newAcc = acc.reduce((acc, [_v, _o]) => {
        if (v[0].split(_v).length > 1) {
          return acc;
        }

        return [...acc, [_v, _o]];
      }, []);

      // если новая фраза не входит ни в одну из предыдущих, то добавляем её в список
      if (bb) newAcc.push(v);

      return newAcc;
    }, []);

  return newlist.map(([, v]) => v);
};

const mergeOriginals = (list, inText) => {
  return inText.split(";").reduce((acc, text) => {
    const _list = acc.map((text) => getUniPhraseOriginal(text));

    const _text = getUniPhraseOriginal(text);

    if (!_list.includes(_text)) {
      return nestingValidation([...acc, text]);
    }

    return acc;
  }, list || []);
};

const removeOptional = (text) => {
  return text.replace(/\([^)]*\) */g, "").trim();
};

const removeOptionalPlural = (text) => {
  return text.replace(/\*\{[^}]*\}/g, "").trim();
};

const cc = (text) => {
  return text
    .replace(/[^a-zäöüß\/]/gi, "")
    .toLowerCase()
    .replace("ss", "ß");
};

const getEntryId = (entry) => {
  const { type, base } = entry;

  return getId(type + cc(base));
};

const REGEXP_DER = /^der\s+/i;
const REGEXP_DIE = /^die\s+/i;
const REGEXP_DAS = /^das\s+/i;
const REGEXP_DIE_DER = /^(die\s*\/\s*der\s*|der\s*\/\s*die)\s+/i;
const REGEXP_VERB = /en$/i;
// , ä-er
const REGEXP_END = /\,\s*[äöü¨]*-(|e|er|s|en|her|hin)$/i;
// , ä, er
const REGEXP_END_2 = /\,\s*[äöü¨]*(|,\s*e|,\s*er|,\s*s|,\s*en|,\s*her|,\s*hin)$/i;

const removeAdv = (text) => {
  return text
    .replace(REGEXP_END, "")
    .trim()
    .replace(REGEXP_END, "")
    .trim()
    .replace(REGEXP_END_2, "")
    .trim()
    .replace(REGEXP_END_2, "")
    .trim()
    .replace(/\,\s*pl$/i, "")
    .replace(/[?!.,]$/i, "")
    .trim()
    .replace(/\.*\,*\-*\,*\.*$/i, "");
};

console.log("---------------- start test ------------");

const dictonary = [];

const parsePhrase = (text, options = {}) => {
  const _phrase = phraseNormalize(text);
  const _phrases = _phrase.split(";").map(phraseNormalize);

  return _phrases
    .map((phrase) => {
      // @ts-ignore
      let der = REGEXP_DER.test(phrase);
      // @ts-ignore
      let die = REGEXP_DIE.test(phrase);
      // @ts-ignore
      let dieDer = REGEXP_DIE_DER.test(phrase);
      // @ts-ignore
      let das = REGEXP_DAS.test(phrase);

      const isCapitalize = /^[A-ZÄÖÜ]/.test(phrase);

      const isNoun = der || die || das || dieDer || isCapitalize;

      // Существительные
      if (isNoun) {
        const chunk = phrase
          .split(/\,\s*(-|–)/gi)
          .map((p) => p.replace(/\,\s*\-*$/, ""));

        if (chunk.length > 0) {
          const [word] = chunk;
          const w = removeAdv(
            removeOptional(
              removeOptionalPlural(
                word
                  .replace(REGEXP_DER, "")
                  .replace(REGEXP_DIE, "")
                  .replace(REGEXP_DAS, "")
                  .replace(REGEXP_DIE_DER, "")
              )
            )
          );

          let article = null;

          if (der) {
            article = "der";
          }
          if (die) {
            article = "die";
          }
          if (das) {
            article = "das";
          }
          if (dieDer) {
            article = "der/die";
          }
          const isOneWord = w.split(/\s/).length === 1;

          if (isOneWord) {
            const entry = {
              type: "noun", //  существительное
              base: w,
              article,
              original: _phrase,
            };

            return entry;
          }
        } else {
          console.log("--opps");
        }
      }

      const isVerb = REGEXP_VERB.test(phrase);
      if (isVerb) {
        const base = removeAdv(removeOptional(removeOptionalPlural(phrase)));

        // только если одно слово, иначе отбраковываем (возможно фраза)
        if (base.split(/\s/).length === 1) {
          // только слово с маленькой буквы
          if (!/^[A-ZÄÖÜ]/.test(base) && !/[^a-zäöüß\/\=]/gi.test(base)) {
            const [w, prefix] = normalizeVerb(base); // нормализовать

            const config = { generate: 1 };

            if (prefix) {
              config.prefixSeparate = prefix;
            }

            config._form = sp(w, config);

            const entry = {
              type: "verb", //  глагол
              base: w,
              article: null,
              original: _phrase,
              config, // склонения
            };

            return entry;
          }
        }
      }

      const entry = {
        type: "*", // остальное
        base: removeAdv(phrase),
        article: null,
        original: _phrase,
      };

      return entry;
    })
    .map((data) => ({ ...data, ...options }));
};

const add = (dictonary, data, { options = {}, cb, spliter = ";" } = {}) => {
  if (data instanceof Array) {
    const [text, translate = "", context = []] = data;
    if (!text) {
      return;
    }
    const entries = parsePhrase(text, {
      translate: translateNormalize(translate, { spliter }),
      context,
      ...options,
    });
    entries.forEach((_entry) => {
      const entry = !!cb ? cb(_entry) : _entry;
      const id = getEntryId(entry);

      const sn = dictonary.find((e) => e.id === id);
      if (!sn) {
        const originals = [entry.original];
        delete entry.original;

        dictonary.push({ ...entry, originals, id });
      } else {
        // console.log("skip", sn, entry);
        // merge code
        sn.originals = mergeOriginals(sn.originals, entry.original);

        if (sn.type === "*" && entry.type !== "*") {
          sn.type = entry.type;
        } else if (sn.type !== entry.type) {
          console.warn("Изменился тип слова. Необходима проверка");
        }

        if (sn.article === null && entry.type !== null) {
          sn.article = entry.article;
        } else if (entry.article !== null && sn.article !== entry.article) {
          console.warn(
            "Изменился артикль слова. Необходима проверка",
            sn.article,
            entry.article,
            "_",
            sn.originals,
            entry.original
          );
        }

        if (sn.translate !== entry.translate) {
          sn.translate = translateNormalize(
            sn.translate + ";" + entry.translate
          );
        }
        sn.context.push(...entry.context);

        // Optional
        if (entry.config) {
          if (sn?.config?.generate < entry.config?.generate) {
            sn.config = { ...entry.config };
          } else if (sn?.config?.generate !== entry.config?.generate) {
            console.log(
              "! no merge config!!!!!!",
              sn?.config?.generate,
              entry.config?.generate
            );
          }
        }

        if (entry.irregular) {
          sn.irregular = entry.irregular;
        }
      }
    });
  }
};

const addVerb = (dictonary, data, options = {}, afterCb) => {
  const cb = (_entry) => {
    const entry = afterCb ? afterCb(_entry) : _entry;

    return { ...entry, type: "verb" };
  };

  add(dictonary, data, { options, cb });
};

[...list, ...words200, ...verbs].forEach((data) => add(dictonary, data));
predlogi.forEach((data) => add(dictonary, data));

datumGroups.forEach((g) => g.forEach((data) => add(dictonary, data)));

irregularVerbs.forEach((data) => {
  const w = data[0] || "";
  const t = data.length > 1 ? data[data.length - 1] : "";
  addVerb(dictonary, [w, t], { irregular: true });
});

irregularVerbs2.forEach((data) => {
  const w = data[0] || "";
  const t = data.length > 1 ? data[data.length - 1] : "";
  const c = w.split(";").map((t) => t.trim());
  addVerb(dictonary, [c[0], t], { irregular: true });
});

groups.forEach((g) => g.verbs.forEach((verb) => add(dictonary, verb)));

[
  ...listA1,
  ...listA11L1,
  ...listA11L2,
  ...listA11L3,
  ...listA11L4,
  ...listA11L5,
  ...listA11L6,
  ...listA11L8,
  ...listA11L10,
  ...listdasAdjektiv01,
  ...listKlassePiriBayern,
].forEach((data) => add(dictonary, data));

[
  ...listDeutschA1Schritte,
  ...listDeutschA2Schritte,
  ...listDeutschB1Schritte,
].forEach((data) => add(dictonary, data, { spliter: "," }));

verbsIrregular.forEach((data) => {
  const [w, t, o] = data;

  addVerb(dictonary, [w, t], { irregular: true }, (entry) => {
    const config = {
      generate: 100,
      ...o,
    };
    config._form = sp(w, o);

    return { ...entry, config };
  });
});

// ------------------------------

dictonary.sort((a, b) => {
  if (a.base > b.base) return 1;
  if (a.base < b.base) return -1;

  return 0;
});

console.log("---------------- end test --------------");
// console.log(dictonary.filter(({ type }) => type === "*"));

// ["*", "verb", "noun"].forEach((t) =>
//   console.log(t + " = ", dictonary.filter(({ type }) => type === t).length)
// );

// dictonary
//   .filter(({ translate }) => translate === "")
//   .forEach(({ id, base, translate }) => console.log(base, translate));

// dictonary
//   .filter(({ type }) => type === "*")
//   .forEach(({ id, base, translate }) => console.log(base));

// dictonary
// .filter(({ translate }) => /,/ig.test(translate))
// .forEach(({ id, base, translate }) => console.log(base, translate));

// console.log(dictonary);

["*", "verb", "noun"].forEach((t) => {
  const db = dictonary.filter(({ type }) => type === t);
  const fileName = `db-${t}.json`;
  fs.writeFileSync(`./${fileName}`, JSON.stringify(db, null, "  "));
  console.log(`Writed file  ${fileName}, ${db.length} items`);

  // db.forEach(({ article, base }) =>
  //   console.log(`${article ? `${article} ` : ""}${base}`)
  // );
});
