import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from './src/screens/TaskListScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='TaskList'>
                <Stack.Screen
                    name='TaskList' 
                    component={TaskListScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name='TaskDetail' component={TaskDetailScreen} options={{ title: 'TaskDetail' }} />
                <Stack.Screen name='AddTask' component={AddTaskScreen} options={{ title: 'AddTask' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
