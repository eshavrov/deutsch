const REGEXP_INFINITIVE_END = /en$/i;
//К неотделяемым приставкам в немецком языке относятся приставки be-, ge-, er-, ver-, zer-, emp-, ent-, miss-
//Но есть еще некоторые приставки, которые могут быть либо отделяемыми, либо неотделяемыми.
const PREFIX_NOT_SEPARATED = [
  "be",
  "ge",
  "er",
  "ver",
  "zer",
  "emp",
  "ent",
  "miss",
];

// В немецком языке отделяемыми приставками в большинстве случаев выступают предлоги и наречия,
// значение которых легко установить, например:
// ab-, an-, auf-, aus-, bei-, ein-, fest-, her-, hin-, los-, mit-, nach-, vor-, weg-, wieder-, zu-, zurück-, zusammen
const PREFIX_SEPARATE = [
  "ab",
  "an",
  "auf",
  "aus",
  "bei",
  "fest",
  "ein",
  "heim",
  "heraus",
  "herein",
  "herauf",
  "her",
  "hinaus",
  "hinauf",
  "hinein",
  "hin",
  "los",
  "mit",
  "nach",
  "vor",
  "weg",
  "wieder",
  "zurück",
  "zu",
  "zusammen",
];

const getChunks = (infinitive) => {
  const base = infinitive.replace(REGEXP_INFINITIVE_END, "");
  return {
    base,
  };
};

const getIch = (base, config) => {
  return `e`;
};

const getDu = (base, config) => {
  // if (/(t|d|m|n)$/i.test(base)) {
  //   return `est`;
  // }

  let before = "";

  if (/(d|t|chn|ffn|dm|gn|tm)$/i.test(base)) {
    before = "e";
  }

  if (/(s|ss|ß|z|tz)$/i.test(base)) {
    return `${before}t`;
  }

  return `${before}st`;
};

const getErSieEs = (base, config) => {
  let before = "";

  if (/(d|t|chn|ffn|dm|gn|tm)$/i.test(base)) {
    before = "e";
  }

  return `${before}t`;
};

const getWir = (base, config) => {
  return `en`;
};

const getIhr = (base, config) => {
  let before = "";

  if (/(d|t|chn|ffn|dm|gn|tm)$/i.test(base)) {
    before = "e";
  }

  return `${before}t`;
};

const getSieSie = (base, config) => {
  return `en`;
};

const c = (base, config) => {
  if (config.type) {
    const [a, b] = config.type.split("-");

    const count = base.match(new RegExp(a, "ig")).length;

    if (count === 0) {
      console.warn(`Type error. No vowel found (${a})`);
      return null;
    }

    if (count === 1) {
      return base.replace(a, b);
    }

    console.warn(
      `At the root of the word (${base}) is more than one vowel (${a})`
    );
    return null;
  }

  return base;
};

const sp = (infinitive, config) => {
  if (!REGEXP_INFINITIVE_END.test(infinitive)) {
    console.warn(`Word is not a verb (infinitive). [${infinitive}]`);

    return;
  }
  const chunks = getChunks(infinitive);
  let { base } = chunks;
  let after = "";

  /// Авто определение отделяемой приставки
  for (const prefix of PREFIX_SEPARATE) {
    if (new RegExp(`^${prefix}`, "i").test(base)) {
      console.log(prefix);
      config.prefixSeparate = prefix;
      break;
    }
  }

  if (config.prefixSeparate) {
    base = base.replace(new RegExp(`^${config.prefixSeparate}`, "i"), "");
    after = ` ${config.prefixSeparate}`;
  }

  const _base = c(base, config);

  const result = {
    base,
    ich: config.ich || `${base}${getIch(base, config)}`,
    du: config.du || _base ? `${_base}${getDu(_base, config)}` : null,
    "er,sie,es":
      config["er,sie,es"] || _base
        ? `${_base}${getErSieEs(_base, config)}`
        : null,
    wir: config.wir || `${base}${getWir(base, config)}`,
    ihr: config.ihr || `${base}${getIhr(base, config)}`,
    "sie,Sie": config["sie,Sie"] || `${base}${getSieSie(base, config)}`,
  };

  result.ich += after;
  if (result.du) result.du += after;
  if (result["er,sie,es"]) result["er,sie,es"] += after;
  result.wir += after;
  result.ihr += after;
  result["sie,Sie"] += after;

  return result;
};

module.exports.sp = sp;
