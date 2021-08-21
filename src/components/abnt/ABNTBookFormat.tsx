import React from "react"
import { Text } from "@chakra-ui/react"
import { DocumentBadge } from "../DocumentBadge"
import { ResultBox } from "../ResultBox"
import { TranslationResultContainer } from "../../types";

interface BookProps {
  translation: TranslationResultContainer;
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
  translation,
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
        {translation.associatedDocumentTypeTitle}
        <DocumentBadge label={translation.book} />
      </Text>
      <Text mt="4" mb="1" fontSize="12px" fontWeight="bold">
        {`${translation.option} 1`}
      </Text>
      <ResultBox id="opt1" translation={translation}>
        {groupAuth} <strong>{title}</strong>. {edition}{" "}
        {place ? place : "[Add local de publicação]"}: {publisher}, {year}. DOI:{" "}
        {doi}
      </ResultBox>
      {firstAuth && (
        <>
          <Text mt="4" mb="1" fontSize="12px" fontWeight="bold">
            {`${translation.option} 2`}
          </Text>
          <ResultBox id="opt2" translation={translation}>
            {firstAuth} et al. <strong>{title}</strong>. {edition}{" "}
            {place ? place : "[Add local de publicação]"}: {publisher}, {year}.
            DOI: {doi}.
          </ResultBox>
        </>
      )}
    </>
  )
};