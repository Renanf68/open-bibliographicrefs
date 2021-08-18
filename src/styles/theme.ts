import { extendTheme } from "@chakra-ui/react"
import { Button } from './components/Button'

const customTheme = extendTheme({
  fonts: {
    body: "Work Sans, system-ui, sans-serif",
    heading: "Work Sans, system-ui, sans-serif",
    mono: "Menlo, monospace",
  },
  fontSize: {
    sm: '16px',
    md: '24px',
    lg: '45px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  lineHeight: {
    sm: '18,77px',
    md: '22px',
    lg: '35,19px'
  },
  radii: {
    sm: "6px",
    md: "8px",
    lg: "10px",
  },
  colors: {
    gray: {
      200: "#FBFBFB",
    },
    purple: {
      200: "#F6F5FF",
      600: "#6261CE",
    }
  },
  components: {
    Button,
  }
});

export default customTheme