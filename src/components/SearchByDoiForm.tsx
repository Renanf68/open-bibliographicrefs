import React, { useState, useEffect } from "react";
import {
  Flex,
  Icon,
  Box,
  Button,
  Spinner,
  Stack,
  Text,
  HStack,
  Center,
} from "@chakra-ui/react";
import { joinFullNameAuthors } from "../utils/utils";
import { FormMessage } from "./FormMessage";
import { FormFooter } from "./FormFooter";
import { SearchByDoiResultABNT } from "./abnt/SearchByDoiResultABNT";
import doiApi from "../services/doiapi";
import BibtexParser from "../utils/bibtexParser";
import { SearchByDoiResultAPA } from "./apa/SearchByDoiResultAPA";
import { SearchByDoiResultVanc } from "./vancouver/SearchByDoiResultVanc";
import { ExtraInputsBox } from "./SearchByDoiExtraInputsBox";
import { DOIResponse, Standard } from '../types';
import { FaPlusSquare, FaTrashAlt } from 'react-icons/fa'
import { CustomInput } from "./CustomInput";

interface SearchByDoiFormProps {
  standard: Standard;
}

const authorsObj = {
  id: Math.floor(Date.now()),
  fullName: "",
}

export const SearchByDoiForm = ({ standard }: SearchByDoiFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ status: 0, message: "" })
  const [place, setPlace] = useState("")
  const [doi, setDoi] = useState("")
  const [searchResponse, setSearchResponse] = useState({} as DOIResponse)
  const [edition, setEdition] = useState("")
  const [year, setYear] = useState("")
  const [typeDoc, setTypeDoc] = useState("")
  const [vinculation, setVinculation] = useState("")
  const [bookAuthArray, setBookAuthArray] = useState([authorsObj])
  const [responsibility, setResponsibility] = useState("")
  const [pages, setPages] = useState("")
  useEffect(() => {
    if (Object.keys(searchResponse).length > 0) {
      setSearchResponse(prevState => {
        const { Fields } = prevState
        Fields["edition"] = edition
        return { ...prevState, Fields }
      })
    }
  }, [edition])
  useEffect(() => {
    if (Object.keys(searchResponse).length > 0) {
      setSearchResponse(prevState => {
        const { Fields } = prevState
        Fields["year"] = year
        Fields["typeDoc"] = typeDoc
        Fields["vinculation"] = vinculation
        return { ...prevState, Fields }
      })
    }
  }, [year, typeDoc, vinculation])
  useEffect(() => {
    if (Object.keys(searchResponse).length > 0) {
      const newString = joinFullNameAuthors(bookAuthArray)
      setSearchResponse(prevState => {
        const { Fields } = prevState
        Fields["bookAuthors"] = newString
        return { ...prevState, Fields }
      })
    }
  }, [bookAuthArray])
  useEffect(() => {
    if (Object.keys(searchResponse).length > 0) {
      setSearchResponse(prevState => {
        const { Fields } = prevState
        Fields["responsibility"] = responsibility
        Fields["pages"] = pages
        return { ...prevState, Fields }
      })
    }
  }, [responsibility, pages])
  function searchByDoi(doi: string) {
    setSearchResponse({} as DOIResponse)
    setMessage({ status: 0, message: "" })
    if (doi) {
      setIsLoading(true)
      doiApi
        .get(`${doi}`, {
          headers: {
            Accept: "application/x-bibtex; charset=utf-8",
          },
        })
        .then(response => {
          let res = BibtexParser(response.data)
          res.entries[0].Fields.place = place
          if (
            res.entries[0].EntryType !== "article" &&
            res.entries[0].EntryType !== "phdthesis" &&
            res.entries[0].EntryType !== "masterthesis" &&
            res.entries[0].EntryType !== "book" &&
            res.entries[0].EntryType !== "incollection"
          ) {
            setIsLoading(false)
            return setMessage({
              status: 2,
              message: "Tipo de documento não suportado!",
            })
          }
          setMessage({
            status: 1,
            message: "Uma correspondência encontrada!",
          })
          console.log("resposta", res.entries[0])
          setSearchResponse(res.entries[0])
          setIsLoading(false)
        })
        .catch(error => {
          console.log(error)
          setIsLoading(false)
          setMessage({
            status: 2,
            message:
              "Desculpe, o DOI informado não obteve nenhuma correspondência, ou o servidor não pode ser acessado.",
          })
        })
    } else {
      setMessage({
        status: 2,
        message: "Favor preencher os campos obrigatórios.",
      })
    }
  }
  function addAuthor() {
    const newArray = [
      ...bookAuthArray,
      { ...authorsObj, id: Math.floor(Date.now()) },
    ]
    setBookAuthArray(newArray)
  }
  function updateAuthors(position: number, value: string) {
    const updatedAuthors = bookAuthArray.map((item, index) => {
      if (index === position) {
        return { ...item, fullName: value }
      }
      return item
    })
    setBookAuthArray(updatedAuthors)
  }
  function deleteAuthor(id: number) {
    setBookAuthArray(prevState => prevState.filter(author => author.id !== id))
  }
  return (
    <Box mt="6" w="100%">
      <Stack direction={['column', 'row']} spacing={2} >
        <CustomInput 
          id="place"
          label={'Local de publicação'}
          placeholder="Ex: São Paulo"
          value={place}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setPlace(e.currentTarget.value)
          }
        />
        <CustomInput 
          id="doi"
          label={'DOI'}
          placeholder="Ex: 10.5700/rausp1045"
          value={doi}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setDoi(e.currentTarget.value)
          }
          isRequired
        />
        <Button
          w="50%"
          h="60px"
          bg="blue.500"
          color="white"
          onClick={() => searchByDoi(doi)}
        >
          Buscar{" "}
          {isLoading && (
            <Spinner color="white" size="xs" ml="1rem" mb="-0.2rem" />
          )}
        </Button>
      </Stack>
      {message.status > 0 && (
        <FormMessage type={message.status} message={message.message} />
      )}
      {searchResponse?.EntryType === "book" && (
        <ExtraInputsBox>
          <CustomInput 
            id="edition"
            label={'Nº da edição'}
            placeholder="Ex: 4. ed."
            maxW="8rem"
            value={edition}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setEdition(e.currentTarget.value)
            }
          />
        </ExtraInputsBox>
      )}
      {(searchResponse?.EntryType === "phdthesis" ||
        searchResponse?.EntryType === "masterthesis") && (
        <ExtraInputsBox>
          <CustomInput 
            mt="4"
            id="year"
            label={'Ano'}
            placeholder="Ex: 2020"
            w="100%"
            value={year}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setYear(e.currentTarget.value)
            }
          />
          <CustomInput 
            mt="4"
            id="typeDoc"
            label={'Tipo de documento'}
            placeholder="Ex: Tese (Doutorado em Administração)"
            w="100%"
            value={typeDoc}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setTypeDoc(e.currentTarget.value)
            }
          />
          <CustomInput 
            mt="4"
            id="vinculation"
            label={'Vinculação acadêmica'}
            placeholder="Ex: Universidade Federal de Pernambuco"
            w="100%"
            value={vinculation}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setVinculation(e.currentTarget.value)
            }
          />
        </ExtraInputsBox>
      )}
      {searchResponse?.EntryType === "incollection" && (
        <ExtraInputsBox>
          <CustomInput 
            id="edition"
            label={'Nº da edição'}
            placeholder="Ex: 4. ed."
            maxW="8rem"
            value={edition}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setEdition(e.currentTarget.value)
            }
          />
          <Flex mt="4" flexDir="row" justifyContent="space-between">
            <Text>Nome completo dos autores do livro</Text>
          </Flex>
          {bookAuthArray.map((auth, index) => (
            <Flex mt="2" key={index} flexDir="row">
              <CustomInput 
                id={`auth-${index}`}
                label={`Nome autor ${index + 1}`}
                placeholder={`Digite o nome do autor ${index + 1}`}
                w={bookAuthArray.length === 1 ? '100%' : '95%'}
                value={auth.fullName}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  updateAuthors(index, e.currentTarget.value)
                }
              />
              {bookAuthArray.length > 1 && (
                <Center>
                  <Icon 
                    aria-label="Excluir Autor"
                    title="Excluir Autor"
                    _focus={{ outline: "none" }}
                    cursor="pointer"
                    as={FaTrashAlt} 
                    onClick={() => deleteAuthor(auth.id)} 
                  />
                </Center>
              )}
            </Flex>
          ))}
          <Flex mt="2">
            <Button
              w="100%"
              maxW="220px"
              aria-label="Add Autor"
              size="sm"
              variant="secondary"
              _focus={{ outline: "none" }}
              onClick={addAuthor}
            >
              Adicionar autor
            </Button>
          </Flex>
          <HStack w="100%" mt="4" spacing={4}>
            <CustomInput 
              w="100%"
              id="responsibility"
              label={'Responsabilidade'}
              placeholder="Ex: (org.) ou (orgs.)"
              value={responsibility}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setResponsibility(e.currentTarget.value)
              }
            />
            <CustomInput 
              w="100%"
              id="pages"
              label={'Págs. inicial-final'}
              placeholder="Ex: 12-32"
              value={pages}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setPages(e.currentTarget.value)
              }
            />
          </HStack>
        </ExtraInputsBox>
      )}
      {Object.keys(searchResponse).length > 0 && standard === "abnt" && (
        <SearchByDoiResultABNT data={searchResponse} />
      )}
      {Object.keys(searchResponse).length > 0 && standard === "apa" && (
        <SearchByDoiResultAPA data={searchResponse} />
      )}
      {Object.keys(searchResponse).length > 0 && standard === "vancouver" && (
        <SearchByDoiResultVanc data={searchResponse} />
      )}
      <FormFooter />
    </Box>
  );
};