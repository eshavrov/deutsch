import React from "react";
import cn from "classnames";
import { animated as a } from "react-spring";

import { useVoices } from "hooks/useVoices";
import { LANGUAGE } from "constants/index";

import s from "./styles.module.css";

const WordVariants = (props) => {
  const {
    dict = [],

    languages: [lang, langOrigin],
    nativeLanguage = LANGUAGE.RU,
  } = props;

  const msgRef: any = React.useRef();
  const msgOriginalRef: any = React.useRef();

  const [start, setStart] = React.useState(false);
  const [indexLine, setIndexLine] = React.useState(-1);

  const { voices, originalVoices } = useVoices({
    nativeLanguage,
    lang,
    langOrigin,
  });

  const onSpeack = React.useCallback(() => {
    window.speechSynthesis;
    if (!msgRef.current) return;

    voices.forEach((voice, i) => {
      setTimeout(() => {
        msgRef.current.voice = voice;
        msgRef.current.lang = lang;
        window.speechSynthesis.speak(msgRef.current);
      }, i * 1000);
    });

    originalVoices.forEach((voice, i) => {
      setTimeout(() => {
        msgOriginalRef.current.voice = voice;
        msgOriginalRef.current.lang = lang;
        window.speechSynthesis.speak(msgOriginalRef.current);
      }, (i + voices.length + 1) * 1000);
    });
  }, [originalVoices, voices, lang]);

  React.useEffect(() => {
    if (indexLine < 0) return;

    const { phrase, translation } = dict[indexLine];

    msgRef.current = new window.SpeechSynthesisUtterance(phrase);
    msgOriginalRef.current = new window.SpeechSynthesisUtterance(translation);
  }, [voices, originalVoices, indexLine, dict]);

  React.useEffect(() => {
    onSpeack();
    if (indexLine >= 0) {
      const id = setTimeout(
        () => setIndexLine((i) => (i + 1) % dict.length),
        8000
      );

      return () => clearTimeout(id);
    }
  }, [indexLine]);

  const onStart = React.useCallback(() => {
    window.speechSynthesis;

    setIndexLine((i) => (i + 1) % dict.length);
    setStart(true);
  }, []);

  if (!start) {
    return <button onClick={onStart}>start</button>;
  }

  return (
    <a.div className={s.container}>
      <table className={s.card}>
        <tbody>
          {dict.map(({ phrase, translation, id }, index) => {
            return (
              <tr key={id} className={s.line}>
                <td className={s["cell-word"]}>
                  <span
                    className={cn(s.word, {
                      [s["word--selected"]]: index === indexLine,
                    })}
                  >
                    {phrase}
                  </span>
                </td>
                <td className={s["cell-translated"]}>
                  <span
                    className={cn(s.translated, {
                      [s["translated--selected"]]: index === indexLine,
                    })}
                  >
                    {translation}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </a.div>
  );
};

export default WordVariants;
