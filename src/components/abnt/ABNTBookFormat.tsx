import React from "react"
import { Text } from "@chakra-ui/react"
import { DocumentBadge } from "../DocumentBadge"
import { ResultBox } from "../ResultBox"

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
      <Text mt="8" fontWeight="medium">
        Tipo de documento associado ao DOI:
        <DocumentBadge label={'Livro'} />
      </Text>
      <Text mt="4" mb="1" fontSize="12px" fontWeight="bold">Opção 1</Text>
      <ResultBox id="opt1">
        {groupAuth} <strong>{title}</strong>. {edition}{" "}
        {place ? place : "[Add local de publicação]"}: {publisher}, {year}. DOI:{" "}
        {doi}
      </ResultBox>
      {firstAuth && (
        <>
          <Text mt="4" mb="1" fontSize="12px" fontWeight="bold">Opção 2</Text>
          <ResultBox id="opt2">
            {firstAuth} et al. <strong>{title}</strong>. {edition}{" "}
            {place ? place : "[Add local de publicação]"}: {publisher}, {year}.
            DOI: {doi}.
          </ResultBox>
        </>
      )}
    </>
  )
};