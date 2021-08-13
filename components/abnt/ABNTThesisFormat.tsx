import React from "react"
import { Text } from "@chakra-ui/react"

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
      <Text as="p" fontSize="sm" mb="1rem">
        <strong>
          Tipo de documento associdado ao doi:{" "}
          <Text as="span" color="primary">
            tese/dissertação
          </Text>
          .
        </strong>
      </Text>
      <Text as="p" fontSize="sm">
        {groupAuth} <strong>{title?.split(":")[0]}</strong>:{" "}
        {title?.split(":")[1]}. {year ? year : "[add Ano]"}. {typeDoc} -{" "}
        {vinculation}, {place ? place : "[Add local de publicação]"},{" "}
        {year ? year : "[add Ano]"}. DOI: {doi}
      </Text>
    </>
  )
}