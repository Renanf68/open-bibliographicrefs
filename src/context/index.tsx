import React, { Dispatch, SetStateAction } from 'react';
import { DOIResponse, Langs, Standard } from '../types';


interface MainContextProps {
  lang: Langs;
  standard?: Standard;
  searchResponse?: DOIResponse;
  setLang(lang: Langs): void;
  setStandard(standard: Standard): void;
  setSearchResponse: Dispatch<SetStateAction<DOIResponse>>;
}

const MainContext = React.createContext<MainContextProps>(
  {} as MainContextProps
);

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const MainContextProvider = ({ children }: Props) => {
  // state
  const [lang, setLang] = React.useState<Langs>({ value: 'pt-br', label: 'PT' });
  const [standard, setStandard] = React.useState<Standard>('abnt');
  const [searchResponse, setSearchResponse] = React.useState({} as DOIResponse);
  // handlers

  // UI
  return (
    <MainContext.Provider
      value={{
        lang,
        standard,  
        searchResponse,
        setLang,
        setStandard,
        setSearchResponse
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  return React.useContext(MainContext);
};