import { Button } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';


function AddNewReview({songID, reviews, setReviews}){

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  // console.log(errors);


  return (
    <div>
    <Button
    variant="solid"
    colorScheme="green"
    size="sm"
    onClick={() => {
      console.log(
        "within AddReview component -- song.id: ",
        songID,
        "within AddReview component -- the reviews for the song: ",
        reviews.filter((review) => parseInt(review.song_id) === parseInt(songID))
      );
    }}
  >
    ADD REVIEW
  </Button>
  {/* <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="COMMENT" {...register("COMMENT", {required: true, max: 500, min: 10})} />

      <input type="submit" />
    </form> */}
  

    </div>
  )
}

export default AddNewReview;