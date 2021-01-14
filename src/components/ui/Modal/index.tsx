import React from "react";
import Portal from "@reach/portal";

import { Cross } from "components/icons";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import FocusTrap from "lib/focus-trap";

import s from "./Modal.module.css";
interface Props {
  className?: string;
  children?: any;
  open?: boolean;
  onClose: () => void;
  onEnter?: () => void | null;
}

const Modal: React.FC<Props> = ({
  children,
  open,
  onClose,
  onEnter = null,
}) => {
  const ref = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  const handleKey = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        return onClose();
      }
    },
    [onClose]
  );

  React.useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current);
        window.addEventListener("keydown", handleKey);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      window.removeEventListener("keydown", handleKey);
      clearAllBodyScrollLocks();
    };
  }, [open, handleKey]);

  return (
    <Portal>
      {open ? (
        <div className={s.root}>
          <div className={s.modal} role="dialog" ref={ref}>
            <button
              onClick={() => onClose()}
              aria-label="Close panel"
              className={s["btn-close"]}
            >
              <Cross className={s.cross} />
            </button>
            <FocusTrap focusFirst>{children}</FocusTrap>
          </div>
        </div>
      ) : null}
    </Portal>
  );
};

export default Modal;
