import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Platform,
  PermissionsAndroid,
  ScrollView
} from 'react-native';
import { Camera, useCameraDevice, VideoFile } from 'react-native-vision-camera';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../components/CustomButton';
import { logoutUser } from '../reduxSlices/userSlice';
import { RootState } from '../store';
import { debugFilePath, uploadHealthVideo } from '../api/userScreenApi';
import { setHealthResult } from '../reduxSlices/healthResultSlice';
import Toast from 'react-native-toast-message';

// Define the proper navigation types
type RootStackParamList = {
  Landing: undefined;
  Auth: undefined;
  Login: undefined;
  Signup: undefined;
  AdminDashboard: undefined;
  UserTabs: undefined;
  SkinToneResult: { result: any };
};

type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserTabs'>;

const UserScreen: React.FC = () => {
  const navigation = useNavigation<UserScreenNavigationProp>();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [permissionStatus, setPermissionStatus] = useState<string>('');

  const device = useCameraDevice('front');
  const camera = useRef<Camera>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const timer = setTimeout(() => {
      checkAndRequestPermissions();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isFocused && !hasPermission) {
      console.log('Screen focused, rechecking permissions...');
      checkAndRequestPermissions();
    }
  }, [isFocused]);

  useEffect(() => {
    if (!isLoggedIn) {
      // Navigate to Landing when logged out
      navigation.reset({
        index: 0,
        routes: [{ name: 'Landing' }],
      });
    }
  }, [isLoggedIn, navigation]);

  const requestAndroidCameraPermission = async () => {
    if (Platform.OS !== 'android') return false;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs camera access to record videos for health analysis.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      console.log('Android permission result:', granted);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasPermission(true);
        return true;
      } else {
        setHasPermission(false);
        return false;
      }
    } catch (err) {
      console.error('Android permission error:', err);
      return false;
    }
  };

  const checkAndRequestPermissions = async () => {
    try {
      console.log('Starting permission check...');

      let cameraPermission = await Camera.getCameraPermissionStatus();
      console.log('Vision camera permission status:', cameraPermission);
      setPermissionStatus(cameraPermission);

      if (cameraPermission === 'granted') {
        setHasPermission(true);
        return;
      }

      const visionCameraResult = await Camera.requestCameraPermission();
      console.log('Vision camera request result:', visionCameraResult);

      if (visionCameraResult === 'granted') {
        setHasPermission(true);
        return;
      }

      if (Platform.OS === 'android') {
        console.log('Trying Android native permission request...');
        const androidResult = await requestAndroidCameraPermission();

        if (androidResult) {
          return;
        }
      }

      showManualPermissionAlert();

    } catch (error) {
      console.error('Permission request failed:', error);
      setHasPermission(false);
      showManualPermissionAlert();
    }
  };

  const showManualPermissionAlert = () => {
    Alert.alert(
      'Camera Permission Required',
      Platform.OS === 'android'
        ? 'The app needs camera permission for health monitoring. Please enable it manually:\n\n1. Go to Settings\n2. Find this app\n3. Tap Permissions\n4. Enable Camera'
        : 'Please enable camera access in Settings to use this feature.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: () => Linking.openSettings(),
        },
        {
          text: 'Try Again',
          onPress: () => checkAndRequestPermissions(),
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            console.log('Logout button pressed - dispatching logoutUser');
            dispatch(logoutUser());
          },
        },
      ]
    );
  };

  const handleDetect = async () => {
    if (!hasPermission) {
      showManualPermissionAlert();
      return;
    }

    if (!camera.current || !device) {
      Alert.alert('Camera Error', 'Camera not available');
      return;
    }

    setIsRecording(true);
    setCountdown(10);

    let countdownInterval: NodeJS.Timeout | null = null;

    try {
      await camera.current.startRecording({
        flash: 'off',
        onRecordingFinished: async (video: VideoFile) => {
          console.log('Recording finished:', video);
          if (countdownInterval) clearInterval(countdownInterval);
          await uploadVideo(video.path);
        },
        onRecordingError: (error) => {
          console.error('Recording error:', error);
          Alert.alert('Recording Error', error.message);
          if (countdownInterval) clearInterval(countdownInterval);
          setIsRecording(false);
          setCountdown(null);
        },
      });

      let timeLeft = 10;
      countdownInterval = setInterval(() => {
        timeLeft -= 1;
        setCountdown(timeLeft);
        if (timeLeft <= 0) {
          if (countdownInterval) clearInterval(countdownInterval);
          stopRecording();
        }
      }, 1000);
    } catch (e) {
      console.error('Start Recording Failed:', e);
      if (countdownInterval) clearInterval(countdownInterval);
      setIsRecording(false);
      setCountdown(null);
      Alert.alert('Recording Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    if (camera.current) {
      try {
        await camera.current.stopRecording();
      } catch (error) {
        console.error('Stop recording error:', error);
      }
    }
    setIsRecording(false);
    setCountdown(null);
  };

  // const uploadVideo = async (videoPath: string) => {
  //   setIsProcessing(true);
  //   console.log("videoPath from upload video", videoPath);

  //   try {
  //     // Call the API to upload the video and get the result
  //     const result = await uploadHealthVideo(videoPath);

  //     console.log('Analysis Result:', result);

  //     // Navigate to results screen with API response
  //     (navigation as any).navigate('SkinToneResult', { result });

  //   } catch (error) {
  //     console.error('Upload Error:', error);

  //     // More specific error messages
  //     let errorMessage = 'Could not upload video. Please try again.';

  //     if (error instanceof Error) {
  //       if (error.message.includes('Network error')) {
  //         errorMessage = 'Network connection failed. Please check your internet and try again.';
  //       } else if (error.message.includes('Server error')) {
  //         errorMessage = 'Server is currently unavailable. Please try again later.';
  //       }
  //     }

  //     Alert.alert('Upload Failed', errorMessage);
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };
  const uploadVideo = async (videoPath: string) => {
    setIsProcessing(true);
    console.log("videoPath from upload video", videoPath);


    // const ok = await debugFilePath(videoPath);
    // if (!ok) {
    //   Alert.alert('File Not Found', 'The recorded video file could not be found or accessed.');
    //   setIsProcessing(false);
    //   return; 
    // }

    try {
      const result = await uploadHealthVideo(videoPath);
      console.log('Analysis result received:', result);
      // Alert.alert('API Response', JSON.stringify(result, null, 2));
      dispatch(setHealthResult(result));
      (navigation as any).navigate('SkinToneResult', { result });

    } catch (error) {
      console.error('Upload Error:', error);

      // let errorMessage: any = 'Could not upload video. Please try again.';

      // // Extract error message from the error object
      // if (error && typeof error === 'object' && 'error' in error) {
      //   errorMessage = error.error;
      // } else if (error instanceof Error) {
      //   errorMessage = error.message;
      // } else if (typeof error === 'string') {
      //   errorMessage = error;
      // }

      Toast.show({
        type: 'error',
        text1: 'Insufficient video data',
        visibilityTime: 4000,
      });

    } finally {
      setIsProcessing(false);
    }
  };


  // Permission screen
  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoText}>⚕️</Text>
              </View>
              <Text style={styles.headerTitle}>HealthVision AI</Text>
            </View>
          </View>

          <View style={styles.permissionContent}>
            <View style={styles.permissionCard}>
              <Text style={styles.permissionIcon}>📷</Text>
              <Text style={styles.permissionTitle}>Camera Access Required</Text>
              <Text style={styles.permissionText}>
                To monitor your health vitals, we need access to your camera for video analysis
              </Text>
              <Text style={styles.permissionStatus}>
                Status: {permissionStatus}
              </Text>

              {Platform.OS === 'android' && (
                <View style={styles.instructionsCard}>
                  <Text style={styles.instructionsTitle}>Enable manually:</Text>
                  <Text style={styles.instructionStep}>• Open device Settings</Text>
                  <Text style={styles.instructionStep}>• Find this app</Text>
                  <Text style={styles.instructionStep}>• Tap Permissions</Text>
                  <Text style={styles.instructionStep}>• Enable Camera</Text>
                </View>
              )}

              <View style={styles.permissionButtons}>
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={checkAndRequestPermissions}
                >
                  <Text style={styles.primaryButtonText}>Grant Permission</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => Linking.openSettings()}
                >
                  <Text style={styles.secondaryButtonText}>Open Settings</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Loading screen
  if (!device) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3182CE" />
          <Text style={styles.loadingText}>Initializing camera...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Main camera screen - NOW WITH SCROLLVIEW
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.mainScrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.welcomeText}>Hi Shiba</Text>
            <Text style={styles.instructionText}>
              Position your face in the oval and stay still for 10 seconds
            </Text>
          </View>
        </View>

        {/* Health Metrics Indicators */}
        <View style={styles.metricsRow}>
          <View style={styles.metricIndicator}>
            <Text style={styles.metricIcon}>❤️</Text>
            <Text style={styles.metricLabel}>Heart Rate</Text>
          </View>
          <View style={styles.metricIndicator}>
            <Text style={styles.metricIcon}>🫁</Text>
            <Text style={styles.metricLabel}>Oxygen</Text>
          </View>
          <View style={styles.metricIndicator}>
            <Text style={styles.metricIcon}>🧠</Text>
            <Text style={styles.metricLabel}>Stress</Text>
          </View>
        </View>

        {/* Camera Section */}
        <View style={styles.cameraSection}>
          <View style={styles.cameraFrame}>
            <View style={styles.cameraContainer}>
              <View style={styles.innerContainer}>
                {isFocused && device && (
                  <Camera
                    ref={camera}
                    style={styles.camera}
                    device={device}
                    isActive={true}
                    video={true}
                    audio={false}
                  />
                )}
              </View>
            </View>

            {/* Face guide overlay */}
            {/* <View style={styles.faceGuide}>
              <View style={styles.faceGuideTop} />
              <View style={styles.faceGuideBottom} />
            </View> */}

            {/* Recording indicator */}
            {isRecording && (
              <View style={styles.recordingIndicator}>
                <View style={styles.recordingDot} />
                <Text style={styles.recordingText}>Recording...</Text>
              </View>
            )}

            {/* Countdown */}
            {countdown !== null && (
              <View style={styles.countdownContainer}>
                <Text style={styles.countdown}>{countdown}</Text>
                <Text style={styles.countdownLabel}>seconds remaining</Text>
              </View>
            )}
          </View>
        </View>

        {/* Processing indicator */}
        {isProcessing && (
          <View style={styles.processingContainer}>
            <ActivityIndicator size="large" color="#3182CE" />
            <Text style={styles.processingText}>Analyzing your health...</Text>
            <Text style={styles.processingSubtext}>This may take a moment</Text>
          </View>
        )}

        {/* Action Button */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              (isRecording || isProcessing || !device) && styles.actionButtonDisabled
            ]}
            onPress={handleDetect}
            disabled={isRecording || isProcessing || !device}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>
              {isRecording ? 'Recording...' : isProcessing ? 'Processing...' : 'Start Health Scan'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.actionSubtext}>
            10-second contactless health monitoring
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserScreen;

// -------------------- STYLES --------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  mainScrollContent: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    right: 20,
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E6F3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    marginBottom: 30,
    marginTop: 10,
  },
  metricIndicator: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    minWidth: 70,
  },
  metricIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#4A5568',
    fontWeight: '500',
    textAlign: 'center',
  },
  cameraSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  cameraFrame: {
    position: 'relative',
    alignItems: 'center',
  },
  cameraContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#3182CE',
    borderRadius: 200,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#3182CE',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  innerContainer: {
    width: 280,
    height: 360,
    borderRadius: 200,
    backgroundColor: '#000000',
    overflow: 'hidden',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  faceGuide: {
    position: 'absolute',
    top: 50,
    left: '50%',
    marginLeft: -60,
    width: 120,
    height: 160,
    zIndex: 2,
  },
  faceGuideTop: {
    width: '100%',
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 1,
  },
  faceGuideBottom: {
    width: '100%',
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 1,
    marginTop: 156,
  },
  recordingIndicator: {
    position: 'absolute',
    top: -60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 3,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },
  recordingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  countdownContainer: {
    position: 'absolute',
    bottom: -90,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    zIndex: 3,
  },
  countdown: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  countdownLabel: {
    fontSize: 12,
    color: '#4A5568',
    fontWeight: '500',
  },
  processingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    marginBottom: 30,
  },
  processingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A202C',
    marginTop: 12,
  },
  processingSubtext: {
    fontSize: 14,
    color: '#4A5568',
    marginTop: 4,
  },
  actionContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#3182CE',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 40,
    width: '100%',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#3182CE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  actionButtonDisabled: {
    backgroundColor: '#A0AEC0',
    elevation: 0,
    shadowOpacity: 0,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  actionSubtext: {
    fontSize: 12,
    color: '#4A5568',
    marginTop: 8,
    textAlign: 'center',
  },
  // Permission screen styles
  permissionContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  permissionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  permissionIcon: {
    fontSize: 48,
    marginBottom: 20,
  },
  permissionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  permissionStatus: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  instructionsCard: {
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 8,
  },
  instructionStep: {
    fontSize: 13,
    color: '#4A5568',
    marginBottom: 4,
  },
  permissionButtons: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#3182CE',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryButtonText: {
    color: '#3182CE',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#4A5568',
    marginTop: 16,
  },
});
