import {
  Box,
  Flex,
  Button,
  SimpleGrid,
  Stack,
  Text,
  Input,
  Grid,
  Container,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import AddNewReview from './AddNewReview';
import AddNewSong from './AddNewSong';
import UpdateSong from './UpdateSong';

//& TODO
//& change the plaintext within SongList, ArtistList, GenreList into buttons that display only those options once clicked
//& also have a an ALL button that shows all naturally

function SongsDisplay() {
  const [songs, setSongs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenre] = useState([]);

  const [search, setSearch] = useState('');

  // initializing our seeded Songs
  useEffect(() => {
    fetch('https://best-music-reviews-backend.herokuapp.com/songs')
      .then((r) => r.json())
      .then((songsInfo) => setSongs(songsInfo));
  }, []);

  // initializing our seeded Artists
  useEffect(() => {
    fetch('https://best-music-reviews-backend.herokuapp.com/artists')
      .then((r) => r.json())
      .then((artistsInfo) => setArtists(artistsInfo));
  }, []);

  // initializing our seeded Genres
  useEffect(() => {
    fetch('https://best-music-reviews-backend.herokuapp.com/genres')
      .then((r) => r.json())
      .then((genreInfo) => setGenre(genreInfo));
  }, []);

  // initializing our seeded Reviews
  useEffect(() => {
    fetch('https://best-music-reviews-backend.herokuapp.com/reviews')
      .then((r) => r.json())
      .then((reviewInfo) => setReviews(reviewInfo));
  }, []);

  // submits a new song via the ADD NEW SONG button
  function submitNewSong({ songName, year, artistName, genreName }) {
    fetch(`https://best-music-reviews-backend.herokuapp.com/songs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        name: songName,
        year: year,
        artist: {
          name: artistName,
        },
        genre: {
          name: genreName,
        },
      }),
    })
      .then((r) => r.json())
      .then((newSong) => setSongs([...songs, newSong]));
  }

  // deletes our selected song via DELETE THIS SONG button
  function deleteSong(song) {
    fetch(`https://best-music-reviews-backend.herokuapp.com/songs/${song.id}`, {
      method: 'DELETE',
    });
    const remainingSongs = songs.filter(
      (eachSong) => parseInt(eachSong.id) !== parseInt(song.id)
    );
    setSongs(remainingSongs);
  }

  // updates the genre for the song
  function updateThisSong(song, { genre }) {
    fetch(`https://best-music-reviews-backend.herokuapp.com/songs/${song.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        genre: {
          name: genre,
        },
      }),
    })
      .then((r) => r.json())
      .then((fixedSong) => {
        const correctedSongs = songs.map((thisSong) => {
          if (parseInt(thisSong.id) === parseInt(fixedSong.id)) {
            return fixedSong;
          }
          return thisSong;
        });
        setSongs(correctedSongs);
      });
  }

  // submits a new comment/review for a given song
  function submitNewReview(data, songID) {
    fetch(`https://best-music-reviews-backend.herokuapp.com/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        comment: data.comment,
        song_id: songID,
      }),
    })
      .then((r) => r.json())
      .then((info) => setReviews([...reviews, info]));
  }

  // updates the likes per click on LIKE button
  function updateReviewLikes(each) {
    fetch(
      `https://best-music-reviews-backend.herokuapp.com/reviews/${each.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          likes: each.likes + 1,
        }),
      }
    )
      .then((r) => r.json())
      .then((reviewInfo) => {
        const updatedReview = reviews.map((singleReview) => {
          if (parseInt(singleReview.id) === parseInt(reviewInfo.id)) {
            return { ...singleReview, likes: reviewInfo.likes };
          }
          return singleReview;
        });
        setReviews(updatedReview);
      })
      .catch((err) => console.error(err));
  }

  // updates the dislikes per click on DISLIKE button
  function updateReviewDislikes(each) {
    fetch(
      `https://best-music-reviews-backend.herokuapp.com/reviews/${each.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          dislikes: each.dislikes + 1,
        }),
      }
    )
      .then((r) => r.json())
      .then((reviewInfo) => {
        const updatedReview = reviews.map((singleReview) => {
          if (parseInt(singleReview.id) === parseInt(reviewInfo.id)) {
            return { ...singleReview, dislikes: reviewInfo.dislikes };
          }
          return singleReview;
        });
        setReviews(updatedReview);
      })
      .catch((err) => console.error(err));
  }

  // wipes search term clean; to reset the slate on each reload
  useEffect(() => {
    setSearch('');
  }, []);

  return (
    <Flex>
      <Box id='songDisplayBody'>
        <Box>
          <AddNewSong submitNewSong={submitNewSong} />
          <Button
            variant='solid'
            colorScheme='blue'
            size='lg'
            w='100%'
            onClick={() => setSearch('')}>
            SHOW ALL
          </Button>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Type in any artist name or genre name!'
            size='lg'
          />
          {songs
            .filter((song) => {
              if (search === '') {
                return song;
              } else if (
                song.artist.name.toLowerCase().includes(search.toLowerCase()) ||
                song.genre.name.toLowerCase().includes(search.toLowerCase()) ||
                song.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return song;
              }
            })
            .map((song) => (
              <Box
                key={song.id}
                maxW='xl'
                borderWidth='2px'
                borderRadius='lg'
                overflow='hidden'
                fontFamily='Helvetica'>
                <Box p='2'>
                  <Box
                    mt='1'
                    fontWeight='thin'
                    fontSize='3xl'
                    as='h2'
                    lineHeight='tight'
                    noOfLines={2}>
                    {song.name.toUpperCase()}
                  </Box>
                  <Box
                    mt='1'
                    fontWeight='thin'
                    fontSize='2xl'
                    as='h1'
                    lineHeight='tight'
                    noOfLines={2}>
                    {song.artist.name.toUpperCase()}
                  </Box>
                  <Box
                    mt='1'
                    fontWeight='thin'
                    fontSize='xl'
                    as='h1'
                    lineHeight='tight'
                    noOfLines={2}>
                    {song.genre.name.toUpperCase()}
                  </Box>
                  <Box
                    mt='1'
                    fontWeight='thin'
                    fontSize='lg'
                    as='h1'
                    lineHeight='tight'
                    noOfLines={2}>
                    {song.year}
                  </Box>

                  <Flex
                    w='full'
                    bg='#edf3f8'
                    _dark={{
                      bg: '#3e3e3e',
                    }}
                    p={1}
                    alignItems='center'
                    justifyContent='center'>
                    <Stack
                      direction={{
                        base: 'column',
                      }}
                      w='full'
                      shadow='2xl'>
                      {reviews
                        .filter(
                          (review) =>
                            parseInt(review.song_id) === parseInt(song.id)
                        )
                        .map((each) => (
                          <Flex
                            direction={{
                              base: 'row',
                              md: 'column',
                            }}
                            bg='beige'
                            key={each.id}>
                            <SimpleGrid
                              spacingY={3}
                              columns={{
                                base: 1,
                                md: 1,
                              }}
                              w={{
                                base: 120,
                                md: 'full',
                              }}
                              bg='beige'
                              color='black'
                              py={{
                                base: 1,
                                md: 4,
                              }}
                              px={{
                                base: 2,
                                md: 2,
                              }}
                              fontSize='md'
                              fontWeight='normal'
                              fontFamily='Helvetica'>
                              <span>{each.comment}</span>
                            </SimpleGrid>
                            <Flex
                              justify={{
                                md: 'end',
                              }}>
                              <Button
                                variant='solid'
                                colorScheme='blue'
                                size='sm'
                                onClick={() => {
                                  updateReviewLikes(each);
                                }}>
                                {each.likes} LIKES
                              </Button>
                              <Button
                                variant='solid'
                                colorScheme='red'
                                size='sm'
                                onClick={() => {
                                  updateReviewDislikes(each);
                                }}>
                                {each.dislikes} DISLIKES
                              </Button>
                            </Flex>
                          </Flex>
                        ))}
                    </Stack>
                  </Flex>
                  <AddNewReview
                    submitNewReview={submitNewReview}
                    songID={song.id}
                    reviews={reviews}
                  />
                  <UpdateSong updateThisSong={updateThisSong} song={song} />

                  {/* DELETE THIS SONG button */}
                  <Button
                    variant='solid'
                    colorScheme='orange'
                    size='sm'
                    w='100%'
                    onClick={() => {
                      deleteSong(song);
                    }}>
                    DELETE THIS SONG (WHY DID I CREATE THIS BUTTON??)
                  </Button>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
      <Flex id='songStats' fontFamily='Helvetica' fontWeight='thin'>
        {/* DISPLAYING THE AGGREGATED LISTS OF ARTISTS, GENRES, AND SONGS*/}

        <Box maxW='lg' borderWidth='2px' borderRadius='lg' overflow='hidden'>
          <Text fontWeight='normal' fontSize='3xl'>
            SONG LIST
          </Text>
          <Stack>
            {songs.map((song) => (
              <Button onClick={() => setSearch(song.name)} key={song.id}>
                {song.name.toUpperCase()}
              </Button>
            ))}
          </Stack>
        </Box>
        <Box maxW='lg' borderWidth='2px' borderRadius='lg' overflow='hidden'>
          <Text fontWeight='normal' fontSize='3xl'>
            ARTIST LIST
          </Text>
          <Stack>
            {artists.map((artist) => (
              <Button onClick={() => setSearch(artist.name)} key={artist.id}>
                {artist.name.toUpperCase()}
              </Button>
            ))}
          </Stack>
        </Box>
        {/* <Box maxW='lg' borderWidth='2px' borderRadius='lg' overflow='hidden'>
          <Text fontWeight='normal' fontSize='3xl'>
            GENRE LIST
          </Text>
          <Stack>
            {genres.map((genre) => (
              <Button onClick={() => setSearch(genre.name)} key={genre.id}>
                {genre.name.toUpperCase()}
              </Button>
            ))}
          </Stack>
        </Box> */}
      </Flex>
    </Flex>
  );
}

export default SongsDisplay;
