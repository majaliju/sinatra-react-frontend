import { Button } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

function AddNewSong() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <div>
       <Button
            variant="solid"
            colorScheme="red"
            size="lg"
            onClick={() => {
              console.log("within AddNewSong!")
              
            }}
          >
            ADD A NEW SONG
          </Button>
          

        {/* going to wrap this form within a modal */}
{/*         
      <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="ARTIST/BAND " {...register("ARTIST/BAND ", {required: true, max: 30, min: 1})} />
      <input type="text" placeholder="SONG NAME" {...register("SONG NAME", {required: true, max: 50, min: 1, maxLength: 100})} />
      <input type="text" placeholder="GENRE" {...register("GENRE", {required: true, max: 30, min: 1})} />

      <input type="submit" />
    </form> */}
    </div>

    
  );
}

export default AddNewSong