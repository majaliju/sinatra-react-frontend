import { Button } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

function UpdateSong({song, setSongs}) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  // console.log(errors);
  
  return (
    <div>
       <Button
                    variant="solid"
                    colorScheme="purple"
                    size="sm"
                    w="100%"
                    margin="2px"
                    onClick={() => console.log("song.id for song year: ", song.id)}
                  >
                    UPDATE THIS SONG'S INFO
                  </Button>
    </div>

    
  );
}

export default UpdateSong



