import React from "react"
import { Text } from "@chakra-ui/react"
import { DocumentBadge } from "../DocumentBadge"
import { ResultBox } from "../ResultBox"

interface ThesisProps {
  groupAuth: string
  title: string
  place?: string
  year?: string
  doi: string
  typeDoc?: string
  vinculation?: string
}

export const ABNTThesisFormat = ({
  groupAuth,
  title,
  place,
  year,
  doi,
  typeDoc,
  vinculation,
}: ThesisProps) => {
  return (
    <>
      <Text mt="8" mb="4" fontWeight="medium">
        Tipo de documento associado ao DOI:
        <DocumentBadge label={'Tese/dissertação'} />
      </Text>
      <ResultBox>
        <Text as="p" fontSize="sm">
          {groupAuth} <strong>{title?.split(":")[0]}</strong>:{" "}
          {title?.split(":")[1]}. {year ? year : "[add Ano]"}. {typeDoc} -{" "}
          {vinculation}, {place ? place : "[Add local de publicação]"},{" "}
          {year ? year : "[add Ano]"}. DOI: {doi}
        </Text>
      </ResultBox>
    </>
  )
}