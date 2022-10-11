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
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

function UpdateSong({ updateThisSong, song }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    updateThisSong(song, data);
    onClose();
    reset(); // wipe the data whenever it's submitted
  };

  //^ TODO: potentially change form to controlled form
  //^ set state outside of the fetch; need the state to trigger a re-render like it does when review is updated/added/deleted
  // something here involving the modal is what's disabling that set-state re-rendering
  // update does update but it doesn't do it until a page reload happens; which isn't what we want

  return (
    <div>
      <Button
        variant='solid'
        colorScheme='purple'
        size='sm'
        w='100%'
        margin='2px'
        onClick={onOpen}>
        UPDATE THIS SONG WITH THE RIGHT GENRE
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <form id='updateSongForm' onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel fontSize='xl'>
                  WHAT'S THE RIGHT GENRE THEN?
                </FormLabel>
                <Input
                  focusBorderColor='lime'
                  id='genreName'
                  type='text'
                  placeholder='GENRE'
                  {...register('genre', { required: true, max: 30, min: 1 })}
                />
              </FormControl>

              <Button mt={4} colorScheme='pink' w='100%' type='submit'>
                SUBMIT
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default UpdateSong;
