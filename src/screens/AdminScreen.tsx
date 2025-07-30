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
import { useNavigation, StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Landing: undefined;
  Auth: undefined;
  Login: undefined;
  Signup: undefined;
  AdminDashboard: undefined;
  UserTabs: undefined;
  SkinToneResult: { result: any };
  UserHealthDetail: undefined; // Your detail screen route
};

interface User {
  userName: string;
  fullName: string;
  type: string;
  password: string;
}

const AdminScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const loggedInUserData = useSelector((state: RootState) => state.logged.user);

  // Example users array — replace with your actual source if needed
  const users = loggedInUserData ? [loggedInUserData] : [];

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
    // Navigate to UserHealthDetail screen
    navigation.navigate('UserHealthDetail', {
      // you can pass params here if needed, like user id or userName
      // e.g., userName: user.userName
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
