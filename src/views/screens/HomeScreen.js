import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import Button from '../components/Button';

const HomeScreen = ({navigation}) => {
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const logout = () => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({...userDetails, loggedIn: false}),
    );
    navigation.navigate('LoginScreen');
  };

  const data = useSelector(storeState => storeState.userAuth);
  // console.log({data});

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
      }}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        Welcome {userDetails?.fullname}
      </Text>
      <Button title="Logout" onPress={logout} />
      <Text>{data.email}</Text>
      <Text>{data.password}</Text>
    </View>
  );
};

export default HomeScreen;
