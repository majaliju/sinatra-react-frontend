import { ChakraProvider } from '@chakra-ui/react'
import Home from './Home'


// the idea for this App is where people leave reviews
// for the greatest songs of all time contest
// where people can enter their favorites


function App() {
  return (
   <ChakraProvider>
    <Home />
   </ChakraProvider>
  );
}

export default App;
