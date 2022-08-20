import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

function UpdateSong({updateThisSong, song}) {
  const {isOpen, onClose, onOpen} = useDisclosure();
  const { register, handleSubmit, reset} = useForm();

  const onSubmit = data => {
    updateThisSong(song, data)
    onClose()
    reset() // wipe the data whenever it's submitted
  }
  
  return (
    <div>
       <Button
                    variant="solid"
                    colorScheme="purple"
                    size="sm"
                    w="100%"
                    margin="2px"
                    onClick={onOpen}
                  >
                    UPDATE THIS SONG WITH THE RIGHT GENRE
                  </Button>
                  <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
        <form id="updateSongForm" 
        onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel fontSize="xl">WHAT'S THE RIGHT GENRE THEN?</FormLabel>
            <Input focusBorderColor='lime'
            id="genreName" type="text" placeholder="GENRE" {...register("genre", {required: true, max: 30, min: 1})}
            />
          </FormControl>
        
          <Button mt={4} colorScheme='pink' w="100%" type='submit'>
        SUBMIT
      </Button>

        </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>

    
  );
}

export default UpdateSong



