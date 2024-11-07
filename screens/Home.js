// screens/Home.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Home({ navigation }) {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim() !== '') {
      navigation.navigate('CurrentWeather', { city: city.trim() });
      setCity('');
    } else {
      Alert.alert('Помилка', 'Будь ласка, введіть назву міста.');
    }
  };

  const handleForecast = () => {
    if (city.trim() !== '') {
      navigation.navigate('Forecast', { city: city.trim() });
      setCity('');
    } else {
      Alert.alert('Помилка', 'Будь ласка, введіть назву міста.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Програма Погоди</Text>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#00796B" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Введіть назву міста"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Icon name="sunny" size={20} color="#FFFFFF" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Поточна Погода</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleForecast}>
        <Icon name="calendar" size={20} color="#FFFFFF" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Прогноз</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
        <Icon name="settings" size={20} color="#FFFFFF" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Налаштування</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
        <Icon name="information-circle" size={20} color="#FFFFFF" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Про додаток</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212', // Dark background for the overall container
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 25,
    fontWeight: '900',
    color: '#90CAF9', // Light blue for contrast against the dark background
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#333333', // Darker shade for input field
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 15,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', // Adjusted shadow for more depth in dark mode
  },
  icon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#B0BEC5', // Soft light grey for text input to ensure readability
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'linear-gradient(45deg, #0D47A1, #1565C0)', // Blue gradient for buttons
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 12,
    width: '100%',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)', // Stronger shadow for a pronounced effect
  },
  buttonIcon: {
    marginRight: 12,
  },
  buttonText: {
    color: '#FFFFFF', // Keep text color white for high contrast on buttons
    fontSize: 20,
    fontWeight: '600',
  },
});


