// screens/About.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function About({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Про додаток</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.content}>
          lorem
        </Text>
        <Text style={styles.content}>
          - <Text style={styles.boldText}>Поточна Погода</Text>: відображає поточну температуру та погодні умови.
        </Text>
        <Text style={styles.content}>
          - <Text style={styles.boldText}>Прогноз</Text>: показує прогноз погоди на найближчі дні.
        </Text>
        <Text style={styles.content}>
          - <Text style={styles.boldText}>Налаштування</Text>: дозволяє вибрати одиниці вимірювання температури.
        </Text>
        <Text style={styles.content}>
          - <Text style={styles.boldText}>Про додаток</Text>: містить інформацію про додаток.
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={20} color="#FFFFFF" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Назад на головну</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#D1C4E9',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#5E35B1',
    textAlign: 'center',
  },
  contentContainer: {
    backgroundColor: '#B39DDB',
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
  content: {
    fontSize: 16,
    color: '#311B92',
    marginBottom: 15,
    textAlign: 'left',
  },
  boldText: {
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#5E35B1',
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
