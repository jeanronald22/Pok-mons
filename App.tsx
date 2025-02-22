import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './app/HomeScreen';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false)
	const loadFonts = async ()=>{
		await Font.loadAsync({
			'Pokemon-Solid': require('./assets/fonts/Pokemon-Solid.ttf'),
			'Pokemon-Hollow': require('./assets/fonts/Pokemon-Hollow.ttf'),

		});
		setFontLoaded(true);
	}
	useEffect(()=>{
		
		loadFonts();
	}, [])
	if (!fontLoaded){
// affiche un indicateur si la policie nest pas charger
	return (
	<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		<ActivityIndicator size="large" color="#FFCB05"/>
	</View>)
	}
	return (
		<View style={styles.container}>
			<HomeScreen />
			<StatusBar style="inverted" />
		</View>
	);
	
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
