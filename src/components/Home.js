import React from "react";
import {Box, Text, Center} from "@chakra-ui/react"
import SongCard from './SongCard'

function Home() {
  return (
    <div>
    <Box>
      <Center>
      <Text>
        THIS IS THE HOME PAGE!
      </Text>
      </Center>
    </Box>
    <Box>
      <Center>
        <Text>
          HERE IS THE SECOND ELEMENT
        </Text>
        <SongCard />
      </Center>
    </Box>
    </div>
  )
}

export default Home;