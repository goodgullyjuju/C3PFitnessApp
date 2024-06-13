import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { addExercise, fetchExercises } from './firebaseService';
import LoginScreen from './login'; 
import SignUpScreen from './signup';
import ClientDashboard from './client-dashboard';
import CoachDashboard from './coach-dashboard';
import WorkoutTab from './WorkoutTab';
import exampleWorkout from './Workout';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCoach, setIsCoach] = useState(false);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      // Your authentication logic here
    };
    checkAuth();
    getExercisesFromFirebase();
  }, []);

  const addExerciseToFirebase = async (exercise) => {
    await addExercise(exercise);
  };

  const getExercisesFromFirebase = async () => {
    const exercises = await fetchExercises();
    setExercises(exercises);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to C3P Fitness App</Text>
      {!isLoggedIn ? (
        <>
          <Button
            title="Login"
            onPress={() => navigation.navigate('Login')}
          />
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate('SignUp')}
          />
        </>
      ) : isCoach ? (
        <CoachDashboard />
      ) : (
        <ClientDashboard />
      )}
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
function App() {
  console.log('Example Workout:', exampleWorkout);
  return (
    <div>
      <WorkoutTab />
    </div>
  );
}};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  }
});