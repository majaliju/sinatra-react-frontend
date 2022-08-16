import { ChakraProvider } from "@chakra-ui/react";
import SongsDisplay from "./SongDisplay";
import Header from "./Header";


/* people post their favorite songs 
and people leave reviews */

function App() {

  return (
    <ChakraProvider>
      <Header />
      <SongsDisplay />
    </ChakraProvider>
  );
}

export default App;
