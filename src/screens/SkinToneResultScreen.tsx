import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import Svg, { Circle } from 'react-native-svg';

type SkinToneResultRouteProp = RouteProp<RootStackParamList, 'SkinToneResult'>;

const SkinToneResult = () => {
  const route = useRoute<SkinToneResultRouteProp>();
  const navigation = useNavigation();
  const { result } = route.params;

  
  const stressLevel = result?.stress_level ?? 35; 
  const oxygenLevel = result?.oxygen_level ?? 97; 
  const heartRate = result?.heart_rate ?? 72; 
  const analysisConfidence = result?.confidence ?? 88; 
  const skinCondition = result?.skin_condition ?? "Good";
  const recommendations = {
    stress_management: [
      "Deep breathing exercises",
      "Regular meditation",
      "Adequate sleep (7-8 hours)",
      "Physical exercise"
    ],
    oxygen_improvement: [
      "Regular cardio exercise",
      "Proper posture",
      "Deep breathing techniques",
      "Stay hydrated"
    ],
    general_health: [
      "Maintain regular sleep schedule",
      "Balanced nutrition",
      "Regular health checkups",
      "Stress reduction activities"
    ]
  };

  // Calculate progress circles
  const stressStrokeDashoffset = 377 - (377 * stressLevel) / 100;
  const oxygenStrokeDashoffset = 377 - (377 * oxygenLevel) / 100;

  const getStressLevelText = (level: number) => {
    if (level <= 30) return "Low";
    if (level <= 60) return "Moderate";
    return "High";
  };

  const getStressColor = (level: number) => {
    if (level <= 30) return "#4CAF50"; // Green
    if (level <= 60) return "#FF9800"; // Orange
    return "#F44336"; // Red
  };

  const getOxygenColor = (level: number) => {
    if (level >= 95) return "#4CAF50"; // Green
    if (level >= 90) return "#FF9800"; // Orange
    return "#F44336"; // Red
  };

  const goBackToCamera = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Health Analysis Results</Text>

        {/* Main Health Metrics */}
        <View style={styles.metricsRow}>
          {/* Stress Level Circle */}
          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>Stress Level</Text>
            <View style={styles.circleContainer}>
              <Svg height="120" width="120" viewBox="0 0 120 120">
                <Circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#E0E0E0"
                  strokeWidth="10"
                  fill="none"
                />
                <Circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke={getStressColor(stressLevel)}
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="314"
                  strokeDashoffset={stressStrokeDashoffset * 0.833}
                  strokeLinecap="round"
                  rotation="-90"
                  origin="60, 60"
                />
              </Svg>
              <View style={styles.circleText}>
                <Text style={[styles.circleValue, { color: getStressColor(stressLevel) }]}>
                  {stressLevel}%
                </Text>
                <Text style={styles.circleLabel}>{getStressLevelText(stressLevel)}</Text>
              </View>
            </View>
          </View>

          {/* Oxygen Level Circle */}
          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>Oxygen Level</Text>
            <View style={styles.circleContainer}>
              <Svg height="120" width="120" viewBox="0 0 120 120">
                <Circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#E0E0E0"
                  strokeWidth="10"
                  fill="none"
                />
                <Circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke={getOxygenColor(oxygenLevel)}
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="314"
                  strokeDashoffset={oxygenStrokeDashoffset * 0.833}
                  strokeLinecap="round"
                  rotation="-90"
                  origin="60, 60"
                />
              </Svg>
              <View style={styles.circleText}>
                <Text style={[styles.circleValue, { color: getOxygenColor(oxygenLevel) }]}>
                  {oxygenLevel}%
                </Text>
                <Text style={styles.circleLabel}>SpO₂</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Additional Health Metrics */}
        <View style={styles.additionalMetrics}>
          <View style={[styles.infoCard, { borderLeftColor: '#2196F3' }]}>
            <Text style={[styles.infoLabel, { color: '#2196F3' }]}>Heart Rate</Text>
            <Text style={styles.infoValue}>{heartRate} BPM</Text>
          </View>
          <View style={[styles.infoCard, { borderLeftColor: '#9C27B0' }]}>
            <Text style={[styles.infoLabel, { color: '#9C27B0' }]}>Skin Condition</Text>
            <Text style={styles.infoValue}>{skinCondition}</Text>
          </View>
          <View style={[styles.infoCard, { borderLeftColor: '#607D8B' }]}>
            <Text style={[styles.infoLabel, { color: '#607D8B' }]}>Analysis Confidence</Text>
            <Text style={styles.infoValue}>{analysisConfidence}%</Text>
          </View>
        </View>

        {/* Stress Management Recommendations */}
        {stressLevel > 40 && (
          <View style={styles.recommendationsCard}>
            <Text style={styles.sectionTitle}>🧘 Stress Management</Text>
            <View style={styles.tagContainer}>
              {recommendations.stress_management.map((tip: string, index: number) => (
                <View key={index} style={[styles.tag, styles.stressTag]}>
                  <Text style={[styles.tagText, styles.stressTagText]}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Oxygen Level Recommendations */}
        {oxygenLevel < 96 && (
          <View style={styles.recommendationsCard}>
            <Text style={styles.sectionTitle}>🫁 Improve Oxygen Levels</Text>
            <View style={styles.tagContainer}>
              {recommendations.oxygen_improvement.map((tip: string, index: number) => (
                <View key={index} style={[styles.tag, styles.oxygenTag]}>
                  <Text style={[styles.tagText, styles.oxygenTagText]}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* General Health Tips */}
        <View style={styles.recommendationsCard}>
          <Text style={styles.sectionTitle}>💡 General Health Tips</Text>
          <View style={styles.tagContainer}>
            {recommendations.general_health.map((tip: string, index: number) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Health Status Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>📊 Health Summary</Text>
          <Text style={styles.summaryText}>
            Your stress level is {getStressLevelText(stressLevel).toLowerCase()} at {stressLevel}%. 
            Your oxygen saturation is {oxygenLevel >= 95 ? 'normal' : oxygenLevel >= 90 ? 'acceptable' : 'concerning'} at {oxygenLevel}%.
            {stressLevel > 60 && " Consider stress reduction techniques."}
            {oxygenLevel < 95 && " Monitor your oxygen levels and consult a healthcare provider if needed."}
          </Text>
        </View>

        {/* Action Button */}
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
    marginBottom: 25,
    color: '#2E3A59',
    textAlign: 'center',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  metricTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E3A59',
    marginBottom: 15,
    textAlign: 'center',
  },
  circleContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    position: 'absolute',
    alignItems: 'center',
  },
  circleValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  circleLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  additionalMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  recommendationsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E3A59',
    marginBottom: 15,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  tagText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  stressTag: {
    backgroundColor: '#FFF3E0',
    borderColor: '#FF9800',
  },
  stressTagText: {
    color: '#FF9800',
  },
  oxygenTag: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
  },
  oxygenTagText: {
    color: '#4CAF50',
  },
  summaryCard: {
    backgroundColor: '#F3E5F5',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#9C27B0',
  },
  summaryText: {
    fontSize: 16,
    color: '#4A148C',
    lineHeight: 24,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
