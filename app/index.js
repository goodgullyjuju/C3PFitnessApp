// app/index.js (Main/Home Screen)

import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, Platform } from 'react-native';
import { Link } from 'expo-router';

// Components
import HelloWave from './components/HelloWave';
import ParallaxScrollView from './components/ParallaxScrollView';
import { ThemedText } from './components/navigation/ThemedText'; // Ensure this path is correct
import { ThemedView } from './components/navigation/ThemedView'; // Ensure this path is correct

// Data Fetching
import { fetchWorkouts } from './services/supabaseService';

// Screens
import ClientDashboard from './ClientDashboard';
import CoachDashboard from './CoachDashboard';


export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCoach, setIsCoach] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // Your authentication logic here
    };
    checkAuth();
    getExercisesFromSupabase();
  }, []);

  const getExercisesFromSupabase = async () => {
    const exercises = await fetchWorkouts();
    setWorkouts(exercises);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('../assets/images/Cover3PerformanceApp.png')} 
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/index.js</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>

      {/* Conditional rendering for login/signup or dashboards */}
      <ThemedView style={styles.stepContainer}> 
        {!isLoggedIn ? (
          <>
            <Button title="Log In" onPress={() => router.push('/login')} />
            <Button title="Sign Up" onPress={() => router.push('/signup')} />
          </>
        ) : isCoach ? (
          <CoachDashboard />
        ) : (
          <ClientDashboard />
        )}
      </ThemedView>

      {/* Display workouts */}
      <View style={styles.workoutList}>
        <Text style={styles.title}>Workouts</Text>
        {workouts.map((workout) => (
          <Link href={`/tabs/workouts/${workout.id}`} asChild key={workout.id}> 
            <TouchableOpacity>
              <Text style={styles.workoutText}>{workout.name}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ParallaxScrollView>
  );
}

// ... (styles remain the same)

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  workoutList: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  workoutText: {
    fontSize: 18,
    marginVertical: 5,
  },
});