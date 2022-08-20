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

function AddNewSong({submitNewSong}) {
  const {isOpen, onClose, onOpen} = useDisclosure();

  const {
    register,
    handleSubmit,
    reset
  } = useForm();

  const onSubmit = data => {
    submitNewSong(data)
    onClose()
    reset()
  }


  return (
    <div>
      <Button
        variant="solid"
        colorScheme="red"
        size="lg"
        w="100%"
        onClick={onOpen}
      >
        ADD A NEW SONG
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
        <form id="newSongForm" 
        onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel fontSize="3xl">ADD YOUR FAVORITE SONG</FormLabel>
            <Input 
            id="artistName" type="text" placeholder="ARTIST" {...register("artistName", {required: true, max: 35, min: 1, maxLength: 80})}
            />
            <Input 
            id="songName" type="text" placeholder="SONG" {...register("songName", {required: true, max: 50, min: 1, maxLength: 100})}
            />
            <Input 
            id="genreName" type="text" placeholder="GENRE" {...register("genreName", {required: true, max: 30, min: 1})}
            />
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

export default AddNewSong;
