import {Box, Text, Center, Input, Flex} from "@chakra-ui/react"

function SongSearch() {
  return (
    <div>
      <Flex>
        <Center>
        <Input variant='flushed' placeholder='search any song here' size='lg' />
        </Center>
      </Flex>
    </div>
  )
}

export default SongSearch;