import React from "react";
import { Text } from "@chakra-ui/react";

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
      <Text as="p" fontSize="sm" mb="1rem">
        <strong>
          Tipo de documento associdado ao doi:{" "}
          <Text as="span" color="primary">
            artigo científico
          </Text>
          .
        </strong>
      </Text>
      <Text as="p" fontSize="sm">
        {groupAuth} {title}. <strong>{journal}</strong>,{" "}
        {place ? place : "[s.l.]"}, v.{volume}, n.
        {number}, p.
        {pages}, {year}. {publisher}. DOI: {doi}.
      </Text>
      {firstAuth && (
        <>
          <Text as="p" fontSize="sm" color="red.400">
            ou
          </Text>
          <Text as="p" fontSize="sm">
            {firstAuth} et al. {title}. <strong>{journal}</strong>,{" "}
            {place ? place : "[s.l.]"}, v.{volume}, n.
            {number}, p.
            {pages}, {year}. {publisher}. DOI: {doi}.
          </Text>
        </>
      )}
    </>
  )
};