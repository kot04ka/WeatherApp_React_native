// screens/Settings.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Settings({ navigation }) {
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      const unit = await AsyncStorage.getItem('unit');
      setIsCelsius(unit === 'celsius' ? true : false);
    };
    loadSettings();
  }, []);

  const toggleSwitch = async () => {
    const newUnit = isCelsius ? 'fahrenheit' : 'celsius';
    setIsCelsius(!isCelsius);
    await AsyncStorage.setItem('unit', newUnit);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Налаштування</Text>
      <View style={styles.settingItem}>
        <Text style={styles.label}>Температура в Цельсіях</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isCelsius ? '#00796B' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isCelsius}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={20} color="#FFFFFF" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Назад на головну</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFCCBC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#D84315',
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFAB91',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    marginBottom: 30,
    elevation: 3, // Для Android
    shadowColor: '#000', // Для iOS
    shadowOffset: { width: 0, height: 2 }, // Для iOS
    shadowOpacity: 0.25, // Для iOS
    shadowRadius: 3.84, // Для iOS
  },
  label: {
    fontSize: 18,
    color: '#BF360C',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#D84315',
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
});
