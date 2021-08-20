import React, { Dispatch, SetStateAction } from 'react';
import { DOIResponse, Standard } from '../types';


interface MainContextProps {
  standard?: Standard;
  searchResponse?: DOIResponse;
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
  const [standard, setStandard] = React.useState<Standard>('abnt');
  const [searchResponse, setSearchResponse] = React.useState({} as DOIResponse);
  // handlers

  // UI
  return (
    <MainContext.Provider
      value={{
        standard,  
        searchResponse,
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