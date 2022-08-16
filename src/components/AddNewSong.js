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

function AddNewSong() {
  const {isOpen, onClose, onOpen} = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm();

  const onSubmit = (e => {
    console.log("it works!")
    console.log("artist-name :", e.target.artistName.value)
    console.log("artist-name :", e.target.songName.value)
    console.log("artist-name :", e.target.genreName.value)
  })

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
        <form id="AddNewSongForm" 
        onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <Input 
            id="artistName" type="text" placeholder="ARTIST/BAND " {...register("ARTIST/BAND ", {required: true, max: 30, min: 1})}
            />
            <Input 
            id="songName" type="text" placeholder="SONG NAME" {...register("SONG NAME", {required: true, max: 50, min: 1, maxLength: 100})}
            />
            <Input 
            id="genreName" type="text" placeholder="GENRE" {...register("GENRE", {required: true, max: 30, min: 1})}
            />
          </FormControl>
          <Button mt={4} colorScheme='teal' w="100%" type='submit'>
        SUBMIT
      </Button>

        </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* going to wrap this form within a modal */}
              
      {/* <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="ARTIST/BAND " {...register("ARTIST/BAND ", {required: true, max: 30, min: 1})} />
      <input type="text" placeholder="SONG NAME" {...register("SONG NAME", {required: true, max: 50, min: 1, maxLength: 100})} />
      <input type="text" placeholder="GENRE" {...register("GENRE", {required: true, max: 30, min: 1})} />

      <input type="submit" />
    </form> */}
    </div>
  );
}

export default AddNewSong;
