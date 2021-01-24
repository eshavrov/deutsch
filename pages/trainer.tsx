import React from "react";

import { Layout } from "components/common";

import Trainer from "components/Trainer";

import { LANGUAGE } from "constants/index";
import db from "constants/dict/in_data/testTrainer/1.json";

const TYPES = {
  TEXT: "text",
  ACTION: "action",
  SEPARATE: "separate",
};

const COMPONENT = {
  INPUT: "input",
  DROPDOWN: "dropdown",
};

const defaultSeparate = {
  type: TYPES.SEPARATE,
  value: " ",
};

const mapChunk = (component) => (text) => {
  if (/\[/i.test(text)) {
    console.log(">>", text);
    const before = text.replace(/\[.*$/gi, "");
    const after = text.replace(/^.*\]/gi, "");

    const _arr = text.replace(/^.*\[/gi, "").replace(/\].*$/gi, "").split("|");

    const variants = _arr
      .map((v) => {
        const status = !/^\^/i.test(v);
        const value = v.replace(/^\^/i, "");

        return {
          status,
          value,
        };
      })
      .sort((_) => Math.random() - 0.5);

    const correct = variants
      .filter(({ status }) => status)
      .map(({ value }) => value);

    return [
      {
        type: TYPES.ACTION,
        value: text,
        variants,
        correct,
        before,
        after,
        component,
      },
    ];
  }

  return [
    {
      type: TYPES.TEXT,
      value: text,
    },
  ];
};

const addSpeparate = (arr, separate = defaultSeparate) => {
  return arr.reduce((acc, value, index) => {
    if (index === 0) {
      return [...acc, value];
    }

    if (/^\s*[\.\,\:\?\!]+\s*$/i.test(value.value)) {
      return [...acc, value];
    }

    return [...acc, separate, value];
  }, []);
};

const addId = (items) =>
  items.map((data, index) => ({ ...data, id: `id-${index}` }));

const getChunks = (text, component) => {
  // Разделяем на части строку
  const chunks = text
    .replace(/\?/i, " ?")
    .replace(/\!/i, " !")
    .replace(/\./i, " .")
    .replace(/\,/i, " ,")
    .replace(/\:/i, " :")
    // .split(/\s+/i);
    .match(/(\[.*?\]|[^\[\s]+)+(?=\s*|\s*$)/g);

  // Определяем части
  const _chunks = chunks.flatMap(mapChunk(component));

  const result = addSpeparate(_chunks);

  return addId(result);
};

const projection = (component) => (data) => {
  const [phrase] = data;

  const chunks = getChunks(phrase, component);

  return {
    phrase,
    chunks,
  };
};

const normalizeContent = (text) => text.split(";").map((_) => _.trim());

const mapData = (data) => {
  const { title, list, content = [], type } = data;

  const _normalizeContent = content.flatMap(normalizeContent);

  return {
    title,
    items: list.map(projection(type)),
    content: _normalizeContent,
    type,
  };
};

const Page = (props) => {
  const { languages, nativeLanguage, data = [] } = props;

  return (
    <div>
      {data.map(({ title, items, content, type }, index) => (
        <Trainer
          key={`trainer-line-${index}`}
          languages={languages}
          nativeLanguage={nativeLanguage}
          title={title}
          items={items}
          content={content}
          type={type}
        />
      ))}
    </div>
  );
};

Page.getInitialProps = ({ query }) => {
  let nativeLanguage = LANGUAGE.RU;

  let languages =
    query.lang === LANGUAGE.RU
      ? [LANGUAGE.RU, LANGUAGE.DE]
      : [LANGUAGE.DE, LANGUAGE.RU];

  const data = db
    .filter(({ type }) => !!type)
    .filter(({ type }) => ["write", "drag", "variants"].includes(type));

  const _data = data.map(mapData);

  return { languages, nativeLanguage, data: _data };
};

Page.Layout = Layout;

export default Page;
