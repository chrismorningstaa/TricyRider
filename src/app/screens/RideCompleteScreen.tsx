import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";

export default function RideCompleteScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { rideId } = route.params || { rideId: "R-12345" };

  const rideDetails = {
    passengerName: "Maria Santos",
    pickupLocation: "#043 Brgy. Bagbag 1 Tanauan City, Batangas",
    dropoffLocation: "Brgy Hall, Bagbag 2 Tanauan City",
    date: "April 3, 2025",
    time: "2:30 PM",
    distance: "2.3 km",
    duration: "12 min",
    fare: 100,
    tip: 20,
    total: 120,
  };

  const handleGoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ride Complete</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.successContainer}>
          <View style={styles.successCircle}>
            <FontAwesome5 name="check" size={40} color="#fefae0" />
          </View>
          <Text style={styles.successText}>Trip Successfully Completed!</Text>
          <Text style={styles.successSubtext}>Ride ID: {rideId}</Text>
        </View>

        <View style={styles.fareContainer}>
          <Text style={styles.totalAmountLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>
            ₱{rideDetails.total.toFixed(2)}
          </Text>
          <View style={styles.fareBreakdown}>
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Base Fare</Text>
              <Text style={styles.fareValue}>
                ₱{rideDetails.fare.toFixed(2)}
              </Text>
            </View>
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Tip</Text>
              <Text style={styles.fareValue}>
                ₱{rideDetails.tip.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.rideDetailsCard}>
          <Text style={styles.sectionTitle}>Ride Details</Text>

          <View style={styles.passengerInfo}>
            <View style={styles.profileImageContainer}>
              <Image
                source={require("../../../assets/favicon.png")}
                style={styles.profileImage}
              />
            </View>
            <Text style={styles.passengerName}>
              {rideDetails.passengerName}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{rideDetails.date}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>{rideDetails.time}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Distance</Text>
            <Text style={styles.detailValue}>{rideDetails.distance}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{rideDetails.duration}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.locationSection}>
            <View style={styles.locationRow}>
              <View style={styles.locationDot}>
                <View style={styles.greenDot} />
              </View>
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationLabel}>PICKUP</Text>
                <Text style={styles.locationText}>
                  {rideDetails.pickupLocation}
                </Text>
              </View>
            </View>

            <View style={styles.verticalLine} />

            <View style={styles.locationRow}>
              <View style={styles.locationDot}>
                <View style={styles.orangeDot} />
              </View>
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationLabel}>DROPOFF</Text>
                <Text style={styles.locationText}>
                  {rideDetails.dropoffLocation}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefae0",
  },
  header: {
    backgroundColor: "#283618",
    padding: 16,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fefae0",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  successContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#606c38",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  successText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 8,
  },
  successSubtext: {
    fontSize: 14,
    color: "#606c38",
  },
  fareContainer: {
    backgroundColor: "#dda15e",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  totalAmountLabel: {
    fontSize: 16,
    color: "#283618",
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 16,
  },
  fareBreakdown: {
    width: "100%",
    backgroundColor: "rgba(254, 250, 224, 0.3)",
    borderRadius: 8,
    padding: 12,
  },
  fareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  fareLabel: {
    fontSize: 14,
    color: "#283618",
  },
  fareValue: {
    fontSize: 14,
    color: "#283618",
    fontWeight: "500",
  },
  rideDetailsCard: {
    backgroundColor: "#fefae0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#dda15e",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 16,
  },
  passengerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#dda15e",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  passengerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#283618",
  },
  divider: {
    height: 1,
    backgroundColor: "#dda15e",
    marginVertical: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: "#606c38",
  },
  detailValue: {
    fontSize: 14,
    color: "#283618",
    fontWeight: "500",
  },
  locationSection: {
    marginTop: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 8,
  },
  locationDot: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  greenDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#606c38",
  },
  orangeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#dda15e",
  },
  verticalLine: {
    width: 2,
    height: 20,
    backgroundColor: "#dda15e",
    marginLeft: 12,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: "#606c38",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#283618",
  },
  footer: {
    padding: 16,
    backgroundColor: "#fefae0",
    borderTopWidth: 1,
    borderTopColor: "#dda15e",
  },
  homeButton: {
    backgroundColor: "#606c38",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  homeButtonText: {
    color: "#fefae0",
    fontSize: 16,
    fontWeight: "bold",
  },
});
