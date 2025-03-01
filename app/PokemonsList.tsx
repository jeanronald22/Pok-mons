import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Image, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import useFetch from '../hooks/UseFetch'; // Importe ton hook useFetch
import { StatusBar } from 'expo-status-bar';
import LinearGradient from 'react-native-linear-gradient';

interface Pokemon {
  name: string;
  url: string;
}

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);
  const { data: pokemonList, loading, error } = useFetch<{ results: Pokemon[] }>({
    url: 'https://pokeapi.co/api/v2/pokemon?limit=50', // Charge 100 Pokémon pour commencer
  });
  // Filtrer la liste des Pokémon en fonction de la recherche
  useEffect(() => {
    if (pokemonList) {
      if (searchQuery) {
        const filtered = pokemonList.results.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPokemonList(filtered);
      } else {
        setFilteredPokemonList(pokemonList.results);
      }
    }
  }, [searchQuery, pokemonList]);

  // Afficher un indicateur de chargement
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFCB05" />
      </View>
    );
  }

  // Afficher une erreur
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erreur : {error.message}</Text>
      </View>
    );
  }
  
  return (
   <SafeAreaView style={styles.container}>
   
    <View style={{padding:16}}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Pokémons List.</Text>
      </View>
        {/* Barre de recherche */}

        <TextInput
          style={styles.searchBar}
          placeholder="Rechercher un Pokémon..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Liste des Pokémon en grille à deux colonnes */}
        <FlatList
          data={filteredPokemonList}
          keyExtractor={(item) => item.name}
          numColumns={2} 
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.pokemonCard}>
              <Image
              source={{
                  uri: `https://img.pokemondb.net/artwork/${item.name}.jpg`,
                }}
                style={styles.pokemonImage}
              />
              <Text style={styles.pokemonName}>{item.name.toUpperCase()}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
        />
    </View>
    <StatusBar style='dark' animated={true} />
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#FF0000',
  },
  searchBar: {
    height: 40,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    
  },
  listContainer: {
    paddingBottom: 16,
  },
  pokemonCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    objectFit:'contain'
  },
  pokemonName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
    
  },
  headerContainer:{
    display:'flex', 
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:20
  },
  title:{
    fontFamily:'Pokemon-Solid',
    fontSize:40,    
    color: '#FFA500',
    textShadowColor: '#2A75BB',
    textShadowOffset: { width: -3, height: -2 },
    textShadowRadius: 2,
    letterSpacing: 5,
  }
});

export default HomeScreen;