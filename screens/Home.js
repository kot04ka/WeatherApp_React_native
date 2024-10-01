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
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#00796B',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    elevation: 3, // Для Android
    shadowColor: '#000', // Для iOS
    shadowOffset: { width: 0, height: 2 }, // Для iOS
    shadowOpacity: 0.25, // Для iOS
    shadowRadius: 3.84, // Для iOS
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#00796B',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#00796B',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    elevation: 3, // Для Android
    shadowColor: '#000', // Для iOS
    shadowOffset: { width: 0, height: 2 }, // Для iOS
    shadowOpacity: 0.25, // Для iOS
    shadowRadius: 3.84, // Для iOS
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
