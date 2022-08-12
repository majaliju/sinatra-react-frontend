import {
  Text,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode, Box
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';



function Header() {
  
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <div>
      <Box bg={useColorModeValue('white', 'dark-grey')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>BEST SONG REVIEWS</Box>
          

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={4}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

            </Stack>
          </Flex>
        </Flex>
      </Box>
    </div>
  )
}

export default Header;

