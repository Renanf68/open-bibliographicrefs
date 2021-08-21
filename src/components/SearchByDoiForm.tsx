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
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { joinFullNameAuthors } from "../utils/utils";
import { FormFooter } from "./FormFooter";
import doiApi from "../services/doiapi";
import BibtexParser from "../utils/bibtexParser";
import { ExtraInputsBox } from "./SearchByDoiExtraInputsBox";
import { DOIResponse, Standard, TranslationToolBox } from '../types';
import { MdClose, MdSearch } from 'react-icons/md'
import { CustomInput } from "./CustomInput";
import { CustomToast } from "./CustomToast";
import { useMainContext } from "../context";

interface SearchByDoiFormProps {
  translation: TranslationToolBox;
  standard: Standard;
}

const authorsObj = {
  id: Math.floor(Date.now()),
  fullName: "",
}

type MessageType = 'success' | 'warning' | 'error'; 
interface Message {
  type: MessageType;
  message: string;
}

export const SearchByDoiForm = ({ translation, standard }: SearchByDoiFormProps) => {
  // context
  const { searchResponse, setSearchResponse } = useMainContext();
  // state
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<Message>();
  const [place, setPlace] = useState("")
  const [doi, setDoi] = useState("")
  const [edition, setEdition] = useState("")
  const [year, setYear] = useState("")
  const [typeDoc, setTypeDoc] = useState("")
  const [vinculation, setVinculation] = useState("")
  const [bookAuthArray, setBookAuthArray] = useState([authorsObj])
  const [responsibility, setResponsibility] = useState("")
  const [pages, setPages] = useState("")
  const toast = useToast();
  // handlers
  const searchByDoi = (doi: string) => {
    setSearchResponse({} as DOIResponse)
    setMessage(undefined)
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
              type: 'error',
              message: translation.messages.documentTypeNotSupported,
            })
          }
          setMessage({
            type: 'success',
            message: translation.messages.success,
          })
          //console.log("resposta", res.entries[0])
          setSearchResponse(res.entries[0])
          setIsLoading(false)
        })
        .catch(error => {
          console.log(error)
          setIsLoading(false)
          setMessage({
            type: 'warning',
            message: translation.messages.documentNotFound
          })
        })
    } else {
      setMessage({
        type: 'error',
        message: translation.messages.requiredFields
      })
    }
  }
  const addAuthor = () => {
    const newArray = [
      ...bookAuthArray,
      { ...authorsObj, id: Math.floor(Date.now()) },
    ]
    setBookAuthArray(newArray)
  }
  const updateAuthors = (position: number, value: string) => {
    const updatedAuthors = bookAuthArray.map((item, index) => {
      if (index === position) {
        return { ...item, fullName: value }
      }
      return item
    })
    setBookAuthArray(updatedAuthors)
  }
  const deleteAuthor = (id: number) => {
    setBookAuthArray(prevState => prevState.filter(author => author.id !== id))
  }
  // side effects
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
  useEffect(() => {
    if(message) {
      toast({
        id: message.message,
        duration: 8000,
        render: () => (
          <CustomToast
            type={message.type}
            message={message.message}
          />
        ),
      });
    }
  }, [message])
  //UI
  return (
    <>
      <Box mt="6" w="100%">
        <Stack direction={{ base: 'column', lg: 'row'}} spacing={2} >
          <CustomInput 
            id="place"
            label={translation.publiPlace}
            placeholder={`${translation.exampleInitials}: São Paulo`}
            value={place}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPlace(e.currentTarget.value)
            }
          />
          <CustomInput 
            id="doi"
            label={'DOI'}
            placeholder={`${translation.exampleInitials}: 10.5700/rausp1045`}
            value={doi}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setDoi(e.currentTarget.value)
            }
            isRequired
          />
          <Button
            mt={{ base: '0', md: '16px !important'}}
            w="50%"
            outline='none'
            fontSize="sm"
            _focus={{outline: 'none'}}
            onClick={() => searchByDoi(doi)}
          >
            {`${translation.buttonLabel} `}
            {isLoading ? (
              <Spinner color="white" size="xs" ml="1rem" mb="-0.2rem" />
              ) : (
              <Icon pl="2" as={MdSearch} w="28px" h="28px" />
            )}
          </Button>
        </Stack>
        {searchResponse?.EntryType === "book" && (
          <ExtraInputsBox title={translation.extraInputsBoxTitle}>
            <CustomInput 
              id="edition"
              label={translation.editionNumber}
              placeholder={`${translation.exampleInitials}: 4. ed.`}
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
          <ExtraInputsBox title={translation.extraInputsBoxTitle}>
            <CustomInput 
              mt="4"
              id="year"
              label={translation.year}
              placeholder={`${translation.exampleInitials}: 2020`}
              w={{base: '100%', md: '200px'}}
              value={year}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setYear(e.currentTarget.value)
              }
            />
            <CustomInput 
              mt="4"
              id="typeDoc"
              label={translation.documentType}
              placeholder={`${translation.exampleInitials}: Tese (Doutorado em Administração)`}
              w="100%"
              value={typeDoc}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setTypeDoc(e.currentTarget.value)
              }
            />
            <CustomInput 
              mt="4"
              id="vinculation"
              label={translation.academicAffiliation}
              placeholder={`${translation.exampleInitials}: Universidade Federal de Pernambuco`}
              w="100%"
              value={vinculation}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setVinculation(e.currentTarget.value)
              }
            />
          </ExtraInputsBox>
        )}
        {searchResponse?.EntryType === "incollection" && (
          <ExtraInputsBox title={translation.extraInputsBoxTitle}>
            <CustomInput 
              id="edition"
              label={translation.editionNumber}
              placeholder={`${translation.exampleInitials}: 4. ed.`}
              maxW="8rem"
              value={edition}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setEdition(e.currentTarget.value)
              }
            />
            <Flex mt="6" flexDir="row" justifyContent="space-between">
              <Text fontWeight="medium">{translation.authorsFullName}</Text>
            </Flex>
            {bookAuthArray.map((auth, index) => (
              <Flex key={index} flexDir="row">
                <CustomInput 
                  mt={index > 0 ? '1' : '0'}
                  id={`auth-${index}`}
                  label={`${translation.eachAuthorName} ${index + 1}`}
                  placeholder={translation.authorFullNamePlaceholder}
                  w={bookAuthArray.length === 1 ? '100%' : '98%'}
                  value={auth.fullName}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    updateAuthors(index, e.currentTarget.value)
                  }
                />
                {bookAuthArray.length > 1 && (
                  <Center pt="4">
                    <Tooltip 
                      fontSize="xs"
                      label={translation.removeAuthorLabel} 
                      aria-label={translation.removeAuthorLabel}
                      placement="top"
                    >
                      <Box>
                        <Icon 
                          _focus={{ outline: "none" }}
                          cursor="pointer"
                          color="purple.600"
                          fontSize="xl"
                          as={MdClose} 
                          onClick={() => deleteAuthor(auth.id)} 
                        />
                      </Box>
                    </Tooltip>
                  </Center>
                )}
              </Flex>
            ))}
            <Flex mt="4">
              <Button
                w="100%"
                maxW="220px"
                aria-label={translation.AddAuthorButtonLabel}
                size="sm"
                variant="outline"
                _focus={{ outline: "none" }}
                onClick={addAuthor}
              >
                {translation.AddAuthorButtonLabel}
              </Button>
            </Flex>
            <HStack w="100%" mt="2" spacing={4}>
              <CustomInput 
                w="100%"
                id="responsibility"
                label={translation.org}
                placeholder={`${translation.exampleInitials}: (org.) ou (orgs.)`}
                value={responsibility}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setResponsibility(e.currentTarget.value)
                }
              />
              <CustomInput 
                w="100%"
                id="pages"
                label={translation.pages}
                placeholder={`${translation.exampleInitials}: 12-32`}
                value={pages}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setPages(e.currentTarget.value)
                }
              />
            </HStack>
          </ExtraInputsBox>
        )}
        <FormFooter translation={translation}/>
      </Box>
    </>
  );
};