import { Box, Flex, Button, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import AddNewReview from "./AddNewReview";
import AddNewSong from "./AddNewSong";
import UpdateSong from "./UpdateSong";

/* CURRENT OBJECTIVES */

// CREATE THE TWO FORMS
// (I) create a form that opens on ADD A SONG button
//     (Ia) create the function that POSTS that info to the backend
//      (Ib) create the backend workaround that handles this
// CLEANING UP THE MULTIPLE STATES
// (IV) using the promise.all method (??) to clean up the setting of 4 states

function SongsDisplay() {
  const [songs, setSongs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenre] = useState([]);

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

  /* BOTH OF THE updateReview FUNCTIONS CAN BE OPTIMIZED INTO A SINGLE SOURCE
  THAT SEPARATES BASED OFF IF DISLIKE BUTTON OR LIKE BUTTON */

  // submits a new song via the ADD NEW SONG button
  function submitNewSong(data) {
    fetch(`http://localhost:9292/songs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: data.songName,
        year: data.year,
        // bottom two aren't actually keys 
        artist: data.artistName,
        genre: data.genreName
      }),
    })
      .then((r) => r.json())
      .then((thisSong) => setSongs([...songs, thisSong]));
  }

  // deletes our selected song via DELETE THIS SONG button
  function deleteSong(song) {
    fetch(`http://localhost:9292/songs/${song.id}`, {
      method: "DELETE",
    });
    const remainingSongs = songs.filter(
      (eachSong) => parseInt(eachSong.id) !== parseInt(song.id)
    );
    setSongs(remainingSongs);
  }

  function updateThisSong(song, data) {
    fetch(`http://localhost:9292/songs/${song.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        year: data.year,
      }),
    })
      .then((r) => r.json())
      .then((data) => { 
        const correctedYear = songs.map((thisSong) => {
          if (parseInt(thisSong.id) === parseInt(song.id)){
            return {...thisSong, year: data.year}
          }
          return thisSong
        })
        setSongs(correctedYear)
})}

  function submitNewReview(data, songID) {
    fetch(`http://localhost:9292/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        comment: data.comment,
        song_id: songID,
      }),
    })
      .then((r) => r.json())
      .then((info) => setReviews([...reviews, info]));
  }

  // updates the likes per click on LIKE button
  function updateReviewLikes(each) {
    fetch(`http://localhost:9292/reviews/${each.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        likes: each.likes + 1,
      }),
    })
      .then((r) => r.json())
      .then((reviewInfo) => {
        const updatedReview = reviews.map((singleReview) => {
          if (parseInt(singleReview.id) === parseInt(reviewInfo.id)) {
            return { ...singleReview, likes: reviewInfo.likes };
          }
          return singleReview;
        });
        setReviews(updatedReview);
      })
      .catch((err) => console.error(err));
  }

  // updates the dislikes per click on DISLIKE button
  function updateReviewDislikes(each) {
    fetch(`http://localhost:9292/reviews/${each.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        dislikes: each.dislikes + 1,
      }),
    })
      .then((r) => r.json())
      .then((reviewInfo) => {
        const updatedReview = reviews.map((singleReview) => {
          if (parseInt(singleReview.id) === parseInt(reviewInfo.id)) {
            return { ...singleReview, dislikes: reviewInfo.dislikes };
          }
          return singleReview;
        });
        setReviews(updatedReview);
      })
      .catch((err) => console.error(err));
  }

  // // need to create an optimal single function that separates
  // // the category based on if category = likes or = dislikes
  //   function updateReview(each, category="likes") {
  //     fetch(`http://localhost:9292/reviews/${each.id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //       body: JSON.stringify({
  //         dislikes: each.category + 1,
  //       }),
  //     })
  //       .then((r) => r.json())
  //       .then((reviewInfo) => {
  //         const updatedReview = reviews.map((singleReview) => {
  //           if (parseInt(singleReview.id) === parseInt(reviewInfo.id)) {
  //             return { ...singleReview, category: reviewInfo.category };
  //           }
  //           return singleReview;
  //         });
  //         setReviews(updatedReview);
  //       })
  //       .catch((err) => console.error(err));
  //   }

  return (
    <Flex>
      <Flex id="songDisplayBody">
        {/* DISPLAYING THE SONG CARDS AND THEIR RESPECTIVE REVIEWS */}
        <Box>
          <AddNewSong submitNewSong={submitNewSong} />
          {songs.map((song) => (
            <Box
              key={song.id}
              maxW="xl"
              borderWidth="2px"
              borderRadius="lg"
              overflow="hidden"
              fontFamily="Helvetica"
            >
              <Box p="2">
                {/* displays song's name */}
                <Box
                  mt="1"
                  fontWeight="thin"
                  fontSize="3xl"
                  as="h1"
                  lineHeight="tight"
                  noOfLines={2}
                >
                  {song.name.toUpperCase()}
                </Box>

                {/* displays song's artist */}
                <Box
                  mt="1"
                  fontWeight="thin"
                  fontSize="2xl"
                  as="h1"
                  lineHeight="tight"
                  noOfLines={2}
                >
                  {artists
                    .find(
                      (artist) =>
                        parseInt(artist.id) === parseInt(song.artist_id)
                    )
                    .name.toUpperCase()}
                </Box>

                {/* displays song's genre */}
                <Box
                  mt="1"
                  fontWeight="thin"
                  fontSize="xl"
                  as="h1"
                  lineHeight="tight"
                  noOfLines={2}
                >
                  {genres
                    .find(
                      (genre) => parseInt(genre.id) === parseInt(song.genre_id)
                    )
                    .name.toUpperCase()}
                </Box>

                {/* displays song's year */}
                <Box
                  mt="1"
                  fontWeight="thin"
                  fontSize="lg"
                  as="h1"
                  lineHeight="tight"
                  noOfLines={2}
                >
                  {song.year}
                </Box>

                <Flex
                  w="full"
                  bg="#edf3f8"
                  _dark={{
                    bg: "#3e3e3e",
                  }}
                  p={1}
                  alignItems="center"
                  justifyContent="center"
                >
                  {/* displays the reviews for each song*/}
                  <Stack
                    direction={{
                      base: "column",
                    }}
                    w="full"
                    shadow="2xl"
                  >
                    {reviews
                      .filter(
                        (review) =>
                          parseInt(review.song_id) === parseInt(song.id)
                      )
                      .map((each) => (
                        <Flex
                          direction={{
                            base: "row",
                            md: "column",
                          }}
                          bg="beige"
                          key={each.id}
                        >
                          <SimpleGrid
                            spacingY={3}
                            columns={{
                              base: 1,
                              md: 1,
                            }}
                            w={{
                              base: 120,
                              md: "full",
                            }}
                            bg="beige"
                            color="black"
                            py={{
                              base: 1,
                              md: 4,
                            }}
                            px={{
                              base: 2,
                              md: 2,
                            }}
                            fontSize="md"
                            fontWeight="normal"
                            fontFamily="Helvetica"
                          >
                            <span>{each.comment}</span>
                          </SimpleGrid>
                          <Flex
                            justify={{
                              md: "end",
                            }}
                          >
                            <Button
                              variant="solid"
                              colorScheme="blue"
                              size="sm"
                              onClick={() => {
                                updateReviewLikes(each);
                              }}
                            >
                              {each.likes} LIKES
                            </Button>
                            <Button
                              variant="solid"
                              colorScheme="red"
                              size="sm"
                              onClick={() => {
                                updateReviewDislikes(each);
                              }}
                            >
                              {each.dislikes} DISLIKES
                            </Button>
                          </Flex>
                        </Flex>
                      ))}
                  </Stack>
                </Flex>
                <AddNewReview
                  submitNewReview={submitNewReview}
                  songID={song.id}
                  reviews={reviews}
                />
                <UpdateSong
                  updateThisSong={updateThisSong}
                  song={song}
                  artists={artists}
                  genres={genres}
                />

                {/* DELETE THIS SONG button */}
                <Button
                  variant="solid"
                  colorScheme="orange"
                  size="sm"
                  w="100%"
                  onClick={() => {
                    console.log(
                      "within DeleteSong button -- song.id: ",
                      song.id
                    );
                    deleteSong(song);
                  }}
                >
                  DELETE THIS SONG (WHY DID I CREATE THIS BUTTON??)
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Flex>
      <Box id="songStats" fontFamily="Helvetica" fontWeight="thin">
        {/* DISPLAYING THE AGGREGATED LISTS OF ARTISTS, GENRES, AND SONGS*/}
        <Box maxW="lg" borderWidth="2px" borderRadius="lg" overflow="hidden">
          <Text fontWeight="normal" fontSize="3xl">
            SONGS LIST
          </Text>
          {songs.map((song) => (
            <Text key={song.id}>{song.name}</Text>
          ))}
        </Box>
        <Box maxW="lg" borderWidth="2px" borderRadius="lg" overflow="hidden">
          <Text fontWeight="normal" fontSize="3xl">
            ARTISTS LIST
          </Text>
          {artists.map((artist) => (
            <Text key={artist.id}>{artist.name}</Text>
          ))}
        </Box>
        <Box maxW="lg" borderWidth="2px" borderRadius="lg" overflow="hidden">
          <Text fontWeight="normal" fontSize="3xl">
            GENRES LIST
          </Text>
          {genres.map((genre) => (
            <Text key={genre.id}>{genre.name}</Text>
          ))}
        </Box>
      </Box>
    </Flex>
  );
}

export default SongsDisplay;
