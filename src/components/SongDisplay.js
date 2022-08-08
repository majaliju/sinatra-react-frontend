import React from "react";
import {Box, Text, Center} from "@chakra-ui/react"
import SongCard from './SongCard'
import SongSearch from "./SongSearch";

function SongDisplay() {
  return (
    <div>
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