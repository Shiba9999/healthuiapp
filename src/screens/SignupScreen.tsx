import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Modal, 
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { setRegisteredUser, loginUser } from '../reduxSlices/userSlice';

type RootStackParamList = {
  Landing: undefined;
  Auth: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  AdminDashboard: undefined;
  UserTabs: undefined;
};

type SignupScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Signup'>;
};

const typeOptions = [
  { label: 'User', value: 'user' },
  { label: 'Admin', value: 'admin' },
];

const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [type, setType] = useState('user');
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // const handleSignup = async () => {
  //   if (userName && password && fullName && type) {
  //     setIsLoading(true);
  //     // Simulate loading for better UX
  //     setTimeout(() => {
  //       dispatch(setRegisteredUser({ userName, password, type, fullName }));
  //       dispatch(loginUser());
  //       Toast.show({
  //         type: 'success',
  //         text1: 'Account Created Successfully',
  //         text2: 'Welcome! Redirecting...'
  //       });
  //       if (type === 'admin') {
  //         navigation.replace('AdminDashboard');
  //       } else {
  //         navigation.replace('UserTabs');
  //       }
  //       setIsLoading(false);
  //     }, 1000);
  //   } else {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Missing Information',
  //       text2: 'Please fill in all required fields',
  //     });
  //   }
  // };
  // const handleSignup = async () => {
  //   if (userName && password && fullName && type) {
  //     setIsLoading(true);
      
  //     try {
  //       // Simulate loading for better UX
  //       await new Promise(resolve => setTimeout(resolve, 1000));
        
  //       // Set the registered user first
  //       dispatch(setRegisteredUser({ userName, password, type, fullName }));
        
  //       // Then login the user - this will trigger navigation via AppNavigator
  //       dispatch(loginUser());
        
  //       Toast.show({
  //         type: 'success',
  //         text1: 'Account Created Successfully',
  //         text2: `Welcome, ${fullName}!`
  //       });
        
  //       // Remove manual navigation - let AppNavigator handle it
  //       // The AppNavigator will automatically navigate based on isLoggedIn state
        
  //     } catch (error) {
  //       console.error('Signup error:', error);
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Signup Error',
  //         text2: 'Something went wrong. Please try again.',
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   } else {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Missing Information',
  //       text2: 'Please fill in all required fields',
  //     });
  //   }
  // };

  const handleSignup = async () => {
    if (userName && password && fullName && type) {
      setIsLoading(true);
      
      try {
        // Simulate loading for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Only set the registered user, don't login automatically
        dispatch(setRegisteredUser({ userName, password, type, fullName }));
        
        Toast.show({
          type: 'success',
          text1: 'Account Created Successfully',
          text2: 'Please sign in to continue',
        });
        
        // Navigate to login screen instead of auto-login
        setTimeout(() => {
          navigation.replace('Login');
        }, 1500);
        
      } catch (error) {
        console.error('Signup error:', error);
        Toast.show({
          type: 'error',
          text1: 'Signup Error',
          text2: 'Something went wrong. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Missing Information',
        text2: 'Please fill in all required fields',
      });
    }
  };
  
  
  const selectedTypeLabel = typeOptions.find(opt => opt.value === type)?.label || 'Select Type';

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
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join HealthVision AI for personalized health monitoring</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Full Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.inputIcon}>
                  <Text style={styles.inputIconText}>👤</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9CA3AF"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Username Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Username</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.inputIcon}>
                  <Text style={styles.inputIconText}>@</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Choose a username"
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
                  placeholder="Create a secure password"
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

            {/* Account Type Selector */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Account Type</Text>
              <TouchableOpacity 
                style={styles.dropdownWrapper}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.8}
              >
                <View style={styles.inputIcon}>
                  <Text style={styles.inputIconText}>👥</Text>
                </View>
                <Text style={[styles.dropdownText, type ? styles.dropdownTextSelected : {}]}>
                  {selectedTypeLabel}
                </Text>
                <View style={styles.dropdownArrow}>
                  <Text style={styles.dropdownArrowText}>▼</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Account Type Modal */}
            <Modal
              visible={modalVisible}
              transparent
              animationType="fade"
              onRequestClose={() => setModalVisible(false)}
            >
              <TouchableOpacity 
                style={styles.modalOverlay} 
                activeOpacity={1}
                onPress={() => setModalVisible(false)}
              >
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Select Account Type</Text>
                  <FlatList
                    data={typeOptions}
                    keyExtractor={item => item.value}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={[
                          styles.modalItem,
                          type === item.value && styles.modalItemSelected
                        ]}
                        onPress={() => {
                          setType(item.value);
                          setModalVisible(false);
                        }}
                        activeOpacity={0.8}
                      >
                        <Text style={[
                          styles.modalItemText,
                          type === item.value && styles.modalItemTextSelected
                        ]}>
                          {item.label}
                        </Text>
                        {type === item.value && (
                          <Text style={styles.checkmark}>✓</Text>
                        )}
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableOpacity>
            </Modal>

            {/* Signup Button */}
            <TouchableOpacity
              style={[styles.signupButton, isLoading && styles.signupButtonDisabled]}
              onPress={handleSignup}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.signupButtonText}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            {/* Terms and Conditions */}
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By creating an account, you agree to our{' '}
                <Text style={styles.termsLink}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text 
                style={styles.loginLink}
                onPress={() => navigation.navigate('Login')}
              >
                Sign in here
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
    paddingHorizontal: 20,
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
    paddingVertical: 0,
  },
  eyeIcon: {
    padding: 8,
    marginLeft: 8,
  },
  eyeIconText: {
    fontSize: 18,
  },
  dropdownWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    height: 56,
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    color: '#9CA3AF',
  },
  dropdownTextSelected: {
    color: '#2D3748',
  },
  dropdownArrow: {
    marginLeft: 8,
  },
  dropdownArrowText: {
    fontSize: 12,
    color: '#718096',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxWidth: 300,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A202C',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  modalItemSelected: {
    backgroundColor: '#E6F3FF',
  },
  modalItemText: {
    fontSize: 16,
    color: '#2D3748',
  },
  modalItemTextSelected: {
    color: '#3182CE',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 16,
    color: '#3182CE',
    fontWeight: 'bold',
  },
  signupButton: {
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
  signupButtonDisabled: {
    backgroundColor: '#A0AEC0',
    elevation: 0,
    shadowOpacity: 0,
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  termsContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  termsText: {
    fontSize: 13,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
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
  loginLink: {
    color: '#3182CE',
    fontWeight: '600',
  },
});

export default SignupScreen;
