/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */




import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
