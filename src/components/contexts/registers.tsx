import { JSX, createContext, createSignal, useContext } from "solid-js";
import { Register } from "~/models/register.model";

const RegistersContext = createContext();

export interface RegistersProviderI {
  registers: Register[];
  children: JSX.Element;
}

export const RegistersProvider = (props: RegistersProviderI) => {
  const [registers, setRegisters] = createSignal(props.registers || []);
  const registersList = [
    registers,
    {
      setRegisters(registers: Register[]) {
        setRegisters(registers);
      },
    },
  ];
  return (
    <RegistersContext.Provider value={registersList}>
      {props.children}
    </RegistersContext.Provider>
  );
};

export function useRegisters() {
  return useContext(RegistersContext);
}
