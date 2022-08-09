import { Box, Image, Badge } from '@chakra-ui/react'

/* NOT THE IDEAL BUT A LITTLE SKETCH OF HOW THE SONGS AND REVIEWS SHOULD THEMSELVES POP UP FOR DISPLAY */


/* THE PROPERTY PROP SHOULD BE THE SONG PROP WITH PROPER VALUES INSTEAD */
function SongCard({songs, setSongs, reviews, setReviews}) {

  // create map functions for the reviews -- one card per review
    

  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' bgColor = 'beige'>

      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='6' colorScheme='blue'>
            LIKE
          </Badge>
          <Badge borderRadius='full' px='5' colorScheme='red'>
            DISLIKE
          </Badge>
        </Box>

        <Box
          mt='1'
          fontWeight='extrabold'
          as='h4'
          lineHeight='tight'
          noOfLines={2}
          bgColor = 'gold'
        >
        </Box>
        <Box
          mt='1'
          fontWeight='extrabold'
          as='h4'
          lineHeight='tight'
          noOfLines={2}
          bgColor = 'gold'
        >
          SONG NAME
        </Box>
        <Box
          mt='1'
          fontWeight='extrabold'
          as='h4'
          lineHeight='tight'
          noOfLines={2}
          bgColor = 'gold'
        >
          GENRE
        </Box>
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
             {reviews}
          </Box>
      </Box>
    </Box>
  )
}

export default SongCard;