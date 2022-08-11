import { Box, Image, Badge, Center, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import SongSearch from "./SongSearch";


function SongDisplay() {
  
  // my question here is: how to get the appropriate artists.name and genres.name for each song that has the matching songs.artist_id and songs.genre_id respectively?

  const [songs, setSongs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenre] = useState([]);
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
      .then((genreInfo) => setGenre(genreInfo));
  }, []);

  // initializing our seeded Reviews
  useEffect(() => {
    fetch("http://localhost:9292/reviews")
      .then((r) => r.json())
      .then((reviewInfo) => setReviews(reviewInfo));
  }, []);

  // console.log("songs artist_id", songs.map(song => song.artist_id))
  // console.log("artists IDs :", artists.map(artist => artist.id))


   const matchArr = artists.find(() => artists.id === songs.artist_id) 
   // this version only renders Marvin Gaye (the first :name for each one)

   
 

  console.log("matchArr.name :", matchArr.name)

  return (
    <div>
      <Box>
        {songs.map((song) => (
          <Box
            key={song.id}
            maxW="lg"
            borderWidth="2px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Box p="3">
              <Box
                mt="1"
                fontWeight="thin"
                as="h4"
                lineHeight="tight"
                noOfLines={2}
              >
                {song.name.toUpperCase()}
              </Box>

              <Box mt="1" fontWeight="thin" as="h4" lineHeight="tight" noOfLines={2}
              > 
              {matchArr.name}
              </Box>

              <Box
                mt="1"
                fontWeight="thin"
                as="h4"
                lineHeight="tight"
                noOfLines={2}
              >
                GENRE
              </Box>
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                <Box display="flex" alignItems="baseline">
                  <Badge
                    borderRadius="full"
                    fontWeight="normal"
                    px="5"
                    colorScheme="blue"
                  >
                    LIKE
                  </Badge>
                  <Badge
                    borderRadius="full"
                    fontWeight="normal"
                    px="5"
                    colorScheme="red"
                  >
                    DISLIKE
                  </Badge>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <SongSearch
        search={search}
        setSearch={setSearch}
        songs={songs}
        setSongs={setSongs}
        reviews={reviews}
        setReviews={setReviews}
      />
    </div>
  );
}

export default SongDisplay;
