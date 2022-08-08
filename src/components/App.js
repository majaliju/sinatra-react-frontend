import { ChakraProvider } from '@chakra-ui/react'
import SongDisplay from './SongDisplay'



/* idea for this App is where people post their favorite songs
of all time and people can leave reviews on them */


function App() {
  return (
   <ChakraProvider>
    <Header />
    <Home />
    <SongSearch />
   </ChakraProvider>
  );
}

export default App;
