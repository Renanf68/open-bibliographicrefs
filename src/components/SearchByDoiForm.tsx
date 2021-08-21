import React from "react";
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
import { FieldKey, Standard, TranslationToolBox } from '../types';
import { MdClose, MdSearch } from 'react-icons/md';
import { CustomInput } from "./CustomInput";
import { CustomToast } from "./CustomToast";
import { useMainContext } from "../context";

interface SearchByDoiFormProps {
  translation: TranslationToolBox;
  standard: Standard;
};

const authorsObj = {
  id: Math.floor(Date.now()),
  fullName: "",
};

type MessageType = 'success' | 'warning' | 'error'; 
interface Message {
  type: MessageType;
  message: string;
};

export const SearchByDoiForm = ({ translation, standard }: SearchByDoiFormProps) => {
  // context
  const { searchResponse, searchResponseDispatch } = useMainContext();
  const { 
    doi, 
    place, 
    edition, 
    year, 
    typeDoc, 
    vinculation, 
    responsibility, 
    pages  
  } = searchResponse.Fields;
  // state
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState<Message>();
  const [bookAuthArray, setBookAuthArray] = React.useState([authorsObj]);
  const toast = useToast();
  // handlers
  const searchByDoi = (doi: string) => {
    searchResponseDispatch({type: 'clear_state'});
    setMessage(undefined);
    if (doi) {
      setIsLoading(true);
      doiApi
        .get(`${doi}`, {
          headers: {
            Accept: "application/x-bibtex; charset=utf-8",
          },
        })
        .then(response => {
          let res = BibtexParser(response.data);
          res.entries[0].Fields.place = place;
          if (
            res.entries[0].EntryType !== "article" &&
            res.entries[0].EntryType !== "phdthesis" &&
            res.entries[0].EntryType !== "masterthesis" &&
            res.entries[0].EntryType !== "book" &&
            res.entries[0].EntryType !== "incollection"
          ) {
            setIsLoading(false);
            return setMessage({
              type: 'error',
              message: translation.messages.documentTypeNotSupported,
            });
          };
          setMessage({
            type: 'success',
            message: translation.messages.success,
          });
          searchResponseDispatch({type: 'update_state', payload: res.entries[0]});
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error)
          setIsLoading(false)
          setMessage({
            type: 'warning',
            message: translation.messages.documentNotFound
          });
        });
    } else {
      setMessage({
        type: 'error',
        message: translation.messages.requiredFields
      });
    };
  };
  const addAuthor = () => {
    const newArray = [
      ...bookAuthArray,
      { ...authorsObj, id: Math.floor(Date.now()) },
    ];
    setBookAuthArray(newArray);
  };
  const updateAuthors = (position: number, value: string) => {
    const updatedAuthors = bookAuthArray.map((item, index) => {
      if (index === position) {
        return { ...item, fullName: value }
      };
      return item;
    });
    setBookAuthArray(updatedAuthors);
  };
  const deleteAuthor = (id: number) => {
    setBookAuthArray(prevState => prevState.filter(author => author.id !== id));
  };
  const handleFieldChange = (key: FieldKey, value: string) => {
    searchResponseDispatch({type: 'update_fields', payload: { key, value }});
  };
  // side effects
  React.useEffect(() => {
    const newString = joinFullNameAuthors(bookAuthArray)
    searchResponseDispatch({
      type: 'update_fields', 
      payload: { key: 'bookAuthors', value: newString }
    })
  }, [bookAuthArray, searchResponseDispatch]);
  React.useEffect(() => {
    if(message) {
      toast({
        id: message.message,
        duration: 8000,
        // eslint-disable-next-line react/display-name
        render: () => (
          <CustomToast
            type={message.type}
            message={message.message}
          />
        ),
      });
    }
  }, [message, toast]);
  //UI
  return (
    <>
      <Box mt="6" w="100%">
        <Stack direction={{ base: 'column', md: 'row'}} spacing={2} >
          <CustomInput 
            id="place"
            label={translation.publiPlace}
            placeholder={`${translation.exampleInitials}: São Paulo`}
            value={place ?? ''}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              handleFieldChange('place', e.currentTarget.value)
            }
          />
          <CustomInput 
            id="doi"
            label={'DOI'}
            placeholder={`${translation.exampleInitials}: 10.5700/rausp1045`}
            value={doi ?? ''}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              handleFieldChange('doi', e.currentTarget.value)
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
                handleFieldChange('edition', e.currentTarget.value)
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
                handleFieldChange('year', e.currentTarget.value)
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
                handleFieldChange('typeDoc', e.currentTarget.value)
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
                handleFieldChange('vinculation', e.currentTarget.value)
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
                handleFieldChange('edition', e.currentTarget.value)
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
                  handleFieldChange('responsibility', e.currentTarget.value)
                }
              />
              <CustomInput 
                w="100%"
                id="pages"
                label={translation.pages}
                placeholder={`${translation.exampleInitials}: 12-32`}
                value={pages}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleFieldChange('pages', e.currentTarget.value)
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