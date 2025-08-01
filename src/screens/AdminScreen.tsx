import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../reduxSlices/userSlice';
import { RootState } from '../store';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Landing: undefined;
  Auth: undefined;
  Login: undefined;
  Signup: undefined;
  AdminDashboard: undefined;
  UserTabs: undefined;
  SkinToneResult: { result: any };
  UserHealthDetail: { healthData: any; userName: string };
};

interface User {
  userName: string;
  fullName: string;
  type: string;
  password: string;
  healthData?: any;
}

const AdminScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const loggedInUserData = useSelector((state: RootState) => state.logged.user);
  const healthResData = useSelector((state: RootState) => state.health.result);

  // Two hardcoded demo users with demo health data
  const demoUsers: User[] = [
    {
      userName: 'aksh',
      fullName: 'akash',
      type: 'user',
      password: 'password123',
      healthData: {
        message: {
          heart_rate: 72.1,
          spo2_estimate: 96.5,
          stress: 'Medium',
          note: 'Keep hydrated and relax.',
        },
      },
    },
    {
      userName: 'subhashis',
      fullName: 'subhashis',
      type: 'user',
      password: 'alicepass',
      healthData: {
        message: {
          heart_rate: 80.6,
          spo2_estimate: 97.0,
          stress: 'High',
          note: 'Stress levels high. Recommend meditation.',
        },
      },
    },
  ];

  // Attach real health data to logged-in user (if any)
  const actualUser = loggedInUserData
    ? { ...loggedInUserData, healthData: healthResData }
    : null;
  // Compose user array: actual user at top, no dupes
  const users = actualUser
    ? [actualUser, ...demoUsers.filter(u => u.userName !== actualUser.userName)]
    : demoUsers;

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Landing' }],
      });
    }
  }, [isLoggedIn, navigation]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleUserCardPress = (user: User) => {
    navigation.navigate('UserHealthDetail', {
      healthData: user.healthData || null,
      userName: user.userName,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {users.length > 0 ? (
          users.map((user, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.card}
              onPress={() => handleUserCardPress(user)}
              activeOpacity={0.7}
            >
              <Text style={styles.cardTitle}>{user.fullName}</Text>
              <Text style={styles.cardDetail}>
                Username: <Text style={{ fontWeight: 'bold' }}>{user.userName}</Text>
              </Text>
              <Text style={styles.cardDetail}>Type: {user.type}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>No users found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    paddingRight: 16,
    paddingLeft: 22,
    paddingTop: 18,
    paddingBottom: 12,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#214d72',
    letterSpacing: 0.5,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 7,
    elevation: 3,
    shadowColor: '#dc3545',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 38,
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    paddingVertical: 28,
    paddingHorizontal: 26,
    borderRadius: 16,
    marginBottom: 18,
    shadowColor: '#14304c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#254974',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  cardDetail: {
    fontSize: 16,
    color: '#466092',
    marginTop: 6,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 17,
    marginTop: 60,
  },
});

export default AdminScreen;
