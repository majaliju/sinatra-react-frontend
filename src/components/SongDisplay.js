import { Box, Image, Badge, Center, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import SongSearch from "./SongSearch";

function SongDisplay() {
  
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

  console.log("reviews info: ", reviews)
  console.log("reviews.likes :", reviews.map((review) => review.likes))



  // gotta create a button on each card that itself shows reviews, with their likes and dislikes

  // gotta add room to write reviews on each card as well -- and a clean way to display the reviews as well
  
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
                {(artists.find((artist) => parseInt(artist.id) === parseInt(song.artist_id))).name}
              </Box>

              <Box
                mt="1"
                fontWeight="thin"
                as="h4"
                lineHeight="tight"
                noOfLines={2}
              >
                {/* {console.log("the genre.name should be: ", (genres.find((genre) => genre.id == song.genre_id)).name)} */}
                {(genres.find((genre) => parseInt(genre.id) === parseInt(song.genre_id))).name}
              </Box>
              
              <Box
                mt="1"
                fontWeight="thin"
                as="h4"
                lineHeight="tight"
                noOfLines={2}
              > 
                {console.log("reviews filter: ", (reviews.filter((review) => parseInt(review.song_id) === parseInt(song.id))))}
                {(reviews.filter((review) => parseInt(review.song_id) === parseInt(song.id))).map((each) => 
                <Text>
                  {each.comment}
                </Text>)}
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



// this was the box that contains LIKES and DISLIKES counter
/*
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                <Box display="flex" alignItems="baseline">
                  <Badge
                    borderRadius="full"
                    fontWeight="normal"
                    px="5"
                    colorScheme="blue"
                  > LIKES
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

              */