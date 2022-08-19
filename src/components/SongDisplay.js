import { Box, Flex, Button, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import AddNewReview from "./AddNewReview";
import AddNewSong from "./AddNewSong";
import UpdateSong from "./UpdateSong";

/* CURRENT OBJECTIVES */

// FIX README for front & back
// check for duplicates on the backend (artist, genre)
// some extra styling
// ISSUE OF PAGE NOT RELOADING WHEN NEW SONG OR WHEN GENRE IS UPDATED
// CLEANING UP THE MULTIPLE STATES
//      using the promise.all method (??) to clean up the setting of 4 states

// deploy to netlify and heroku
// record a video and all that

function SongsDisplay() {
  const [songs, setSongs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenre] = useState([]);
  const [reload, setReload] = useState({})

  // initializing our seeded Songs
  useEffect(() => {
    fetch("http://localhost:9292/songs")
      .then((r) => r.json())
      .then((songsInfo) => setSongs(songsInfo));
  }, []);

  console.log("full songs map: ", songs);

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

  // submits a new song via the ADD NEW SONG button
  function submitNewSong({ songName, year, artistName, genreName }) {
    fetch(`http://localhost:9292/songs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: songName,
        year: year,
        artist: {
          name: artistName,
        },
        genre: {
          name: genreName,
        },
      }),
    })
      .then((r) => r.json())
      .then((newSong) => setSongs([...songs, newSong]))
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

  function updateThisSong(song, {genre}) {
    fetch(`http://localhost:9292/songs/${song.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        genre: {
          name: genre,
        },
      }),
    })
      .then((r) => r.json())
      .then((fixedSong) => {
        const correctedSongs = songs.map((thisSong)=> {
          if (parseInt(thisSong.id) === parseInt(song.id)) {
            return {...thisSong, fixedSong}
          }
          return thisSong
        });
        setSongs(correctedSongs)
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

   /* BOTH OF THE updateReview FUNCTIONS CAN BE OPTIMIZED INTO A SINGLE SOURCE
  THAT SEPARATES BASED OFF IF DISLIKE BUTTON OR LIKE BUTTON */
  // ask about this ^

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
  //   function updateReview(each) {
  //     fetch(`http://localhost:9292/reviews/${each.id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //       body: JSON.stringify({
  //         category: each.category + 1,
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
                <Box
                  mt="1"
                  fontWeight="thin"
                  fontSize="2xl"
                  as="h1"
                  lineHeight="tight"
                  noOfLines={2}
                >
                  {song.artist.name.toUpperCase()}
                </Box>
                <Box
                  mt="1"
                  fontWeight="thin"
                  fontSize="xl"
                  as="h1"
                  lineHeight="tight"
                  noOfLines={2}
                >
                  {song.genre.name.toUpperCase()}
                </Box>
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
                <UpdateSong updateThisSong={updateThisSong} song={song} />

                {/* DELETE THIS SONG button */}
                <Button
                  variant="solid"
                  colorScheme="orange"
                  size="sm"
                  w="100%"
                  onClick={() => {deleteSong(song)}}
                >
                  DELETE THIS SONG (WHY DID I CREATE THIS BUTTON??)
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Flex>
      <Box as='i' id="songStats" fontFamily="Helvetica" fontWeight="thin">
        {/* DISPLAYING THE AGGREGATED LISTS OF ARTISTS, GENRES, AND SONGS*/}
        <Box maxW="lg" borderWidth="2px" borderRadius="lg" overflow="hidden">
          <Text fontWeight="normal" fontSize="3xl">
            SONG LIST
          </Text>
          {songs.map((song) => (
            <Text key={song.id}>{song.name.toUpperCase()}</Text>
          ))}
        </Box>
        <Box maxW="lg" borderWidth="2px" borderRadius="lg" overflow="hidden">
          <Text fontWeight="normal" fontSize="3xl">
            ARTIST LIST
          </Text>
          {artists.map((artist) => (
            <Text key={artist.id}>{artist.name.toUpperCase()}</Text>
          ))}
        </Box>
        <Box maxW="lg" borderWidth="2px" borderRadius="lg" overflow="hidden">
          <Text fontWeight="normal" fontSize="3xl">
            GENRE LIST
          </Text>
          {genres.map((genre) => (
            <Text key={genre.id}>{genre.name.toUpperCase()}</Text>
          ))}
        </Box>
      </Box>
    </Flex>
  );
}

export default SongsDisplay;
