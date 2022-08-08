import { ChakraProvider } from '@chakra-ui/react'
import Home from './Home'


/* idea for this App is where people post their favorite songs
of all time and people can leave reviews on them */


function App() {
  return (
   <ChakraProvider>
    <Home />
   </ChakraProvider>
  );
}

export default App;
