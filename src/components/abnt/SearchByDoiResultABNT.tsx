import React from "react"
import { Box } from "@chakra-ui/react"
import { formatAuthorsStringToABNT } from "../../utils/utils"
import {ABNTArticleFormat} from "./ABNTArticleFormat"
import {ABNTBookFormat} from "./ABNTBookFormat"
import {ABNTBookChapterFormat} from "./ABNTBookChapterFormat"
import {ABNTThesisFormat} from "./ABNTThesisFormat"
import { DOIResponse, TranslationResultContainer } from "../../types"
import { ResultContainer } from "../ResultContainer"

interface SearchByDoiResultABNTProps {
  translation: TranslationResultContainer;
  data: DOIResponse;
}

export const SearchByDoiResultABNT = ({ translation, data }: SearchByDoiResultABNTProps) => {
  const {
    author,
    doi,
    journal,
    number,
    pages,
    publisher,
    place,
    title,
    booktitle,
    volume,
    year,
    edition,
    typeDoc,
    vinculation,
    bookAuthors,
    responsibility,
  } = data.Fields
  const formatedAuthors = formatAuthorsStringToABNT(author || "")
  const firstAuth = formatedAuthors.firstAuth
  const groupAuth = formatedAuthors.group
  const formatedBookAuthors = formatAuthorsStringToABNT(bookAuthors || "")
  return (
    <ResultContainer translation={translation}>
      {data.EntryType === "article" && (
        <ABNTArticleFormat
          {...{
            translation,
            groupAuth,
            firstAuth,
            title,
            journal,
            place,
            volume,
            number,
            pages,
            year,
            publisher,
            doi,
          }}
        />
      )}
      {data.EntryType === "book" && (
        <ABNTBookFormat
          {...{
            translation,
            groupAuth,
            firstAuth,
            title,
            place,
            year,
            publisher,
            doi,
            edition,
          }}
        />
      )}
      {data.EntryType === "incollection" && (
        <ABNTBookChapterFormat
          {...{
            translation,
            groupAuth,
            firstAuth,
            title,
            booktitle,
            place,
            year,
            publisher,
            doi,
            edition,
            formatedBookAuthors,
            responsibility,
            pages,
          }}
        />
      )}
      {(data.EntryType === "phdthesis" ||
        data.EntryType === "masterthesis") && (
        <ABNTThesisFormat
          {...{
            translation,
            groupAuth,
            title,
            place,
            year,
            doi,
            typeDoc,
            vinculation,
          }}
        />
      )}
    </ResultContainer>
  )
}