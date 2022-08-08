import React from "react";
import {Box, Text, Center} from "@chakra-ui/react"
import SongCard from './SongCard'

function SongDisplay() {
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
        <SongCard />
      </Center>
    </Box>
    <Box>
      <Center>
        <SongSearch />
      </Center>
    </Box>
    </div>
  )
}

export default SongDisplay;