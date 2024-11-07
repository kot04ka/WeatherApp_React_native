import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const DayDetails = ({ route }) => {
    const { day } = route.params;
    const [isCelsius, setIsCelsius] = useState(true);

    useEffect(() => {
        const loadSettings = async () => {
            const unit = await AsyncStorage.getItem('unit');
            setIsCelsius(unit === 'celsius' ? true : false);
        };
        loadSettings();
    }, []);

    const convertTemperature = (temp, toCelsius) => toCelsius ? temp : (temp * 9) / 5 + 32;

    if (!day) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Деталі дня</Text>
            <Image source={{ uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png` }} style={styles.icon} />
            <Text style={styles.day}>
                {new Date(day.dt * 1000).toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long' })}
            </Text>
            {/* Подробности погоды для выбранного дня */}
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Icon name="thermometer" size={20} color="#00796B" />
                    <Text style={styles.infoText}>
                        Температура: {convertTemperature(day.temp.day, isCelsius).toFixed(1)}°{isCelsius ? 'C' : 'F'}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

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
        elevation: 3,
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

export default DayDetails;
