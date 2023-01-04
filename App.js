import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/views/screens/LoginScreen';
import RegistrationScreen from './src/views/screens/RegistrationScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './src/views/components/Loader';

import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import persistStore from 'redux-persist/es/persistStore';
import {PersistGate} from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState('');

  React.useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName('HomeScreen');
        } else {
          setInitialRouteName('LoginScreen');
        }
      } else {
        setInitialRouteName('RegistrationScreen');
      }
    } catch (error) {
      setInitialRouteName('RegistrationScreen');
    }
  };

  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          {!initialRouteName ? (
            <Loader visible={true} />
          ) : (
            <>
              <Stack.Navigator
                initialRouteName={initialRouteName}
                screenOptions={{headerShown: false}}>
                <Stack.Screen
                  name="RegistrationScreen"
                  component={RegistrationScreen}
                />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
              </Stack.Navigator>
            </>
          )}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
