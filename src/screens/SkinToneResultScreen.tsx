import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type SkinToneResultRouteProp = RouteProp<RootStackParamList, 'SkinToneResult'>;

const SkinToneResult = () => {
  const route = useRoute<SkinToneResultRouteProp>();
  const navigation = useNavigation();
  const { result } = route.params;

  const heartRate = result.message.heart_rate;
  const note = result.message.note;
  const spo2 = result.message.spo2_estimate;
  const stress = result.message.stress;

 

  const goBackToCamera = () => navigation.goBack();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.content}>
        <Text style={styles.heading}>Health Analysis Results</Text>

        <View style={styles.metricsBlock}>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Heart Rate:</Text>
            <Text style={styles.metricValue}>
              {typeof heartRate === 'number' ? `${heartRate} BPM` : '-'}
            </Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>SpO₂:</Text>
            <Text style={styles.metricValue}>
              {typeof spo2 === 'number' ? `${spo2}%` : '-'}
            </Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Stress Level:</Text>
            <Text style={styles.metricValue}>
              {stress ? stress : '-'}
            </Text>
          </View>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteIcon}>ℹ️</Text>
          <Text style={styles.noteText}>{note || 'No additional notes.'}</Text>
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={goBackToCamera}>
          <Text style={styles.actionButtonText}>Analyze Again</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SkinToneResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#214d72',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  metricsBlock: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#214d72',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  metricLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#29537a',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0ca678',
  },
  noteCard: {
    backgroundColor: '#f1f5fa',
    borderRadius: 15,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    borderLeftWidth: 5,
    borderLeftColor: '#3182ce',
  },
  noteIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  noteText: {
    fontSize: 15,
    color: '#214d72',
    flex: 1,
    flexWrap: 'wrap',
  },
  actionButton: {
    backgroundColor: '#3182ce',
    borderRadius: 12,
    paddingVertical: 17,
    alignItems: 'center',
    marginTop: 18,
    elevation: 3,
    shadowColor: '#3182ce',
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.7,
  },
});
