import React from "react"
import { Text } from "@chakra-ui/react"

interface BookProps {
  groupAuth: string
  firstAuth?: string
  title: string
  place?: string
  year?: string
  publisher: string
  doi: string
  edition?: string
}

export const ABNTBookFormat = ({
  groupAuth,
  firstAuth,
  title,
  place,
  year,
  publisher,
  doi,
  edition,
}: BookProps) => {
  return (
    <>
      <Text as="p" fontSize="sm" mb="1rem">
        <strong>
          Tipo de documento associdado ao doi:{" "}
          <Text as="span" color="primary">
            livro
          </Text>
          .
        </strong>
      </Text>
      <Text as="p" fontSize="sm">
        {groupAuth} <strong>{title}</strong>. {edition}{" "}
        {place ? place : "[Add local de publicação]"}: {publisher}, {year}. DOI:{" "}
        {doi}
      </Text>
      {firstAuth && (
        <>
          <Text as="p" fontSize="sm" color="red.500">
            ou
          </Text>
          <Text as="p" fontSize="sm">
            {firstAuth} et al. <strong>{title}</strong>. {edition}{" "}
            {place ? place : "[Add local de publicação]"}: {publisher}, {year}.
            DOI: {doi}.
          </Text>
        </>
      )}
    </>
  )
};