import { Container, VStack, Text, Heading, Box, Image, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

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
          <Image src="/images/album-cover.jpg" alt="Album Cover" boxSize="100%" objectFit="cover" borderRadius="md" />
        </Box>
        <Text fontSize="xl" mb={4}>Now Playing: Song Title - Artist Name</Text>
        <VStack spacing={4} direction="row">
          <Button leftIcon={<FaBackward />} colorScheme="teal" variant="outline">Previous</Button>
          <Button leftIcon={isPlaying ? <FaPause /> : <FaPlay />} colorScheme="teal" onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button leftIcon={<FaForward />} colorScheme="teal" variant="outline">Next</Button>
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