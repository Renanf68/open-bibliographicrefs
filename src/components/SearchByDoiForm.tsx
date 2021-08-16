import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Icon,
  Box,
  Button,
  Spinner,
  Stack,
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
            message: "Uma correnspondência encontrada!",
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
    <Box w="100%">
      <Stack mt="4" direction={['column', 'row']} spacing={2} >
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
          <FormControl w="100%" mt="1rem">
            <FormLabel htmlFor="edition">
              Nº da edição{" "}
              <Icon
                name="question"
                size="0.8rem"
                fontWeight="bold"
                mb="0.5rem"
              />
            </FormLabel>
            <Input
              id="edition"
              placeholder="Ex: 4. ed."
              maxW="8rem"
              value={edition}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setEdition(e.currentTarget.value)
              }
            />
          </FormControl>
        </ExtraInputsBox>
      )}
      {(searchResponse?.EntryType === "phdthesis" ||
        searchResponse?.EntryType === "masterthesis") && (
        <ExtraInputsBox>
          <FormControl display="flex" flexDir="column">
            <FormControl w="100%" maxW="6rem" mt="1rem">
              <FormLabel htmlFor="year">
                Ano{" "}
                <Icon
                  name="question"
                  size="0.8rem"
                  fontWeight="bold"
                  mb="0.5rem"
                />
              </FormLabel>
              <Input
                id="year"
                placeholder="Ex: 2020"
                w="100%"
                value={year}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setYear(e.currentTarget.value)
                }
              />
            </FormControl>
            <FormControl w="100%" mt="1rem" ml={["0", "0.2rem"]}>
              <FormLabel htmlFor="typeDoc">
                Tipo de documento{" "}
                <Icon
                  name="question"
                  size="0.8rem"
                  fontWeight="bold"
                  mb="0.5rem"
                />
              </FormLabel>
              <Input
                id="typeDoc"
                placeholder="Ex: Tese (Doutorado em Administração)"
                w="100%"
                value={typeDoc}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setTypeDoc(e.currentTarget.value)
                }
              />
            </FormControl>
            <FormControl w="100%" mt="1rem" ml={["0", "0.2rem"]}>
              <FormLabel htmlFor="vinculation">
                Vinculação acadêmica{" "}
                <Icon
                  name="question"
                  size="0.8rem"
                  fontWeight="bold"
                  mb="0.5rem"
                />
              </FormLabel>
              <Input
                id="vinculation"
                placeholder="Ex: Universidade Federal de Pernambuco"
                w="100%"
                value={vinculation}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setVinculation(e.currentTarget.value)
                }
              />
            </FormControl>
          </FormControl>
        </ExtraInputsBox>
      )}
      {searchResponse?.EntryType === "incollection" && (
        <ExtraInputsBox>
          <FormControl w="100%" mt="1rem">
            <FormLabel htmlFor="edition">
              Nº da edição{" "}
              <Icon
                name="question"
                size="0.8rem"
                fontWeight="bold"
                mb="0.5rem"
              />
            </FormLabel>
            <Input
              id="edition"
              placeholder="Ex: 4. ed."
              maxW="8rem"
              value={edition}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setEdition(e.currentTarget.value)
              }
            />
          </FormControl>
          <FormControl w="100%" mt="1rem" ml={["0", "0.2rem"]} isRequired>
            <Box display="flex" flexDir="row" justifyContent="space-between">
              <FormLabel htmlFor="authName">
                Nome completo dos autores do livro
              </FormLabel>
              <Box>
                <Button
                  variantColor="outline"
                  aria-label="Add Autor"
                  title="Add Autor"
                  size="lg"
                  color="primary"
                  w="auto"
                  height="auto"
                  _focus={{ outline: "none" }}
                  onClick={addAuthor}
                >
                  <Icon as={FaPlusSquare} />
                </Button>
              </Box>
            </Box>
            {bookAuthArray.map((auth, index) => (
              <Box key={index} display="flex" flexDir="row">
                <Input
                  id={`auth-${index}`}
                  placeholder={`Nome autor ${index + 1}`}
                  w="95%"
                  value={auth.fullName}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    updateAuthors(index, e.currentTarget.value)
                  }
                />
                {bookAuthArray.length > 1 && (
                  <Button
                    variantColor="outline"
                    aria-label="Excluir Autor"
                    title="Excluir Autor"
                    size="md"
                    color="primary"
                    w="5%"
                    height="auto"
                    _focus={{ outline: "none" }}
                    onClick={() => deleteAuthor(auth.id)}
                  >
                    <Icon as={FaTrashAlt} />
                  </Button>
                )}
              </Box>
            ))}
          </FormControl>
          <Box display="flex" flexDir={["column", "row"]}>
            <FormControl w={["100%", "auto"]} mt="1rem">
              <FormLabel htmlFor="responsibility">
                Responsabilidade{" "}
                <Icon
                  name="question"
                  size="0.8rem"
                  fontWeight="bold"
                  mb="0.5rem"
                />
              </FormLabel>
              <Input
                id="responsibility"
                placeholder="Ex: (org.) ou (orgs.)"
                maxW={["", "12rem"]}
                value={responsibility}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setResponsibility(e.currentTarget.value)
                }
              />
            </FormControl>
            <FormControl
              w={["100%", "auto"]}
              mt="1rem"
              ml={["", "0.2rem"]}
              isRequired
            >
              <FormLabel htmlFor="pages">Págs. inicial-final</FormLabel>
              <Input
                id="pages"
                placeholder="Ex: 12-32"
                maxW={["", "10rem"]}
                value={pages}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setPages(e.currentTarget.value)
                }
              />
            </FormControl>
          </Box>
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