import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./Home.js";
import AddCourse from "./AddCourse.js";
import Modify from "./Modify.js";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return(
        <NavigationContainer >
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='AddCourse' component={AddCourse} />
                <Stack.Screen name='Modify' component={Modify} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;