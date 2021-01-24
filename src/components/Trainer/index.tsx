import React from "react";
import cn from "classnames";

import { LANGUAGE, LANGUAGE_REGION } from "constants/index";
import { Logo, Button, Input, DropDown } from "components/ui";

import s from "./styles.module.css";
const ITERATION = 2;

const TYPES = {
  TEXT: "text",
  ACTION: "action",
  SEPARATE: "separate",
};

const COMPONENT = {
  INPUT: "input",
  DROPDOWN: "dropdown",
  DEFAULT: "default",
};

const getComponentType = (type) => {
  console.log("***", type);
  switch (type) {
    case "write":
    case "drag":
      return COMPONENT.INPUT;
    case "variants":
      return COMPONENT.DROPDOWN;
    default:
      return COMPONENT.DEFAULT;
  }
};

const TypeChunk = (props) => {
  const {
    type,
    value,
    state,
    setState,
    id,
    before = "",
    after = "",
    correct,
    variants,
    rootType,
  } = props;

  const component = getComponentType(rootType);

  // DropDown component
  if (type === TYPES.ACTION && component === COMPONENT.DROPDOWN) {
    const userValue = state[id] || variants[0].value;

    const onChange = (nextValue) => {
      setState((s) => ({ ...s, [id]: nextValue }));
    };

    const items = React.useMemo(() => {
      return variants.map(({ value }) => ({
        value,
        label: value,
      }));
    }, [variants]);

    React.useEffect(() => {
      const nextValue = state[id] || variants[0].value;
      setState((s) => ({ ...s, [id]: nextValue }));
    }, []);

    console.log("items:", items, variants);

    return (
      <>
        {before}
        <DropDown
          className={cn(s.input, {
            [s.before]: !!before,
            [s.after]: !!after,
          })}
          value={userValue}
          items={items}
          onChange={onChange}
        />
        {after}
      </>
    );
  }

  // Input component
  if (type === TYPES.ACTION && component === COMPONENT.INPUT) {
    const userValue = state[id] || "";

    const onChange = (event) => {
      const nextValue = event.target.value;

      setState((s) => ({ ...s, [id]: nextValue }));
    };
    const len = correct.reduce((acc, text) => Math.max(text.length, acc), 0);

    const width = len === 0 ? 20 : len * 0.75;

    return (
      <>
        {before}
        <input
          className={cn(s.input, {
            [s.before]: !!before,
            [s.after]: !!after,
          })}
          style={{
            width: `${width}em`,
          }}
          type="text"
          value={userValue}
          onChange={onChange}
        />
        {after}
      </>
    );
  }

  return value;
};

const WrapperChunk = (props) => {
  const {
    type,
    value,
    id,
    userValue,
    setUserValue,
    before,
    after,
    correct,
    variants,
    rootType,
  } = props;

  return (
    <span className={s["wrapper-chunk"]}>
      <TypeChunk
        type={type}
        id={id}
        value={value}
        state={userValue}
        setState={setUserValue}
        before={before}
        after={after}
        correct={correct}
        variants={variants}
        rootType={rootType}
      />
    </span>
  );
};

const Item = (props) => {
  const { className, header, phrase, chunks = [], type = "default" } = props;

  const [userValue, setUserValue] = React.useState({});
  const [status, setStatus] = React.useState(false);
  const [iteration, setIteration] = React.useState(0);

  // console.log("chunks", chunks);
  const onChangeApply = () => {
    console.log(phrase);
    console.log(chunks);
    console.log(userValue);

    const actions = chunks.filter(({ type }) => type === TYPES.ACTION);

    const isGood = actions.reduce((acc, { id, correct }) => {
      const value = userValue[id];
      const result = (value && correct.includes(value)) || false;

      return acc && result;
    }, true);
    console.log(isGood);
    setStatus(isGood);
    setIteration((v) => v + 1);
  };

  const isDisabled = iteration >= ITERATION || status;

  const isError = isDisabled && !status;

  return (
    <div className={cn(s.line, { [s.good]: status, [s.error]: isError })}>
      <p className={s.source}>
        {phrase} ({type})
      </p>
      <p>
        {chunks.map((data, index) => (
          <WrapperChunk
            key={`chunk-item=${index}`}
            {...data}
            rootType={type}
            userValue={userValue}
            setUserValue={setUserValue}
          />
        ))}
      </p>
      <Button
        className={s.button}
        onClick={onChangeApply}
        disabled={isDisabled}
      >
        Проверить
      </Button>
    </div>
  );
};

const Trainer = (props) => {
  const {
    languages: [lang, langOrigin],
    nativeLanguage = LANGUAGE.RU,
    title = "",
    items = [],
    content = [],
    type = "default",
  } = props;

  const isContent = content?.length > 0;
  console.log(items);

  return (
    <div className={s.container}>
      <h2>{title}</h2>
      {isContent && (
        <section className={s.content}>
          {content.map((p, index) => (
            <p key={`content-p-${index}`}>{p}</p>
          ))}
        </section>
      )}
      {items.map((data, index) => (
        <Item key={`line-${index}`} {...data} header={title} type={type} />
      ))}
    </div>
  );
};

export default Trainer;
