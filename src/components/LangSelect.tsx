import { Langs } from "../types"
import Select from 'react-select'
import { ChangeEvent } from "react";

const options = [
  { value: 'en', label: 'EN' },
  { value: 'es', label: 'ES' },
  { value: 'pt-br', label: 'PT' }
]

const customStyles = {
  control: (styles) => ({ 
    ...styles, 
    border: 'none', 
    backgroundColor: 'none', 
    fontSize: '16px',
    color: '#6261CE',
    boxShadow: 'none'
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isFocused
        ? '#F6F5FF'
        : null,
      color: '#6261CE',
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
        backgroundColor: 'red',
      },
    };
  },
  dropdownIndicator: styles => ({
    ...styles,
    color: "#6261CE",
    ':hover' : {
      color: "#6261CE",
    }
  }),
  indicatorSeparator: styles => ({ display: 'none'}),
  input: styles => ({ ...styles, color: '#6261CE', border: 'none' }),
  placeholder: styles => ({ display: 'none' }),
  singleValue: styles => ({
    ...styles,
    fontWeight: '500',
    color: '#6261CE'
  })
};
interface LangSelectProps {
  selected: Langs;
  onChange(selected: Langs): void;
}

export const LangSelect = ({ selected, onChange }: LangSelectProps) => {
  return (
    <Select 
      options={options} 
      styles={customStyles} 
      value={selected} 
      onChange={onChange} 
      isSearchable={false}
    />
  )
}

/*export const LangSelect2 = ({lang, ...props}: LangSelectProps) => {
  return (
    <Select 
    px="1"
    border="none"
    color="purple.600"
    fontSize="sm" 
    outline="none"
    _activeLink={{color: 'purple.600', bg: 'purple.200'}}
    _active={{border: 'none'}}
    _focus={{border: 'none'}}
    cursor="pointer"
    value={lang}
    
    {...props} 
    >
        <option value="en">EN</option>
        <option value="es">ES</option>
        <option value="pt-br">PT</option>
    </Select>
  )
}*/