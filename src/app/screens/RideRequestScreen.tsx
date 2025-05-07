import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

export default function RideRequestScreen({ navigation }: { navigation: any }) {
  const mapRef = useRef<MapView | null>(null);
  const [rideDetails, setRideDetails] = useState({
    id: "R-12345",
    passengerName: "Maria Santos",
    passengerRating: 4.9,
    pickupLocation: "#043 Brgy. Bagbag 1 Tanauan City, Batangas",
    dropoffLocation: "Brgy Hall, Bagbag 2 Tanauan City",
    estimatedDistance: "2.3 km",
    estimatedTime: "12 min",
    fare: 100,
  });

  const acceptRide = () => {
    navigation.navigate("AcceptedRide", { rideId: rideDetails.id });
  };

  const declineRide = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Ride Request</Text>
        <Text style={styles.timer}>00:20</Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}  
          initialRegion={{
            latitude: 14.084,
            longitude: 121.1491,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker
            coordinate={{ latitude: 14.083, longitude: 121.1491 }}
            title="Pickup"
            pinColor="#606c38"
          />
          <Marker
            coordinate={{ latitude: 14.086, longitude: 121.151 }}
            title="Dropoff"
            pinColor="#dda15e"
          />
        </MapView>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.passengerInfo}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require("../../../assets/favicon.png")}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.passengerDetails}>
            <Text style={styles.passengerName}>
              {rideDetails.passengerName}
            </Text>
            <View style={styles.ratingContainer}>
              <FontAwesome5 name="star" size={14} color="#dda15e" />
              <Text style={styles.ratingText}>
                {rideDetails.passengerRating}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.routeContainer}>
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

        <View style={styles.rideInfoContainer}>
          <View style={styles.rideInfoItem}>
            <MaterialIcons name="directions" size={20} color="#606c38" />
            <Text style={styles.rideInfoText}>
              {rideDetails.estimatedDistance}
            </Text>
          </View>
          <View style={styles.rideInfoItem}>
            <MaterialIcons name="access-time" size={20} color="#606c38" />
            <Text style={styles.rideInfoText}>{rideDetails.estimatedTime}</Text>
          </View>
          <View style={styles.rideInfoItem}>
            <FontAwesome5 name="money-bill-wave" size={18} color="#606c38" />
            <Text style={styles.rideInfoText}>
              ₱{rideDetails.fare.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.declineButton} onPress={declineRide}>
            <Text style={styles.declineButtonText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton} onPress={acceptRide}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fefae0",
  },
  timer: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#dda15e",
  },
  mapContainer: {
    height: Dimensions.get("window").height * 0.3,
    width: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: "#fefae0",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    padding: 20,
  },
  passengerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#dda15e",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  passengerDetails: {
    justifyContent: "center",
  },
  passengerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#606c38",
  },
  routeContainer: {
    backgroundColor: "#fefae0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#dda15e",
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
  rideInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  rideInfoItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rideInfoText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#283618",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  declineButton: {
    flex: 1,
    backgroundColor: "#fefae0",
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#606c38",
  },
  declineButtonText: {
    color: "#606c38",
    fontSize: 16,
    fontWeight: "bold",
  },
  acceptButton: {
    flex: 1,
    backgroundColor: "#606c38",
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  acceptButtonText: {
    color: "#fefae0",
    fontSize: 16,
    fontWeight: "bold",
  },
});
