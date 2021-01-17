import { list } from "../a1/a";
import { words200, verbs, irregularVerbs } from "../verbs";
import { groups } from "../verbsGroups";
import { list as listA11L1 } from "../a1/a1.1-l1";
import { list as listA11L2 } from "../a1/a1.1-l2";
import { list as listA11L3 } from "../a1/a1.1-l3";
import { groups as datumGroups } from "../a1/Datum";
import { createHash } from "crypto";

const getId = (uni) => {
  return createHash("md5").update(uni).digest("hex");
};

const phraseNormalize = (text) => {
  return text.replace(/\s+/gi, " ").trim();
};

const translateNormalize = (text) => {
  const chunks = phraseNormalize(text)
    .split(";")
    .filter(Boolean)
    .map(phraseNormalize);

  const tmp = {};
  const list = [];

  chunks.forEach((phrase) => {
    const id = getId(phrase);
    if (!tmp[id]) {
      list.push(phrase);
    }
    tmp[id] = phrase;
  });

  return list.join("; ");
};

const removeOptional = (text) => {
  return text.replace(/\([^)]*\) */g, "").trim();
};

const removeOptionalPlural = (text) => {
  return text.replace(/\*\{[^}]*\}/g, "").trim();
};

const getEntryId = (entry) => {
  const { type, base, article } = entry;

  return getId(type + base + article);
};

const REGEXP_DER = /^der\s+/i;
const REGEXP_DIE = /^die\s+/i;
const REGEXP_DAS = /^das\s+/i;
const REGEXP_DIE_DER = /^(die\s*\/\s*der\s*|der\s*\/\s*die)\s+/i;
const REGEXP_VERB = /en$/i;

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

      const isNoun = der || die || das || dieDer;
      // Существительные
      if (isNoun) {
        const chunk = phrase
          .split(/\,\s*(-|–)/gi)
          .map((p) => p.replace(/\,\s*\-*$/, ""));

        if (chunk.length > 0) {
          const [word] = chunk;
          const w = removeOptional(
            removeOptionalPlural(
              word
                .replace(REGEXP_DER, "")
                .replace(REGEXP_DIE, "")
                .replace(REGEXP_DAS, "")
                .replace(REGEXP_DIE_DER, "")
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

          const entry = {
            type: "noun", //  существительное
            base: w,
            article,
            original: _phrase,
          };

          return entry;
        } else {
          console.log("--opps");
        }
      }

      const isVerb = REGEXP_VERB.test(phrase);
      if (isVerb) {
        const base = removeOptional(removeOptionalPlural(phrase));

        // только если одно слово, иначе отбраковываем (возможно фраза)
        if (base.split(/\s/).length === 1) {
          // только слово с маленькой буквы
          if (!/^[A-ZÄÖÜ]/.test(base)) {
            const entry = {
              type: "verb", //  глагол
              base,
              article: null,
              original: _phrase,
            };

            return entry;
          }
        }
      }

      const entry = {
        type: "*", // остальное
        base: phrase,
        article: null,
        original: _phrase,
      };

      return entry;
    })
    .map((data) => ({ ...data, ...options }));
};

const add = (dictonary, data, { options = {}, cb } = {}) => {
  if (data instanceof Array) {
    const [text, translate = "", context = []] = data;
    if (!text) {
      return;
    }
    const entries = parsePhrase(text, {
      translate: translateNormalize(translate),
      context,
      ...options,
    });
    entries.forEach((_entry) => {
      const entry = !!cb ? cb(_entry) : _entry;
      const id = getEntryId(entry);

      const sn = dictonary.find((e) => e.id === id);
      if (!sn) {
        dictonary.push({ ...entry, id });
      } else {
        // console.log("skip", sn, entry);
        // merge code

        if (sn.translate !== entry.translate) {
          sn.translate = translateNormalize(
            sn.translate + ";" + entry.translate
          );
        }
        sn.context.push(...entry.context);
      }
    });
  }
};

const addVerb = (dictonary, data, options = {}) => {
  const cb = (entry) => {
    return { ...entry, type: "verb" };
  };
  add(dictonary, data, { ...options, cb });
};

// list.forEach((data) => add(dictonary, data));
// words200.forEach((data) => add(dictonary, data));
// verbs.forEach((data) => add(dictonary, data));
// groups.forEach((g) => g.verbs.forEach((verb) => add(dictonary, verb)));
// [...listA11L1, ...listA11L2, ...listA11L3].forEach((data) =>
//   add(dictonary, data)
// );
// datumGroups.forEach((g) => g.forEach((data) => add(dictonary, data)));

irregularVerbs.forEach((data) => {
  const w = data[0] || "";
  const t = data.length > 1 ? data[data.length - 1] : "";
  addVerb(dictonary, [w, t]);
});

dictonary.sort((a, b) => (a.base > b.base ? 1 : -1));

console.log("---------------- end test --------------");
// console.log(dictonary.filter(({ type }) => type === "*"));

console.log(dictonary.length, words200.filter(([p]) => Boolean(p)).length);

["*", "verb", "noun"].forEach((t) =>
  console.log(t + " = ", dictonary.filter(({ type }) => type === t).length)
);

// dictonary
//   .filter(({ type }) => type === "verb")
//   .forEach(({ id, base, translate }) => console.log(base, translate));

  // dictonary
  // .filter(({ translate }) => /,/ig.test(translate))
  // .forEach(({ id, base, translate }) => console.log(base, translate));

console.log(dictonary)