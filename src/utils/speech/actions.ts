import { CLEAR_TRANSCRIPT, APPEND_TRANSCRIPT } from "./constants";

const clearTrancript = () => {
  return { type: CLEAR_TRANSCRIPT };
};

const appendTrancript = (interimTranscript, finalTranscript) => {
  return {
    type: APPEND_TRANSCRIPT,
    payload: {
      interimTranscript,
      finalTranscript,
    },
  };
};

export { clearTrancript, appendTrancript };
