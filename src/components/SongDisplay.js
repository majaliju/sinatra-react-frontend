import { Box, Image, Badge, Center, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import SongSearch from "./SongSearch";

/* NOT THE IDEAL BUT A LITTLE SKETCH OF HOW THE SONGS AND REVIEWS SHOULD THEMSELVES POP UP FOR DISPLAY */

function SongDisplay() {
  // create map functions for the individual songs and show reviews for each
  // get GenreName and ArtistName methods, and Review class details from Song so I can map everything in one clean function

  // console.log("songs :", songs)
  // console.log("artists :", artists)

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

              <Box
                mt="1"
                fontWeight="thin"
                as="h4"
                lineHeight="tight"
                noOfLines={2}
              >
                {console.log("within that box, artist's name: ", artists.name)}
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
