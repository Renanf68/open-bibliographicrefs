import { Langs } from "../types"
import Select from 'react-select'

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
    boxShadow: 'none',
    cursor: 'pointer'
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
      cursor: isDisabled ? 'not-allowed' : 'pointer',
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
  );
};