import { extendTheme } from '@chakra-ui/react';
import '@fontsource/open-sans';
import '@fontsource/catamaran/900.css';

const theme = extendTheme({
  fonts: {
    heading: `Catamaran, sans-serif`,
    body: `'Open Sans', sans-serif`
  }
});

export default theme;
