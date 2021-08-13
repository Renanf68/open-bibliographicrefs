import React from "react"
import { Box } from "@chakra-ui/react"
import { formatAuthorsStringToABNT } from "../../utils/utils"
import {ABNTArticleFormat} from "./ABNTArticleFormat"
import {ABNTBookFormat} from "./ABNTBookFormat"
import {ABNTBookChapterFormat} from "./ABNTBookChapterFormat"
import {ABNTThesisFormat} from "./ABNTThesisFormat"

interface ResultProps {
  data: {
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
}

export const SearchByDoiResultABNT = ({ data }: ResultProps) => {
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
    <Box
      w="100%"
      backgroundColor="gray.300"
      mt="1rem"
      py="2rem"
      px="2rem"
      borderRadius="sm"
    >
      {data.EntryType === "article" && (
        <ABNTArticleFormat
          {...{
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
    </Box>
  )
}