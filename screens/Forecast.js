// screens/Forecast.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Forecast({ navigation, route }) {
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);
  const [loading, setLoading] = useState(true);

  const city = route.params?.city || 'Київ';

  useEffect(() => {
    const loadSettings = async () => {
      const unit = await AsyncStorage.getItem('unit');
      setIsCelsius(unit === 'celsius' ? true : false);
    };
    loadSettings();
  }, []);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=uk&appid=2bd141af61149fc473b4d651a72b25b7`
        );
        const data = await response.json();
        if (response.ok) {
          const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"));
          setForecastData(dailyData);
        } else {
          setForecastData([]);
          Alert.alert('Помилка', data.message);
        }
      } catch (error) {
        console.error(error);
        setForecastData([]);
        Alert.alert('Помилка', 'Не вдалося отримати прогноз погоди.');
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
  }, [city]);

  const convertTemperature = (temp, toCelsius) => {
    return toCelsius ? temp : (temp * 9) / 5 + 32;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('DayDetails', { day: item })}
    >
      <Text style={styles.day}>{new Date(item.dt * 1000).toLocaleDateString('uk-UA', { weekday: 'long' })}</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
        style={styles.icon}
      />
      <View style={styles.tempContainer}>
        <Text style={styles.temp}>{convertTemperature(item.main.temp, isCelsius).toFixed(1)}°{isCelsius ? 'C' : 'F'}</Text>
        <Text style={styles.condition}>{item.weather[0].description}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Прогноз Погоди для {city}</Text>
      <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={20} color="#FFFFFF" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Назад на головну</Text>
      </TouchableOpacity>
      {forecastData.length > 0 ? (
        <FlatList
          data={forecastData}
          renderItem={renderItem}
          keyExtractor={(item) => item.dt.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noDataText}>Немає прогнозу для цього міста.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#C8E6C9',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2E7D32',
  },
  list: {
    paddingBottom: 20,
    width: '100%',
  },
  item: {
    backgroundColor: '#A5D6A7',
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3, // Для Android
    shadowColor: '#000', // Для iOS
    shadowOffset: { width: 0, height: 2 }, // Для iOS
    shadowOpacity: 0.25, // Для iOS
    shadowRadius: 3.84, // Для iOS
  },
  day: {
    fontSize: 20,
    color: '#1B5E20',
    fontWeight: 'bold',
    flex: 1,
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  tempContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  temp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  condition: {
    fontSize: 16,
    color: '#1B5E20',
    textTransform: 'capitalize',
  },
  noDataText: {
    fontSize: 18,
    color: '#D84315',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#C8E6C9',
  },
  searchButton: {
    flexDirection: 'row',
    backgroundColor: '#00796B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
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
