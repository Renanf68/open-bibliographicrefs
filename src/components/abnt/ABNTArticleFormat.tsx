import React from "react";
import { Text } from "@chakra-ui/react";
import { DocumentBadge } from "../DocumentBadge";
import { ResultBox } from "../ResultBox";
import { TranslationResultContainer } from "../../types";

interface ArticleProps {
  translation: TranslationResultContainer;
  groupAuth: string
  firstAuth?: string
  title: string
  journal?: string
  place?: string
  volume?: string
  number?: string
  pages?: string
  year?: string
  publisher: string
  doi: string
};

export const ABNTArticleFormat = ({
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
}: ArticleProps) => {
  // UI
  return (
    <>
      <Text mt="8" fontWeight="medium">
        {translation.associatedDocumentTypeTitle}
        <DocumentBadge label={translation.paper} />
      </Text>
      <Text mt="4" mb="1" fontSize="12px" fontWeight="bold">
        {`${translation.option} 1`}
      </Text>
      <ResultBox id="opt1" translation={translation}>
        {groupAuth} {title}. <strong>{journal}</strong>,{" "}
        {place ? place : "[s.l.]"}, v.{volume}, n.
        {number}, p.
        {pages}, {year}. {publisher}. DOI: {doi}.
      </ResultBox>
      {firstAuth && (
        <>
          <Text mt="4" mb="1" fontSize="12px" fontWeight="bold">
            {`${translation.option} 2`}
          </Text>
          <ResultBox id="opt2" translation={translation}>
            {firstAuth} et al. {title}. <strong>{journal}</strong>,{" "}
            {place ? place : "[s.l.]"}, v.{volume}, n.
            {number}, p.
            {pages}, {year}. {publisher}. DOI: {doi}.
          </ResultBox>
        </>
      )}
    </>
  )
};