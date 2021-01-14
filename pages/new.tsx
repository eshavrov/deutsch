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
  let nativeLanguage = LANGUAGE.RU;

  let languages =
    query.lang === LANGUAGE.RU
      ? [LANGUAGE.RU, LANGUAGE.DE]
      : [LANGUAGE.DE, LANGUAGE.RU];

  const dict = Object.values(getDictonary({ languages, count: 50 }));

  return { dict, languages, nativeLanguage };
};

Page.Layout = Layout;

export default Page;
