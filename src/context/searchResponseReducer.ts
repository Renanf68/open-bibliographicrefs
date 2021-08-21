import { DOIResponse, FieldKey } from "../types";

export const initialState = {
  EntryKey: '',
  EntryType: '',
  ObjectType: '',
  Fields: {
    author: '',
    doi: '',
    journal: '',
    number: '',
    pages: '',
    publisher: '',
    place: '',
    title: '',
    booktitle: '',
    volume: '',
    year: '',
    edition: '',
    typeDoc: '',
    vinculation: '',
    bookAuthors: '',
    responsibility: '',
  }
} as DOIResponse;

export type Actions =
  | { type: 'clear_state' }
  | { type: 'update_state'; payload: DOIResponse}
  | { type: 'update_fields'; payload: { key: FieldKey, value: string }}

export const searchResponseReducer = (state: DOIResponse, action: Actions): DOIResponse => {
  switch (action.type) {
    case 'clear_state':
      return initialState;
    case 'update_state':
      return {
        ...state,
        ...action.payload,
      };
    case 'update_fields':
      return {
        ...state,
        Fields: {
          ...state.Fields,
          [action.payload.key]: action.payload.value,
        }
      };
    default:
      throw new Error();
  }
};