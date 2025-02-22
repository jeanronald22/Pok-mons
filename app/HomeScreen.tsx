import React, { useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, Dimensions } from 'react-native';
import Button from '../components/ui/Button';

const HomeScreen = () => {
  const [click, setClick] = useState(false);

  const handlePress = () => {
    // TODO: Gère la navigation
    console.log('Bouton pressé');
  };

  return (
    <ImageBackground
      source={require('../assets/images/Pikachu.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Titre */}
        <Text style={styles.title}>Mon Pokédex</Text>

        {/* Sous-titre */}
        <Text style={styles.subtitle}>Attrapez-les tous !</Text>

        {/* Conteneur pour le bouton en bas */}
        <View style={styles.bottomContainer}>
          <Button
            onPress={handlePress}
            title="Commencer l'aventure"
            buttonStyle={styles.customButton}
            textStyle={styles.customButtonText}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover', // Ajuste l'image pour couvrir tout l'écran
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end', 
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent pour améliorer la lisibilité
  },
  title: {
    fontSize: 48,
    fontFamily: 'Pokemon-Solid',
    color: '#FFA500',
    textShadowColor: '#2A75BB',
    textShadowOffset: { width: -3, height: -2 },
    textShadowRadius: 2,
    letterSpacing: 5,
    marginBottom: 10, 
  },
  subtitle: {
    fontSize: 24,
    fontFamily: 'Pokemon-Solid', 
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    marginBottom: 30, 
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 50, 
  },
  customButton: {
    width: '80%', 
    backgroundColor: '#FF8C00', 
    borderRadius: 30,
    elevation: 5, // Ombre pour Android
    shadowColor: '#000', // Ombre pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  customButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default HomeScreen;