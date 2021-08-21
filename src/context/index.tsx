import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { DOIResponse, Langs, Standard } from '../types';
import firebase from 'firebase/app';
import getFirebaseClient from '../../firebaseApp';
import { Actions, initialState, searchResponseReducer } from './searchResponseReducer';

interface MainContextProps {
  lang: Langs;
  likes: number;
  standard?: Standard;
  searchResponse: DOIResponse;
  setLang(lang: Langs): void;
  addLikes(): void;
  setStandard(standard: Standard): void;
  searchResponseDispatch: React.Dispatch<Actions>;
};

const MainContext = React.createContext<MainContextProps>(
  {} as MainContextProps
);

interface Props {
  children: React.ReactNode | React.ReactNode[];
};

export const MainContextProvider = ({ children }: Props) => {
  // libs
  const router = useRouter();
  // state
  const [lang, setLang] = React.useState<Langs>({ value: 'pt-BR', label: 'PT' });
  const [likes, setLikes] = React.useState(0);
  const [standard, setStandard] = React.useState<Standard>('abnt');
  const [db, setDb] = React.useState<firebase.database.Database>();
  const [searchResponse, searchResponseDispatch] = React.useReducer(searchResponseReducer, initialState);
  // handlers
  const addLikes = () => {
    if(!db) return;
    db.ref('/').update({ likes: firebase.database.ServerValue.increment(1) });
  };
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
  React.useEffect(() => {
    (async () => {
      const { db } = await getFirebaseClient();
      db.ref('likes').on('value', (snapshot) =>{
        const data = snapshot.val();
        if(data) setLikes(data);
      })
      if(db) setDb(db);
    })();
  }, []);
  // UI
  return (
    <MainContext.Provider
      value={{
        lang,
        likes,
        standard,  
        searchResponse,
        setLang,
        addLikes,
        setStandard,
        searchResponseDispatch,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  return React.useContext(MainContext);
};