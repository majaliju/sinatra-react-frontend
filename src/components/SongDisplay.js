import { Box, Image, Badge, Center } from "@chakra-ui/react";

/* NOT THE IDEAL BUT A LITTLE SKETCH OF HOW THE SONGS AND REVIEWS SHOULD THEMSELVES POP UP FOR DISPLAY */

function SongDisplay({ songs, setSongs, reviews, setReviews }) {
  // create map functions for the individual songs and show reviews for each
  // get GenreName and ArtistName methods, and Review class details from Song so I can map everything in one clean function


  return (
    <div>
      {songs.map((song) => (
        <Box key = {song.id} maxW="sm" borderWidth="2px" borderRadius="lg" overflow="hidden">
          <Box p="5">
            <Box
              mt="1"
              fontWeight="thin"
              as="h4"
              lineHeight="tight"
              noOfLines={2}
            >
              {song.name}
            </Box>
            <Box
              mt="1"
              fontWeight="thin"
              as="h4"
              lineHeight="tight"
              noOfLines={2}
            >
              ARTIST NAME
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
    </div>
  );
}

export default SongDisplay;
