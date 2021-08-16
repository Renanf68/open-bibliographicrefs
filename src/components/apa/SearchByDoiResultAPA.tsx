import React from "react"
import { Box } from "@chakra-ui/react"
import { formatAuthorsStringToABNT } from "../../utils/utils"

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
    }
  }
}

export const SearchByDoiResultAPA = ({ data }: ResultProps) => {
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
  } = data.Fields
  const formatedAuthors = formatAuthorsStringToABNT(author || "")
  const firstAuth = formatedAuthors.firstAuth
  const groupAuth = formatedAuthors.group
  return (
    <Box
      w="100%"
      backgroundColor="gray.300"
      mt="1rem"
      py="2rem"
      px="2rem"
      borderRadius="sm"
    >
      <p>APA</p>
    </Box>
  )
}