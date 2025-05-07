import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function RiderHomeScreen({ navigation }: { navigation: any }) {
  const [isOnline, setIsOnline] = useState(false);
  const [todayEarnings, setTodayEarnings] = useState(750);
  const [pendingRides, setPendingRides] = useState(2);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  const handleGoToProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header2}>
        <Text style={styles.logoText}>TRICYRIDE</Text>
        <Text style={styles.tagline}>ANG SERVICE NG BAYAN</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={handleGoToProfile}
        >
          <Ionicons name="person-circle-outline" size={26} color="#283618" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.nameText}>Christian Mendoza</Text>
        </View>

        <View style={styles.earningsCard}>
          <Text style={styles.earningsTitle}>Today's Earnings</Text>
          <Text style={styles.earningsAmount}>
            ₱ {todayEarnings.toFixed(2)}
          </Text>
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => navigation.navigate("Earnings")}
          >
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <FontAwesome5 name="route" size={24} color="#606c38" />
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Rides Today</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="pending" size={24} color="#606c38" />
            <Text style={styles.statValue}>{pendingRides}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <FontAwesome5 name="star" size={24} color="#606c38" />
            <Text style={styles.statValue}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Recent Rides</Text>
        </View>

        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.rideHistoryItem}>
            <View style={styles.rideInfo}>
              <Text style={styles.rideName}>Passenger #{item}</Text>
              <Text style={styles.rideRoute}>
                Brgy. Bagbag 1 → Brgy. Bagbag 2
              </Text>
              <Text style={styles.rideTime}>Today, 2:30 PM</Text>
            </View>
            <View style={styles.rideFare}>
              <Text style={styles.fareAmount}>₱100.00</Text>
            </View>
          </View>
        ))}

        <View style={styles.testButtons}>
          <TouchableOpacity
            style={styles.testButton}
            onPress={() => navigation.navigate("RideRequest")}
          >
            <Text style={styles.testButtonText}>Test Ride Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#dda15e",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header2: {
    padding: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#283618",
  },
  tagline: {
    fontSize: 12,
    color: "#606c38",
    fontStyle: "italic",
  },
  profileButton: {
    padding: 5,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fefae0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  profileImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  profileInfo: {
    justifyContent: "center",
  },
  welcomeCard: {
    backgroundColor: "#fefae0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 4,
  },
  nameText: {
    fontSize: 16,
    color: "#606c38",
  },
  onlineButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
  },
  onlineActive: {
    backgroundColor: "#283618",
    borderColor: "#283618",
  },
  onlineInactive: {
    backgroundColor: "transparent",
    borderColor: "#283618",
  },
  onlineButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  onlineActiveText: {
    color: "#fefae0",
  },
  onlineInactiveText: {
    color: "#283618",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  earningsCard: {
    backgroundColor: "#dda15e",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  earningsTitle: {
    fontSize: 16,
    color: "#283618",
    marginBottom: 8,
  },
  earningsAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 12,
  },
  viewDetailsButton: {
    backgroundColor: "#606c38",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewDetailsText: {
    color: "#fefae0",
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fefae0",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#dda15e",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#283618",
    marginVertical: 6,
  },
  statLabel: {
    fontSize: 12,
    color: "#606c38",
  },
  sectionTitle: {
    marginBottom: 12,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#283618",
  },
  rideHistoryItem: {
    backgroundColor: "#fefae0",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#dda15e",
  },
  rideInfo: {
    flex: 1,
  },
  rideName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 4,
  },
  rideRoute: {
    fontSize: 14,
    color: "#606c38",
    marginBottom: 4,
  },
  rideTime: {
    fontSize: 12,
    color: "#606c38",
  },
  rideFare: {
    justifyContent: "center",
  },
  fareAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#283618",
  },
  testButtons: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  testButton: {
    backgroundColor: "#dda15e",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  testButtonText: {
    color: "#fefae0",
    fontWeight: "bold",
  },
});
