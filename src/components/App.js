import { ChakraProvider } from '@chakra-ui/react';
import SongsDisplay from './SongDisplay';
import Header from './Header';

function App() {
  return (
    <ChakraProvider>
      <Header />
      <SongsDisplay />
    </ChakraProvider>
  );
}

export default App;
