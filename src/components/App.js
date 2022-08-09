import { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import SongDisplay from "./SongDisplay";
import Header from "./Header";
import SongSearch from "./SongSearch";

/* idea for this App is where people post their favorite songs
of all time and people can leave reviews on them */

function App() {
  const [songs, setSongs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");

  // initializing our seeded Songs
  useEffect(() => {
    fetch("http://localhost:9292/songs")
      .then((r) => r.json())
      .then((initSongs) => setSongs(initSongs));
  }, []);

  // initializing our seeded Reviews
  useEffect(() => {
    fetch("http://localhost:9292/reviews")
      .then((r) => r.json())
      .then((initReviews) => setReviews(initReviews));
  }, []);

  // gotta optimize the layout and where state lives

  return (
    <ChakraProvider>
      <Header />
      <SongDisplay
        songs={songs}
        setSongs={setSongs}
        reviews={reviews}
        setReviews={setReviews}
      />
      <SongSearch
        search={search}
        setSearch={setSearch}
        songs={songs}
        setSongs={setSongs}
        reviews={reviews}
        setReviews={setReviews}
      />
    </ChakraProvider>
  );
}

export default App;
