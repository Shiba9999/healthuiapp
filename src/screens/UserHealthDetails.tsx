import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';  // Adjust path as per your project

const UserHealthDetails = () => {
  const healthResData = useSelector((state: RootState) => state.health.result);

  // Defensive: handle if data missing or loading
  const data = healthResData?.message || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Health Analysis Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Heart Rate</Text>
        <Text style={styles.value}>
          {typeof data.heart_rate === 'number' ? `${data.heart_rate.toFixed(1)} BPM` : '—'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>SpO₂ Estimate</Text>
        <Text style={styles.value}>
          {typeof data.spo2_estimate === 'number' ? `${data.spo2_estimate.toFixed(1)}%` : '—'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Stress Level</Text>
        <Text style={styles.value}>{data.stress ?? '—'}</Text>
      </View>

      <View style={[styles.card, styles.noteCard]}>
        <Text style={styles.noteLabel}>Note</Text>
        <Text style={styles.noteText}>{data.note || 'No additional notes.'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8fafc',
    flexGrow: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#214d72',
    marginBottom: 24,
    alignSelf: 'center',
    letterSpacing: 0.4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#214d72',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#29537a',
    marginBottom: 8,
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0ca678',
  },
  noteCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#3182ce',
    paddingVertical: 20,
  },
  noteLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#214d72',
    marginBottom: 6,
  },
  noteText: {
    fontSize: 15,
    color: '#214d72',
    lineHeight: 20,
  },
});

export default UserHealthDetails;
