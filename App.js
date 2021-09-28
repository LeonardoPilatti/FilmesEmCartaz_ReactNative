import React from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const App = () => {
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const requestMovies = async () => {
      setLoading(true);
      const req = await fetch('https://api.b7web.com.br/cinema/');
      const json = await req.json();

      if (json) {
        setMovies(json);
        setLoading(false);
      }
    };

    requestMovies();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loadingArea}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Carregando</Text>
        </View>
      )}
      {!loading && (
        <>
          <Text style={styles.totalMoviesText}>
            Total de Filmes: {movies.length}
          </Text>
          <FlatList
            style={styles.list}
            data={movies}
            renderItem={({item}) => (
              <View style={styles.movieItem}>
                <Image
                  source={{uri: item.avatar}}
                  style={styles.movieImage}
                  resizeMode="contain"
                />
                <Text style={styles.movieTitle}>{item.titulo}</Text>
              </View>
            )}
            keyExtractor={item => item.titulo}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  totalMoviesText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
  },
  list: {
    flex: 1,
  },
  movieItem: {
    marginBottom: 30,
  },
  movieImage: {
    height: 400,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
  },
  loadingArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
  },
});

export default App;
