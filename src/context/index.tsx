import { useRouter } from 'next/dist/client/router';
import React, { Dispatch, SetStateAction } from 'react';
import { DOIResponse, Langs, Standard } from '../types';
import firebase from 'firebase/app';
import getFirebaseClient from '../../firebaseApp';


interface MainContextProps {
  lang: Langs;
  likes: number;
  standard?: Standard;
  searchResponse?: DOIResponse;
  setLang(lang: Langs): void;
  addLikes(): void;
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
  const [likes, setLikes] = React.useState(0);
  const [standard, setStandard] = React.useState<Standard>('abnt');
  const [searchResponse, setSearchResponse] = React.useState({} as DOIResponse);
  const [db, setDb] = React.useState<firebase.database.Database>();
  // handlers
  const addLikes = () => {
    if(!db) return;
    db.ref('/').update({ likes: firebase.database.ServerValue.increment(1) });
    console.log('Add!')
  }
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
  console.log('Render !')
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