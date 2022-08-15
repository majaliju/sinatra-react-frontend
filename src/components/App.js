import { ChakraProvider } from "@chakra-ui/react";
import SongDisplay from "./SongDisplay";
import Header from "./Header";


/* people post their favorite songs 
and people leave reviews */

function App() {

  return (
    <ChakraProvider>
      <Header />
      <SongDisplay />
    </ChakraProvider>
  );
}

export default App;
