import React from "react";

import { Layout } from "components/common";

import SpeechRecognitionList from "components/SpeechRecognitionList";
import { LANGUAGE } from "constants/index";
import { getDictonary } from "constants/db";

const Page = (props) => {
  const { dict = [], nativeLanguage, languages } = props;

  return (
    <SpeechRecognitionList
      dict={dict}
      nativeLanguage={nativeLanguage}
      languages={languages}
    />
  );
};

Page.getInitialProps = ({ query }) => {
  const { lang, count = 16 } = query;
  let nativeLanguage = LANGUAGE.RU;

  let languages =
    lang === LANGUAGE.RU
      ? [LANGUAGE.RU, LANGUAGE.DE]
      : [LANGUAGE.DE, LANGUAGE.RU];

  const dict = Object.values(getDictonary({ languages, count }));

  return { dict, languages, nativeLanguage };
};

Page.Layout = Layout;

export default Page;
