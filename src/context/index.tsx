import { useRouter } from 'next/dist/client/router';
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
  // libs
  const router = useRouter()
  // state
  const [lang, setLang] = React.useState<Langs>({ value: 'pt-BR', label: 'PT' });
  const [standard, setStandard] = React.useState<Standard>('abnt');
  const [searchResponse, setSearchResponse] = React.useState({} as DOIResponse);
  // side effects
  React.useEffect(() => {
    const lang = navigator.language
    const langGeneric = lang.split("-")[0]
    if(langGeneric === 'en') setLang({ value: 'en', label: 'EN' });
    else if(langGeneric === 'es') setLang({ value: 'es', label: 'ES' });
  }, []);
  React.useEffect(() => {
    if(lang.value === 'en') router.push('/en');
    else if(lang.value === 'es') router.push('/es');
    else router.push('/');
  }, [lang]);
  console.log('Render !')
  // UI
  return (
    <MainContext.Provider
      value={{
        lang,
        standard,  
        searchResponse,
        setLang,
        setStandard,
        setSearchResponse,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  return React.useContext(MainContext);
};