import React from "react";
import { Text } from "@chakra-ui/react";
import { DocumentBadge } from "../DocumentBadge";
import { ResultBox } from "../ResultBox";

interface ArticleProps {
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
  return (
    <>
      <Text mt="8" fontWeight="medium">
        Tipo de documento associado ao DOI:
        <DocumentBadge label={'Artigo científico'} />
      </Text>
      <Text mt="4" mb="1" fontSize="12px" fontWeight="bold">Opção 1</Text>
      <ResultBox>
        <Text as="p" fontSize="sm">
          {groupAuth} {title}. <strong>{journal}</strong>,{" "}
          {place ? place : "[s.l.]"}, v.{volume}, n.
          {number}, p.
          {pages}, {year}. {publisher}. DOI: {doi}.
        </Text>
      </ResultBox>
      {firstAuth && (
        <>
          <Text mt="4" mb="1" fontSize="12px" fontWeight="bold">Opção 2</Text>
          <ResultBox>
            <Text as="p" fontSize="sm">
              {firstAuth} et al. {title}. <strong>{journal}</strong>,{" "}
              {place ? place : "[s.l.]"}, v.{volume}, n.
              {number}, p.
              {pages}, {year}. {publisher}. DOI: {doi}.
            </Text>
          </ResultBox>
        </>
      )}
    </>
  )
};