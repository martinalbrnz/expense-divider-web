import { JSX } from "solid-js";
import { Portal } from "solid-js/web";

export interface ModalProps {
  children: JSX.Element;
}

export default function Modal(props: ModalProps) {
  return (
    <>
      <Portal>
        <div class="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-70">
          {props.children}
        </div>
      </Portal>
    </>
  );
}
