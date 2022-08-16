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


function AddNewReview({songID, reviews, submitNewReview}){
  const {isOpen, onClose, onOpen} = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm();

  const onSubmit = data => submitNewReview(data, songID, reviews)


  return (
    <div>
    <Button
    variant="solid"
    colorScheme="green"
    size="sm"
    w="100%"
    onClick={onOpen}
  >
    ADD REVIEW
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
            <FormLabel fontSize="xl">LEAVE A COMMENT ABOUT THE SONG</FormLabel>
            <Input 
            id="reviewComment" type="text" placeholder="Feel free to share your thoughts!" {...register("COMMENT", {required: true, max: 500, min: 10})}
            />
          </FormControl>
          <Button mt={4} colorScheme='teal' w="100%" type='submit'>
        SUBMIT
      </Button>

        </form>
          </ModalBody>
        </ModalContent>
      </Modal>
  {/* <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="COMMENT" {...register("COMMENT", {required: true, max: 500, min: 10})} />

      <input type="submit" />
    </form> */}
  

    </div>
  )
}

export default AddNewReview;