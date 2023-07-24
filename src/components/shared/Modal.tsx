import { JSX } from "solid-js";
import { Portal } from "solid-js/web";
import { useTheme } from "../contexts/theme";

export interface ModalProps {
  children: JSX.Element;
}

export default function Modal(props: ModalProps) {
  const [isDark]: any = useTheme();

  return (
    <>
      <Portal>
        <div
          class="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-70"
          classList={{ dark: isDark }}
        >
          {props.children}
        </div>
      </Portal>
    </>
  );
}
