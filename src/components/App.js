import {useState, useEffect} from "react";
import { ChakraProvider } from '@chakra-ui/react'
import SongDisplay from './SongDisplay'
import Header from './Header';
import SongSearch from './SongSearch';


/* idea for this App is where people post their favorite songs
of all time and people can leave reviews on them */


function App() {

  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");


  // the initSongs render properly
  useEffect(() => {
    fetch("http://localhost:9292/songs")
      .then((r) => r.json())
      .then((initSongs) => setSongs(initSongs));
  }, []);


  return (
   <ChakraProvider>
    <Header />
    <SongDisplay />
   </ChakraProvider>
  );
}

export default App;
