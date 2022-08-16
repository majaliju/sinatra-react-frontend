import { Box, Flex, Button, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

/* CURRENT OBJECTIVES */

// FIXING THE LIKES / DISLIKES BUTTONS
// (I) fix the PATCH fetch (onClick -> updateReview)
//    (Ia) separate them each for the likes & dislikes buttons
// CREATE THE TWO FORMS
// (II) create a form that opens on ADD A SONG button
//     (IIa) create the function that POSTS that info to the backend
// (III) create a form that opens on ADD REVIEW button
//     (IIIa) create the function that POSTS that info to the backend
// CLEANING UP THE MULTIPLE STATES
// (IV) using the promise.all method (??) to clean up the setting of 4 states

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

  // updates the likes or dislikes on the review hash
  // gotta fix the syntax here bc it's very sloppy
  // the endpoint itself works with diff IDs but the fetch itself doesn't
  function updateReview(each) {
    fetch(`http://localhost:9292/reviews/:${each.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        likes: each.likes + 1,
        dislikes: each.dislikes + 1,
      }),
    })
      .then((r) => console.log("response: ", r))
      .then((r) => r.json())
      .then((reviewInfo) => console.log("within updateReview:  ", reviewInfo))
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <Box>
        {/* DISPLAYING THE SONG CARDS AND THEIR RESPECTIVE REVIEW */}
        <Button
          variant="solid"
          colorScheme="red"
          size="lg"
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
            >
              <Box p="2">
                <Box
                  mt="1"
                  fontWeight="bold"
                  as="h1"
                  lineHeight="tight"
                  noOfLines={2}
                >
                  {song.name.toUpperCase()}
                </Box>

                <Box
                  mt="1"
                  fontWeight="normal"
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

                <Box
                  mt="1"
                  fontWeight="thin"
                  as="h1"
                  lineHeight="tight"
                  noOfLines={2}
                >
                  {/* {console.log("the genre.name should be: ", (genres.find((genre) => genre.id == song.genre_id)).name)} */}
                  {genres
                    .find(
                      (genre) => parseInt(genre.id) === parseInt(song.genre_id)
                    )
                    .name.toUpperCase()}
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
                                console.log("onClick - song.id = ", song.id);
                                console.log(
                                  "onClick - each.song_id = ",
                                  each.song_id
                                );
                                console.log("onClick - each.id = ", each.id);
                                console.log("onClick - each =", each);
                                updateReview(each);
                                console.log(
                                  "onClick - after pass to updateReview(each); each =",
                                  each
                                );
                              }}
                            >
                              {each.likes} LIKES
                            </Button>
                            <Button
                              variant="solid"
                              colorScheme="red"
                              size="sm"
                              onClick={() => {
                                console.log("DISLIKES - each: ", each);
                              }}
                            >
                              {each.dislikes} DISLIKES
                            </Button>
                          </Flex>
                        </Flex>
                      ))}
                  </Stack>
                </Flex>
                <Button
                  variant="solid"
                  colorScheme="green"
                  size="sm"
                  onClick={() => {
                    console.log(
                      "within AddReview button -- song.id: ",
                      song.id
                    );
                  }}
                >
                  ADD REVIEW
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box>
        {/* DISPLAYING THE AGGREGATED LISTS OF ARTISTS, GENRES, AND SONGS*/}
        <Box maxW="lg" borderWidth="2px" borderRadius="lg" overflow="hidden">
          <Text fontWeight="bold" fontSize="30px">
            SONGS LIST
          </Text>
          {songs.map((song) => (
            <Text key={song.id}>{song.name}</Text>
          ))}
        </Box>
        <Box maxW="lg" borderWidth="2px" borderRadius="lg" overflow="hidden">
          <Text fontWeight="bold" fontSize="30px">
            ARTISTS LIST
          </Text>
          {artists.map((artist) => (
            <Text key={artist.id}>{artist.name}</Text>
          ))}
        </Box>
        <Box maxW="lg" borderWidth="2px" borderRadius="lg" overflow="hidden">
          <Text fontWeight="bold" fontSize="30px">
            GENRES LIST
          </Text>
          {genres.map((genre) => (
            <Text key={genre.id}>{genre.name}</Text>
          ))}
        </Box>
      </Box>
    </div>
  );
}

export default SongDisplay;

/*

// THE FOCUS POPOVER I'M GOING TO USE FOR THE REVIEW BUTTON & THE SONG BUTTONS INDIVIDUALLY 
// https://v0.chakra-ui.com/popover

// import  FocusLock from "react-focus-lock"

// 1. Create a text input component
const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

// 2. Create the form
const Form = ({ firstFieldRef, onCancel }) => {
  return (
    <Stack spacing={4}>
      <TextInput
        label="First name"
        id="first-name"
        ref={firstFieldRef}
        defaultValue="John"
      />
      <TextInput label="Last name" id="last-name" defaultValue="Smith" />
      <ButtonGroup d="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button isDisabled variantColor="teal">
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

// 3. Create the Popover
// Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
const PopoverForm = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const firstFieldRef = React.useRef(null);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return (
    <>
      <Box d="inline-block" mr={3}>
        John Smith
      </Box>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={open}
        onClose={close}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton size="sm" icon="edit" />
        </PopoverTrigger>
        <PopoverContent zIndex={4} p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow bg="white" />
            <PopoverCloseButton />
            <Form firstFieldRef={firstFieldRef} onCancel={close} />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

render(<PopoverForm />);


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
