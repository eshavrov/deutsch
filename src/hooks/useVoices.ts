import React from "react";

import { getRegExpLangVoice } from "helpers/voice";

const useVoices = ({ nativeLanguage, lang, langOrigin }) => {
  const [voices, setVoices] = React.useState([]);
  const [originalVoices, setVoiceOriginal] = React.useState([]);

  const regExpLangOriginalVoice = React.useMemo(
    () => getRegExpLangVoice(langOrigin),
    [langOrigin]
  );

  const regExpLangVoice = React.useMemo(() => getRegExpLangVoice(lang), [lang]);

  React.useEffect(() => {
    const synth = window.speechSynthesis;

    const isSpeechSynthesis = synth?.onvoiceschanged !== undefined;

    if (isSpeechSynthesis) {
      const _voicesChangedCallback = () => {
        const _voices = synth.getVoices();

        setVoices(
          _voices
            .filter(({ lang: language }) => regExpLangVoice.test(language))
            .slice(0, lang === nativeLanguage ? 1 : undefined)
        );

        setVoiceOriginal(
          _voices
            .filter(({ lang: language }) =>
              regExpLangOriginalVoice.test(language)
            )
            .slice(0, langOrigin === nativeLanguage ? 1 : undefined)
        );
      };

      synth.addEventListener("voiceschanged", _voicesChangedCallback);

      return () => {
        synth.removeEventListener("voiceschanged", _voicesChangedCallback);
      };
    }
  }, []);

  return {
    voices,
    originalVoices,
  };
};

export { useVoices };
