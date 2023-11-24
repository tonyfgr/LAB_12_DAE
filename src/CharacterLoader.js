import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const titleStyle = {
  fontFamily: 'Star Jedi, sans-serif',
  fontSize: '3rem',
  fontWeight: 'bold',
  color: '#FFE81F', // Amarillo similar al logo de Star Wars
  textShadow: '2px 2px 4px #000000',
};

const containerStyle = {
  backgroundColor: '#0A0A0A', // Fondo oscuro
  padding: '20px',
};

const cardStyle = {
  backgroundColor: '#5A5A5A', // Gris
};

const searchInputStyle = {
  marginBottom: '10px',
  backgroundColor: '#5A5A5A'
};

const loadingTextStyle = {
  color: '#FFE81F', // Amarillo
};

function CharacterLoader() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const loadCharacters = () => {
    setLoading(true);

    if (searchTerm.trim() === '') {
      setCharacters([]);
      setLoading(false);
      return;
    }

    axios
      .get(`https://swapi.dev/api/people/?search=${searchTerm}`)
      .then((response) => {
        setCharacters(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  useEffect(() => {
    loadCharacters();
  }, [searchTerm]);

  return (
    <Container style={containerStyle}>
      <Typography variant="h1" gutterBottom style={titleStyle}>
        Personajes de Star Wars
      </Typography>
      <TextField
        fullWidth
        label="Buscar personaje..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={searchInputStyle}
        InputLabelProps={{ style: { color: '#FFE81F' } }} // Etiqueta del input de color amarillo
      />
      <Button
        variant="contained"
        color="primary"
        onClick={loadCharacters}
        disabled={loading}
        style={{ marginBottom: '20px' }}
      >
        {loading ? (
          <span style={loadingTextStyle}>Cargando Personajes...</span>
        ) : (
          'Buscar'
        )}
      </Button>
      <Grid container spacing={3}>
        {characters.map((character, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
            <Card style={cardStyle}>
              <CardContent>
                <Avatar>
                  <PersonIcon />
                </Avatar>
                <Typography variant="h5" component="div" color="text.primary">
                  {character.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Género:</strong> {character.gender}<br />
                  <strong>Año de nacimiento:</strong> {character.birth_year}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CharacterLoader;
