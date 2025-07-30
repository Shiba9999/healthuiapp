import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { loginUser } from '../reduxSlices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoggedInUser } from '../reduxSlices/loggedInUserSlice';

type RootStackParamList = {
  Landing: undefined;
  Auth: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  AdminDashboard: undefined;
  UserTabs: undefined;
};

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const registeredUser = useSelector((state: RootState) => state.user.registeredUser);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  
  useEffect(() => {
    console.log("registeredUser", registeredUser);
  }, []);

  // const handleLogin = async () => {
  //   if (!userName || !password) {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Missing Information',
  //       text2: 'Please enter both username and password',
  //     });
  //     return;
  //   }

  //   if (!registeredUser) {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'No Account Found',
  //       text2: 'Please sign up first',
  //     });
  //     return;
  //   }

  //   setIsLoading(true);
    
  //   try {
  //     // Simulate loading for better UX
  //     await new Promise(resolve => setTimeout(resolve, 1000));
      
  //     if (registeredUser.userName === userName && registeredUser.password === password) {
  //       Toast.show({
  //         type: 'success',
  //         text1: 'Login Successful',
  //         text2: `Welcome back, ${registeredUser.fullName}!`,
  //       });
        
  //       // Dispatch login first
  //       dispatch(loginUser());
        
  //       // Then navigate after a short delay to ensure state is updated
  //       setTimeout(() => {
  //         try {
  //           if (registeredUser.type === 'admin') {
  //             navigation.reset({
  //               index: 0,
  //               routes: [{ name: 'AdminDashboard' }],
  //             });
  //           } else {
  //             navigation.reset({
  //               index: 0,
  //               routes: [{ name: 'UserTabs' }],
  //             });
  //           }
  //         } catch (navError) {
  //           console.error('Navigation error:', navError);
  //           // Fallback navigation
  //           navigation.navigate(registeredUser.type === 'admin' ? 'AdminDashboard' : 'UserTabs');
  //         }
  //       }, 100);
        
  //     } else {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Invalid Credentials',
  //         text2: 'Please check your username and password',
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Login Error',
  //       text2: 'Something went wrong. Please try again.',
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // const handleLogin = async () => {
  //   if (!userName || !password) {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Missing Information',
  //       text2: 'Please enter both username and password',
  //     });
  //     return;
  //   }
  
  //   if (!registeredUser) {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'No Account Found',
  //       text2: 'Please sign up first',
  //     });
  //     return;
  //   }
  
  //   setIsLoading(true);
  
  //   try {
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  
  //     if (registeredUser.userName === userName && registeredUser.password === password) {
  //       Toast.show({
  //         type: 'success',
  //         text1: 'Login Successful',
  //         text2: `Welcome back, ${registeredUser.fullName}!`,
  //       });
  
  //       // Store user data in AsyncStorage (stringify if needed)
  //       await AsyncStorage.setItem('loggedInUser', JSON.stringify(registeredUser));
  
  //       // Dispatch login
  //       dispatch(loginUser());
  
  //       setTimeout(() => {
  //         try {
  //           if (registeredUser.type === 'admin') {
  //             navigation.reset({
  //               index: 0,
  //               routes: [{ name: 'AdminDashboard' }],
  //             });
  //           } else {
  //             navigation.reset({
  //               index: 0,
  //               routes: [{ name: 'UserTabs' }],
  //             });
  //           }
  //         } catch (navError) {
  //           console.error('Navigation error:', navError);
  //           navigation.navigate(registeredUser.type === 'admin' ? 'AdminDashboard' : 'UserTabs');
  //         }
  //       }, 100);
  //     } else {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Invalid Credentials',
  //         text2: 'Please check your username and password',
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Login Error',
  //       text2: 'Something went wrong. Please try again.',
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleLogin = async () => {
    if (!userName || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Information',
        text2: 'Please enter both username and password',
      });
      return;
    }
  
    if (!registeredUser) {
      Toast.show({
        type: 'error',
        text1: 'No Account Found',
        text2: 'Please sign up first',
      });
      return;
    }
  
    setIsLoading(true);
  
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      if (registeredUser.userName === userName && registeredUser.password === password) {
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: `Welcome back, ${registeredUser.fullName}!`,
        });
  
        // Store user data ONLY if type is 'user'
        if (registeredUser.type === 'user') {
          dispatch(setLoggedInUser(registeredUser));
          await AsyncStorage.setItem('loggedInUser', JSON.stringify(registeredUser));
        } else {
          // For admin, optionally clear stored user data (or skip storing)
          await AsyncStorage.removeItem('loggedInUser');
        }
  
        // Dispatch login action
        dispatch(loginUser());
  
        // Navigate accordingly
        setTimeout(() => {
          try {
            if (registeredUser.type === 'admin') {
              navigation.reset({
                index: 0,
                routes: [{ name: 'AdminDashboard' }],
              });
            } else {
              navigation.reset({
                index: 0,
                routes: [{ name: 'UserTabs' }],
              });
            }
          } catch (navError) {
            console.error('Navigation error:', navError);
            navigation.navigate(registeredUser.type === 'admin' ? 'AdminDashboard' : 'UserTabs');
          }
        }, 100);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Invalid Credentials',
          text2: 'Please check your username and password',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      Toast.show({
        type: 'error',
        text1: 'Login Error',
        text2: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoText}>⚕️</Text>
              </View>
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue your health monitoring</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Username Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Username</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.inputIcon}>
                  <Text style={styles.inputIconText}>👤</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your username"
                  placeholderTextColor="#9CA3AF"
                  value={userName}
                  onChangeText={setUserName}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.inputIcon}>
                  <Text style={styles.inputIconText}>🔒</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.eyeIconText}>
                    {showPassword ? '🙈' : '👁️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text 
                style={styles.signupLink}
                onPress={() => navigation.navigate('Signup')}
              >
                Sign up here
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E6F3FF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  logoText: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    width: '100%',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  inputIconText: {
    fontSize: 18,
    color: '#718096',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
    paddingVertical: 0, // Remove default padding
  },
  eyeIcon: {
    padding: 8,
    marginLeft: 8,
  },
  eyeIconText: {
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: '#3182CE',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#3182CE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  loginButtonDisabled: {
    backgroundColor: '#A0AEC0',
    elevation: 0,
    shadowOpacity: 0,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  forgotPasswordButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#3182CE',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 15,
    color: '#4A5568',
    textAlign: 'center',
  },
  signupLink: {
    color: '#3182CE',
    fontWeight: '600',
  },
});

export default LoginScreen;