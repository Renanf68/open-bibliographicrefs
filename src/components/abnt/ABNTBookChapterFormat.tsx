import React from "react"
import { Text } from "@chakra-ui/react"
import { ResultBox } from "../ResultBox";
import { DocumentBadge } from "../DocumentBadge";
import { TranslationResultContainer } from "../../types";
interface ChapterProps {
  translation: TranslationResultContainer;
  groupAuth: string
  firstAuth?: string
  title: string
  booktitle?: string
  place?: string
  year?: string
  publisher: string
  doi: string
  edition?: string
  formatedBookAuthors?: {
    group: string
    firstAuth: string | undefined
  }
  responsibility?: string
  pages?: string
}

export const ABNTBookChapterFormat = ({
  translation,
  groupAuth,
  firstAuth,
  title,
  booktitle,
  place,
  year,
  publisher,
  //doi,
  edition,
  formatedBookAuthors,
  responsibility,
  pages,
}: ChapterProps) => {
  return (
    <>
      <Text mt="8" fontWeight="medium">
        {translation.associatedDocumentTypeTitle}
        <DocumentBadge label={translation.bookChapter} />
      </Text>
      <Text mt="4" mb="1" fontSize="12px" fontWeight="bold">
        {`${translation.option} 1`}
      </Text>
      <ResultBox id="opt1" translation={translation}>
        {groupAuth} {title}. In: {formatedBookAuthors?.group}
        {responsibility ? `${responsibility}.` : ""}{" "}
        <strong>{booktitle}</strong>. {edition}.{" "}
        {place ? place : "[Add local de publicação]"}: {publisher}, {year}. p.{" "}
        {pages}.
      </ResultBox>
      {firstAuth && (
        <>
          <Text mt="4" mb="1" fontSize="12px" fontWeight="bold">
            {`${translation.option} 2`}
          </Text>
          {formatedBookAuthors?.firstAuth ? (
            <ResultBox id="opt2" translation={translation}>
              {firstAuth} et al. {title}. In: {formatedBookAuthors?.firstAuth}
              et al. {responsibility ? `${responsibility}.` : ""}{" "}
              <strong>{booktitle}</strong>. {edition}.{" "}
              {place ? place : "[Add local de publicação]"}: {publisher}, {year}
              . p. {pages}.
            </ResultBox>
          ) : (
            <ResultBox id="opt2" translation={translation}>
              {firstAuth} et al. {title}. In: {formatedBookAuthors?.group}{" "}
              {responsibility ? `${responsibility}.` : ""}
              <strong>{booktitle}</strong>. {edition}.{" "}
              {place ? place : "[Add local de publicação]"}: {publisher}, {year}
              . p. {pages}.
            </ResultBox>
          )}
        </>
      )}
    </>
  )
};