
export type Standard = 'abnt' | 'apa' | 'vancouver';

export interface DOIResponse {
  EntryKey: string
  EntryType: string
  ObjectType: string
  Fields: {
    author: string
    doi: string
    journal?: string
    number?: string
    pages?: string
    publisher: string
    place?: string
    title: string
    booktitle?: string
    volume?: string
    year?: string
    edition?: string
    typeDoc?: string
    vinculation?: string
    bookAuthors?: string
    responsibility?: string
  }
};

export interface Langs {
  value: 'en' | 'es' | 'pt-br';
  label: 'EN' | 'ES' | 'PT';
};

export interface TranslationHeader {
  likes: {
    youAndMore: string;
    peopleLiked: string;
    didYouLike: string;
  };
  contribute: string;
}

export interface TranslationToolBox {
  messages: {
    success: string;
    documentTypeNotSupported: string;
    documentNotFound: string;
    requiredFields: string;
  }
  exampleInitials: string;
  publiPlace: string;
  buttonLabel: string;
  requiredFields: string;
  viewResult: string;
  extraInputsBoxTitle: string;
  year: string;
  editionNumber: string;
  documentType: string;
  academicAffiliation: string;
  authorsFullName: string;
  authorFullNamePlaceholder: string;
  eachAuthorName: string;
  AddAuthorButtonLabel: string;
  removeAuthorLabel: string;
  org: string;
  pages: string;
}

export interface TranslationResultContainer {
  title: string;
  option: string;
  associatedDocumentTypeTitle: string;
  paper: string;
  bookChapter: string;
  book: string;
  thesis: string;
  copyIconLabel: string;
  pasteRecomendation: string;
  standardWarning: string;
}

export interface Translation {
  title: string;
  description: string;
  content: {
    header: TranslationHeader;
    subtitle: string;
    doiBoxFirtPart: string;
    doiBoxSecondPart: string;
    toolBox: TranslationToolBox;
    ResultContainer: TranslationResultContainer;
  };
};