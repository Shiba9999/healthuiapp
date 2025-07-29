// 

import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Animated,
  StatusBar,
  SafeAreaView,
  Platform
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  Landing: undefined;
  Auth: undefined;
  Login: undefined;
  Signup: undefined;
};

type LandingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Landing'>;
};

const LandingScreen = ({ navigation }: LandingScreenProps) => {
  const [logoScale] = useState(new Animated.Value(0));
  const [logoOpacity] = useState(new Animated.Value(0));
  const [titleOpacity] = useState(new Animated.Value(0));
  const [subtitleOpacity] = useState(new Animated.Value(0));
  const [progressWidth] = useState(new Animated.Value(0));

  useEffect(() => {
    // Start animations sequence
    const startAnimations = () => {
      // Logo animation
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();

      // Title animation (delayed)
      setTimeout(() => {
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      }, 400);

      // Subtitle animation (more delayed)
      setTimeout(() => {
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      }, 800);

      // Progress bar animation
      setTimeout(() => {
        Animated.timing(progressWidth, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      }, 1200);
    };

    startAnimations();

    // Navigate after animations
    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Background gradient effect */}
      <View style={styles.backgroundGradient}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {/* Logo section */}
        <View style={styles.logoSection}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                transform: [{ scale: logoScale }],
                opacity: logoOpacity,
              },
            ]}
          >
            <View style={styles.logoIcon}>
              <Text style={styles.logoEmoji}>⚕️</Text>
            </View>
            <View style={styles.logoPulse} />
          </Animated.View>

          <Animated.Text
            style={[
              styles.appTitle,
              { opacity: titleOpacity }
            ]}
          >
            HealthVision AI
          </Animated.Text>

          <Animated.Text
            style={[
              styles.appSubtitle,
              { opacity: subtitleOpacity }
            ]}
          >
            Professional Health Monitoring
          </Animated.Text>
        </View>

        {/* Feature highlights */}
        <Animated.View
          style={[
            styles.featuresContainer,
            { opacity: subtitleOpacity }
          ]}
        >
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📱</Text>
            <Text style={styles.featureText}>10-Second Analysis</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🏥</Text>
            <Text style={styles.featureText}>Medical Grade</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔒</Text>
            <Text style={styles.featureText}>Secure & Private</Text>
          </View>
        </Animated.View>
      </View>

      {/* Bottom section with progress */}
      <View style={styles.bottomSection}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Initializing...</Text>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progressWidth.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
        </View>

        {/* Trust indicators */}
        <View style={styles.trustIndicators}>
          <Text style={styles.trustText}>
            🔐 HIPAA Compliant • FDA Approved • Clinically Validated
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  circle1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(49, 130, 206, 0.05)',
  },
  circle2: {
    position: 'absolute',
    top: height * 0.3,
    left: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(49, 130, 206, 0.03)',
  },
  circle3: {
    position: 'absolute',
    bottom: -80,
    right: -80,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(49, 130, 206, 0.04)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#E6F3FF',
    elevation: 8,
    shadowColor: '#3182CE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    zIndex: 2,
  },
  logoEmoji: {
    fontSize: 48,
  },
  logoPulse: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: 'rgba(49, 130, 206, 0.3)',
    zIndex: 1,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A202C',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    fontWeight: '500',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#4A5568',
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomSection: {
    paddingHorizontal: 30,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#4A5568',
    fontWeight: '500',
    marginBottom: 16,
  },
  progressBarContainer: {
    width: 200,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3182CE',
    borderRadius: 2,
  },
  trustIndicators: {
    alignItems: 'center',
  },
  trustText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 18,
  },
});

export default LandingScreen;
