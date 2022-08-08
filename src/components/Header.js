import { ReactNode } from 'react';
import {
  Flex,
  Link,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode, Box
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';



function Header() {
  
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <div>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>SONG RANKINGS</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
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

