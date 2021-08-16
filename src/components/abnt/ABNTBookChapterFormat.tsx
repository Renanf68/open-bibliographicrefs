import React from "react"
import { Text } from "@chakra-ui/react"

interface ChapterProps {
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
  groupAuth,
  firstAuth,
  title,
  booktitle,
  place,
  year,
  publisher,
  doi,
  edition,
  formatedBookAuthors,
  responsibility,
  pages,
}: ChapterProps) => {
  return (
    <>
      <Text as="p" fontSize="sm" mb="1rem">
        <strong>
          Tipo de documento associdado ao doi:{" "}
          <Text as="span" color="primary">
            capítulo de livro
          </Text>
          .
        </strong>
      </Text>
      <Text as="p" fontSize="sm">
        {groupAuth} {title}. In: {formatedBookAuthors?.group}
        {responsibility ? `${responsibility}.` : ""}{" "}
        <strong>{booktitle}</strong>. {edition}.{" "}
        {place ? place : "[Add local de publicação]"}: {publisher}, {year}. p.{" "}
        {pages}.
      </Text>
      {firstAuth && (
        <>
          <Text as="p" fontSize="sm" color="red.400">
            ou
          </Text>
          {formatedBookAuthors?.firstAuth ? (
            <Text as="p" fontSize="sm">
              {firstAuth} et al. {title}. In: {formatedBookAuthors?.firstAuth}
              et al. {responsibility ? `${responsibility}.` : ""}{" "}
              <strong>{booktitle}</strong>. {edition}.{" "}
              {place ? place : "[Add local de publicação]"}: {publisher}, {year}
              . p. {pages}.
            </Text>
          ) : (
            <Text as="p" fontSize="sm">
              {firstAuth} et al. {title}. In: {formatedBookAuthors?.group}{" "}
              {responsibility ? `${responsibility}.` : ""}
              <strong>{booktitle}</strong>. {edition}.{" "}
              {place ? place : "[Add local de publicação]"}: {publisher}, {year}
              . p. {pages}.
            </Text>
          )}
        </>
      )}
    </>
  )
};