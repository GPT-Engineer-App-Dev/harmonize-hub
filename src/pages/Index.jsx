import { Container, VStack, Text, Heading, Box, Image, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [currentSong, setCurrentSong] = useState(0);
  const audioRef = useRef(null);

  const songs = [
    { title: "Song 1", artist: "Artist 1", src: "/songs/song1.mp3" },
    { title: "Song 2", artist: "Artist 2", src: "/songs/song2.mp3" },
    { title: "Song 3", artist: "Artist 3", src: "/songs/song3.mp3" },
  ];

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSong((prevSong) => (prevSong + 1) % songs.length);
  };

  const handlePrevious = () => {
    setCurrentSong((prevSong) => (prevSong - 1 + songs.length) % songs.length);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      setPlaylists([...playlists, newPlaylistName]);
      setNewPlaylistName('');
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" mb={4}>Music Streaming Service</Heading>
        <Box boxSize="300px" mb={4}>
          <Image src={`/images/album-cover-${currentSong + 1}.jpg`} alt="Album Cover" boxSize="100%" objectFit="cover" borderRadius="md" />
        </Box>
        <audio ref={audioRef} src={songs[currentSong].src} />
        <Text fontSize="xl" mb={4}>Now Playing: {songs[currentSong].title} - {songs[currentSong].artist}</Text>
        <VStack spacing={4} direction="row">
          <Button leftIcon={<FaBackward />} colorScheme="teal" variant="outline" onClick={handlePrevious}>Previous</Button>
          <Button leftIcon={isPlaying ? <FaPause /> : <FaPlay />} colorScheme="teal" onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button leftIcon={<FaForward />} colorScheme="teal" variant="outline" onClick={handleNext}>Next</Button>
        </VStack>
        <VStack spacing={4} mt={8} width="100%">
          <FormControl id="new-playlist">
            <FormLabel>New Playlist</FormLabel>
            <Input 
              value={newPlaylistName} 
              onChange={(e) => setNewPlaylistName(e.target.value)} 
              placeholder="Enter playlist name" 
            />
            <Button mt={2} colorScheme="teal" onClick={handleCreatePlaylist}>Create Playlist</Button>
          </FormControl>
          <VStack spacing={2} width="100%">
            {playlists.map((playlist, index) => (
              <Box key={index} p={4} borderWidth="1px" borderRadius="md" width="100%">
                {playlist}
              </Box>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;