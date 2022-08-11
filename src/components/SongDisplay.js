import { Box, Image, Badge, Center, Flex } from "@chakra-ui/react";

/* NOT THE IDEAL BUT A LITTLE SKETCH OF HOW THE SONGS AND REVIEWS SHOULD THEMSELVES POP UP FOR DISPLAY */

function SongDisplay({ songs, artists, genres }) {
  // create map functions for the individual songs and show reviews for each
  // get GenreName and ArtistName methods, and Review class details from Song so I can map everything in one clean function

  console.log("songs :", songs);

  return (
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

            {(() => {
              if (song.artist_id === artists.id) {
                return (
                  <Box
                    mt="1"
                    fontWeight="thin"
                    as="h4"
                    lineHeight="tight"
                    noOfLines={2}
                  >
                    {artists.name}
                  </Box>
                );
              }

              return "NOT FOUND";
            })()}

            {/* <Box
              mt="1"
              fontWeight="thin"
              as="h4"
              lineHeight="tight"
              noOfLines={2}
            > {artists.id}
            </Box> */}

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
  );
}

export default SongDisplay;
