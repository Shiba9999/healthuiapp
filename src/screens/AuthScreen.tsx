import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';

const AuthScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF" 
      />
      
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoText}>⚕️</Text>
          </View>
          <Text style={styles.appTitle}>HealthVision AI</Text>
          <Text style={styles.appDescription}>
            Monitor your health in 10 seconds with AI-powered video analysis
          </Text>
        </View>

        {/* Health Metrics - Compact Grid */}
        <View style={styles.metricsSection}>
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricIcon}>❤️</Text>
              <Text style={styles.metricText}>Heart Rate</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricIcon}>🫁</Text>
              <Text style={styles.metricText}>Oxygen Level</Text>
            </View>
          </View>
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricIcon}>🧠</Text>
              <Text style={styles.metricText}>Stress Level</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricIcon}>📊</Text>
              <Text style={styles.metricText}>Health Report</Text>
            </View>
          </View>
        </View>

        {/* Spacer to push buttons to bottom */}
        <View style={styles.spacer} />

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate('Signup')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Start Health Monitoring</Text>
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.footerText}>
            🔒 Secure • 📱 Contactless • 🏥 Medical Grade
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E6F3FF',
  },
  logoText: {
    fontSize: 32,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A202C',
    textAlign: 'center',
    marginBottom: 12,
  },
  appDescription: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  metricsSection: {
    paddingHorizontal: 10,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricItem: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metricIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  metricText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D3748',
    textAlign: 'center',
  },
  spacer: {
    flex: 1,
  },
  buttonSection: {
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  button: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  primaryButton: {
    backgroundColor: '#3182CE',
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#3182CE',
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#3182CE',
  },
  footerText: {
    fontSize: 12,
    color: '#718096',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 16,
  },
});

export default AuthScreen;
