import { Button } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

function AddNewReview({songID, reviews, setReviews}){
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

    </div>
  )
}

export default AddNewReview;