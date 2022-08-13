import {
  Box,
  Flex,
  Button,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

function SongDisplay() {
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

  // // // handles button submissions
  // const handleNewReviewSubmit = (e) => {
  //   // e.preventDefault();
  //   console.log("the review submit works!")
  //   // console.log("song = ", song)
  //   // console.log("updateReview() details: ", updateReview())
  // }

  // updates the likes or dislikes
  // gotta fix the syntax here bc it's very sloppy
  function updateReview (id){
    fetch(`http://localhost:9292/reviews/:${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify(id),
    })
    .then((r) => r.json())
    .then((reviewInfo) => console.log("reviewInfo here in the fetch: ", reviewInfo))
  }

  
  // const handleNewSongSubmit = (e) => {
  //   e.preventDefault();
  //   // should open a form that allows the user to input certain pieces of information
  //   submitNewSong()
  // }

  // function submitNewSong(){
  //   console.log("ok it works so that's good!")
  // }




 // (I) create a form that opens on ADD A SONG button
 //     (Ia) create the function that POSTS that info to the backend
  // (II) create a form that opens on ADD REVIEW button
 //     (IIa) create the function that POSTS that info to the backend


  return (
    <div>
      <Box>
        <Button variant="solid" colorScheme="yellow" size="lg" 
        // onClick={handleNewSongSubmit}
        >
          ADD A NEW SONG
        </Button>
        <Box>
          {songs.map((song) => (
            <Box
              key={song.id}
              maxW="lg"
              borderWidth="2px"
              borderRadius="lg"
              overflow="hidden"
              //       bg="#edf3f8"
              // _dark={{
              //   bg: "#3e3e3e",
              // }}
            >
              <Box p="2">
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
                  {
                    artists.find(
                      (artist) =>
                        parseInt(artist.id) === parseInt(song.artist_id)
                    ).name
                  }
                </Box>

                <Box
                  mt="1"
                  fontWeight="thin"
                  as="h4"
                  lineHeight="tight"
                  noOfLines={2}
                >
                  {/* {console.log("the genre.name should be: ", (genres.find((genre) => genre.id == song.genre_id)).name)} */}
                  {
                    genres.find(
                      (genre) => parseInt(genre.id) === parseInt(song.genre_id)
                    ).name
                  }
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
                            fontSize="sm"
                            fontWeight="thin"
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
                                console.log("song = ", song.id)
                                console.log("song_id= ", each.song_id)
                                updateReview(each.song_id)
                                console.log("updateReview(each.song_id) ", each.song_id)
                
                                }}>
                            
                              {each.likes} LIKES
                            </Button>
                            <Button variant="solid" colorScheme="red" size="sm" 
                            onClick={() => {
                              console.log("song = ", song.id)
                              console.log("song_id= ", each.song_id)
                              updateReview(each.song_id)
                              console.log("updateReview(each.song_id) ", each.song_id)
              
                              }}>
                            
                              {each.dislikes} DISLIKES
                            </Button>
                          </Flex>
                        </Flex>
                      ))}
                  </Stack>
                </Flex>
                <Button variant="solid" colorScheme="green" size="sm"
                onClick={() => {
                console.log("song.id = ", song.id)
                }}>
                  ADD REVIEW
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
}

export default SongDisplay;

// safe Review output -- each comment per line

/*
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
                  </Text>
  
*/

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

//  https://choc-ui.com/docs/lists/tables
// this is the table I'm going to use for the Reviews table

/*

() => {
  const data = [
    {
      name: "Segun Adebayo",
      email: "sage@chakra.com",
    },
    {
      name: "Josef Nikolas",
      email: "Josef@mail.com",
    },
    {
      name: "Lazar Nikolov",
      email: "Lazar@mail.com",
    },
    {
      name: "Abraham",
      email: "abraham@anu.com",
    },
  ];
  const dataColor = useColorModeValue("white", "gray.800");
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("gray.100", "gray.700");
  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{
        bg: "#3e3e3e",
      }}
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        direction={{
          base: "column",
        }}
        w="full"
        bg={{
          md: bg,
        }}
        shadow="lg"
      >
        {data.map((person, pid) => {
          return (
            <Flex
              direction={{
                base: "row",
                md: "column",
              }}
              bg={dataColor}
              key={pid}
            >
              <SimpleGrid
                spacingY={3}
                columns={{
                  base: 1,
                  md: 3,
                }}
                w={{
                  base: 120,
                  md: "full",
                }}
                textTransform="uppercase"
                bg={bg2}
                color={"gray.500"}
                py={{
                  base: 1,
                  md: 4,
                }}
                px={{
                  base: 2,
                  md: 10,
                }}
                fontSize="md"
                fontWeight="hairline"
              >
                <span>Name</span>
                <span>Email</span>
                <chakra.span
                  textAlign={{
                    md: "right",
                  }}
                >
                  Actions
                </chakra.span>
              </SimpleGrid>
              <SimpleGrid
                spacingY={3}
                columns={{
                  base: 1,
                  md: 3,
                }}
                w="full"
                py={2}
                px={10}
                fontWeight="hairline"
              >
                <span>{person.name}</span>
                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {person.email}
                </chakra.span>
                <Flex
                  justify={{
                    md: "end",
                  }}
                >
                  <Button variant="solid" colorScheme="red" size="sm">
                    Delete
                  </Button>
                </Flex>
              </SimpleGrid>
            </Flex>
          );
        })}
      </Stack>
    </Flex>
  );
};

*/
