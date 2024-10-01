// screens/DayDetails.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

export default function DayDetails({ route }) {
  const { day } = route.params;
  const [isCelsius, setIsCelsius] = useState(true);

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

  const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Деталі дня</Text>
      <Image
        source={{ uri: iconUrl }}
        style={styles.icon}
      />
      <Text style={styles.day}>
        {new Date(day.dt * 1000).toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long' })}
      </Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Icon name="thermometer" size={20} color="#00796B" />
          <Text style={styles.infoText}>
            Температура: {convertTemperature(day.main.temp, isCelsius).toFixed(1)}°{isCelsius ? 'C' : 'F'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="thermometer-outline" size={20} color="#00796B" />
          <Text style={styles.infoText}>
            Температура відчувається: {convertTemperature(day.main.feels_like, isCelsius).toFixed(1)}°{isCelsius ? 'C' : 'F'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="water" size={20} color="#00796B" />
          <Text style={styles.infoText}>Вологість: {day.main.humidity}%</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="speedometer" size={20} color="#00796B" />
          <Text style={styles.infoText}>Швидкість вітру: {day.wind.speed} м/с</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="speedometer-outline" size={20} color="#00796B" />
          <Text style={styles.infoText}>Тиск: {day.main.pressure} гПа</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="rainy-outline" size={20} color="#00796B" />
          <Text style={styles.infoText}>Ймовірність опадів: {(day.pop * 100).toFixed(0)}%</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#00796B',
    textAlign: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  day: {
    fontSize: 22,
    color: '#00796B',
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#A5D6A7',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    elevation: 3, // Для Android
    shadowColor: '#000', // Для iOS
    shadowOffset: { width: 0, height: 2 }, // Для iOS
    shadowOpacity: 0.25, // Для iOS
    shadowRadius: 3.84, // Для iOS
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#004D40',
  },
});
