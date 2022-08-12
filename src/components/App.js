import { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import SongDisplay from "./SongDisplay";
import Header from "./Header";


/* idea for this App is where people post their favorite songs
of all time and people can leave reviews on them */

function App() {

    
  const [songs, setSongs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState("");

  // initializing our seeded Songs
  useEffect(() => {
    fetch("http://localhost:9292/songs")
      .then((r) => r.json())
      .then((songsInfo) => setSongs(songsInfo));
  }, []);

  // initializing our seeded Artists
  useEffect(() => {
    fetch("http://localhost:9292/artists")
      .then((r) => r.json())
      .then((artistsInfo) => setArtists(artistsInfo));
  }, []);

  // initializing our seeded Genres
  useEffect(() => {
    fetch("http://localhost:9292/genres")
      .then((r) => r.json())
      .then((genreInfo) => setGenres(genreInfo));
  }, []);

  // initializing our seeded Reviews
  useEffect(() => {
    fetch("http://localhost:9292/reviews")
      .then((r) => r.json())
      .then((reviewInfo) => setReviews(reviewInfo));
  }, []);
 



  return (
    <ChakraProvider>
      <Header 
       search={search}
       setSearch={setSearch}
       songs={songs}
       setSongs={setSongs}
       reviews={reviews}
       setReviews={setReviews}
       artists={artists}
       setArtists={setArtists}
       genres={genres}
       setGenres={setGenres}/>
      <SongDisplay />
    </ChakraProvider>
  );
}

export default App;
