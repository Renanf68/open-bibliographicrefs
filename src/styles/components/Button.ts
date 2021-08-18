export const Button = {
  // The styles all button have in common
  baseStyle: {
    height: '40px',
    fontFamily: 'Work S',
    fontWeight: 'medium',
    fontSize: 'sm',
    borderRadius: 'lg',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  },
  // Variants
  variants: {
    solid: {
      'bg': 'purple.600',
      'color': 'white',
      ':hover': {
        bg: 'purple.200',
        color: 'purple.600',
        borderColor: 'purple.600',
      },
      ':disabled': {
        bg: 'gray.700',
        borderColor: 'gray.700',
        color: 'white',
      },
    },
    outline: {
      'bg': 'white',
      'borderColor': 'black',
      ':hover': {
        color: 'gray.700',
        borderColor: 'gray.700',
      },
      ':disabled': {
        color: 'gray.500',
        borderColor: 'gray.500',
      },
    },
    dangerLight: {
      'bg': 'white',
      'color': 'red',
      'borderColor': 'red',
      ':hover': {
        color: 'gray.700',
        borderColor: 'gray.700',
      },
      ':disabled': {
        color: 'gray.500',
        borderColor: 'gray.500',
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    variant: 'solid',
  },
};
