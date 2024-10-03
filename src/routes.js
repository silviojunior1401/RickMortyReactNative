import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Cards from './pages/cards';
import Login from './pages/login';
import User from './pages/user';
import CardDetails from './pages/card_details';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            title: 'LOGIN',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#3498db',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#fff',
            },
          }}
        />
        <Stack.Screen
          name="cards"
          component={Cards}
          options={{
            title: 'GitHub VIEWER',
            headerTitleAlign: 'center',
            headerLeft: null,
            headerStyle: {backgroundColor: '#3498db'},
            headerTitleStyle: {fontWeight: 'bold', color: '#fff'},
          }}
        />
        <Stack.Screen
          name="user"
          component={User}
          options={{
            title: 'Cadastro do Usuário',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#3498db',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#fff',
            },
          }}
        />
        <Stack.Screen
          name="card_details"
          component={CardDetails}
          options={{
            title: 'Detalhes do Card',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#3498db',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#fff',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
