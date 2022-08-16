import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

function UpdateSong({updateThisSong, song, artists, genres}) {
  const {isOpen, onClose, onOpen} = useDisclosure();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = data => {
    updateThisSong(song, data)
    onClose()
    reset()
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
                    UPDATE THIS SONG WITH THE RIGHT YEAR
                  </Button>
                  <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
        <form id="AddNewSongForm" 
        onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel fontSize="xl">WHAT YEAR IS IT SUPPOSED TO BE?</FormLabel>
            {/* <Input 
            id="genreName" type="text" placeholder="GENRE" {...register("genre", {required: true, max: 30, min: 1})}
            /> */}
             <Input 
            id="year" type="number" placeholder="YEAR" {...register("year", { max: 2023, min: 1000, maxLength: 4})}
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



