
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
}