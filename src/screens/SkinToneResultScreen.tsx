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

// For the date
const today = new Date();
const todayStr = today.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

// Two hardcoded previous analysis data
const previousResults = [
  {
    date: 'June 29, 2025',
    heartRate: 78.12,
    spo2: 97.15,
    stress: 'Medium',
    note: 'Slightly elevated stress detected. Consider relaxation.',
  },
  {
    date: 'July 10, 2025',
    heartRate: 82.00,
    spo2: 95.54,
    stress: 'Low',
    note: 'All metrics within normal range.',
  },
];

type SkinToneResultRouteProp = RouteProp<RootStackParamList, 'SkinToneResult'>;

const SkinToneResult = () => {
  const route = useRoute<SkinToneResultRouteProp>();
  const navigation = useNavigation();
  const { result } = route.params;

  // Prepare current result with today’s date
  const todayResult = {
    date: todayStr,
    heartRate: result.message.heart_rate,
    spo2: result.message.spo2_estimate,
    stress: result.message.stress,
    note: result.message.note || 'No additional notes.',
  };

  // Combine current and previous results, putting today’s result first
  const allResults = [todayResult, ...previousResults];

  const goBackToCamera = () => navigation.goBack();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.content}>
        <Text style={styles.heading}>Health Analysis Results</Text>

        {allResults.map((data, idx) => (
          <View style={styles.metricsBlock} key={idx}>
            <Text style={styles.dateText}>
              {data.date} {idx === 0 ? '(Today)' : ''}
            </Text>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Heart Rate:</Text>
              <Text style={styles.metricValue}>
                {typeof data.heartRate === 'number' ? `${data.heartRate} BPM` : '-'}
              </Text>
            </View>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>SpO₂:</Text>
              <Text style={styles.metricValue}>
                {typeof data.spo2 === 'number' ? `${data.spo2}%` : '-'}
              </Text>
            </View>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Stress Level:</Text>
              <Text style={styles.metricValue}>
                {data.stress ? data.stress : '-'}
              </Text>
            </View>
            <View style={styles.noteCard}>
              <Text style={styles.noteIcon}>ℹ️</Text>
              <Text style={styles.noteText}>{data.note}</Text>
            </View>
          </View>
        ))}

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
  dateText: {
    fontSize: 14,
    color: '#3182ce',
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'right',
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
    marginBottom: 6,
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
