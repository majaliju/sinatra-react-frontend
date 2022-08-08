import { ChakraProvider } from '@chakra-ui/react'
import SongDisplay from './SongDisplay'
import Header from './Header';
import SongSearch from './SongSearch';


/* idea for this App is where people post their favorite songs
of all time and people can leave reviews on them */


function App() {
  return (
   <ChakraProvider>
    <Header />
    <SongDisplay />
   </ChakraProvider>
  );
}

export default App;
