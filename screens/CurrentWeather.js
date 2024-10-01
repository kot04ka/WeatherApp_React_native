// screens/CurrentWeather.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CurrentWeather({ navigation, route }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCelsius, setIsCelsius] = useState(true);

  const city = route.params?.city || 'Київ';

  useEffect(() => {
    const loadSettings = async () => {
      const unit = await AsyncStorage.getItem('unit');
      setIsCelsius(unit === 'celsius' ? true : false);
    };
    loadSettings();
  }, []);

  const convertTemperature = (temp, toCelsius) => {
    return toCelsius ? temp : (temp * 9) / 5 + 32;
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=uk&appid=2bd141af61149fc473b4d651a72b25b7`
        );
        const data = await response.json();
        if (response.ok) {
          setWeather(data);
        } else {
          setWeather(null);
          alert(`Помилка: ${data.message}`);
        }
      } catch (error) {
        console.error(error);
        setWeather(null);
        alert('Не вдалося отримати дані про погоду.');
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00796B" />
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={styles.container}>
        <Icon name="alert-circle" size={60} color="#D84315" />
        <Text style={styles.errorText}>Не вдалося завантажити дані про погоду.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={20} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Назад на головну</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Поточна Погода в {weather.name}</Text>
      <Image
        source={{ uri: iconUrl }}
        style={styles.icon}
      />
      <Text style={styles.temp}>
        {convertTemperature(weather.main.temp, isCelsius).toFixed(1)}°{isCelsius ? 'C' : 'F'}
      </Text>
      <Text style={styles.condition}>{weather.weather[0].description}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Icon name="thermometer" size={20} color="#00796B" />
          <Text style={styles.infoText}>
            Температура відчувається: {convertTemperature(weather.main.feels_like, isCelsius).toFixed(1)}°{isCelsius ? 'C' : 'F'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="water" size={20} color="#00796B" />
          <Text style={styles.infoText}>Вологість: {weather.main.humidity}%</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="speedometer" size={20} color="#00796B" />
          <Text style={styles.infoText}>Швидкість вітру: {weather.wind.speed} м/с</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="speedometer-outline" size={20} color="#00796B" />
          <Text style={styles.infoText}>Тиск: {weather.main.pressure} гПа</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={20} color="#FFFFFF" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Назад на головну</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
  },
  container: {
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E0F7FA',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#00796B',
    textAlign: 'center',
  },
  icon: {
    width: 120,
    height: 120,
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#E65100',
    marginVertical: 10,
  },
  condition: {
    fontSize: 24,
    marginBottom: 30,
    color: '#BF360C',
    textTransform: 'capitalize',
  },
  infoContainer: {
    backgroundColor: '#A5D6A7',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    marginBottom: 20,
    elevation: 3, // Для Android
    shadowColor: '#000', // Для iOS
    shadowOffset: { width: 0, height: 2 }, // Для iOS
    shadowOpacity: 0.25, // Для iOS
    shadowRadius: 3.84, // Для iOS
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#004D40',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#00796B',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 10,
    width: '60%',
    justifyContent: 'center',
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
  errorText: {
    fontSize: 20,
    color: '#D84315',
    marginVertical: 20,
    textAlign: 'center',
  },
});
