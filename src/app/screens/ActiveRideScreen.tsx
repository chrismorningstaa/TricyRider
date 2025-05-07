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
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import MapView, { Marker, Polyline } from "react-native-maps";

export default function ActiveRideScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const mapRef = useRef<MapView | null>(null);
  const { rideId } = route.params || { rideId: "R-12345" };

  const [rideStage, setRideStage] = useState("enroute_to_pickup"); // enroute_to_pickup, arrived_at_pickup, enroute_to_dropoff
  const [rideDetails, setRideDetails] = useState({
    passengerName: "Maria Santos",
    passengerMobile: "+63 912 345 6789",
    pickupLocation: "#043 Brgy. Bagbag 1 Tanauan City, Batangas",
    dropoffLocation: "Brgy Hall, Bagbag 2 Tanauan City",
    fare: 100,
    tip: 0,
    total: 100,
  });

  const getHeaderText = () => {
    switch (rideStage) {
      case "enroute_to_pickup":
        return "On the way to pickup";
      case "arrived_at_pickup":
        return "Arrived at pickup point";
      case "enroute_to_dropoff":
        return "On the way to dropoff";
      default:
        return "Active Ride";
    }
  };

  const getActionButtonText = () => {
    switch (rideStage) {
      case "enroute_to_pickup":
        return "Arrived at Pickup";
      case "arrived_at_pickup":
        return "Start Ride";
      case "enroute_to_dropoff":
        return "Complete Ride";
      default:
        return "Next";
    }
  };

  const handleActionButtonPress = () => {
    if (rideStage === "enroute_to_pickup") {
      setRideStage("arrived_at_pickup");
    } else if (rideStage === "arrived_at_pickup") {
      setRideStage("enroute_to_dropoff");
    } else if (rideStage === "enroute_to_dropoff") {
      navigation.navigate("RideComplete", { rideId });
    }
  };

  const handleCancelRide = () => {
    // Show confirmation dialog before cancelling
    navigation.navigate("Main");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fefae0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{getHeaderText()}</Text>
        <View style={{ width: 24 }} />
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
          <Marker
            coordinate={{ latitude: 14.0845, longitude: 121.15 }}
            title="You"
          >
            <View style={styles.driverMarker}>
              <FontAwesome5 name="motorcycle" size={14} color="#fefae0" />
            </View>
          </Marker>
          <Polyline
            coordinates={[
              { latitude: 14.0845, longitude: 121.15 },
              { latitude: 14.083, longitude: 121.1491 },
              { latitude: 14.086, longitude: 121.151 },
            ]}
            strokeColor="#283618"
            strokeWidth={4}
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
            <View style={styles.contactRow}>
              <Text style={styles.passengerMobile}>
                {rideDetails.passengerMobile}
              </Text>
              <TouchableOpacity style={styles.callButton}>
                <FontAwesome5 name="phone" size={14} color="#fefae0" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.routeContainer}>
          <View style={styles.locationRow}>
            <View style={styles.locationDot}>
              <View
                style={[
                  styles.greenDot,
                  rideStage === "enroute_to_pickup" ? styles.activeDot : null,
                ]}
              />
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
              <View
                style={[
                  styles.orangeDot,
                  rideStage === "enroute_to_dropoff" ? styles.activeDot : null,
                ]}
              />
            </View>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>DROPOFF</Text>
              <Text style={styles.locationText}>
                {rideDetails.dropoffLocation}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.fareContainer}>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Base Fare</Text>
            <Text style={styles.fareValue}>₱{rideDetails.fare.toFixed(2)}</Text>
          </View>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Tip</Text>
            <Text style={styles.fareValue}>₱{rideDetails.tip.toFixed(2)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.fareRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              ₱{rideDetails.total.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {rideStage !== "enroute_to_dropoff" && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelRide}
            >
              <Text style={styles.cancelButtonText}>Cancel Ride</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[
              styles.actionButton,
              rideStage === "enroute_to_dropoff"
                ? styles.actionButtonFull
                : styles.actionButtonHalf,
            ]}
            onPress={handleActionButtonPress}
          >
            <Text style={styles.actionButtonText}>{getActionButtonText()}</Text>
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
  mapContainer: {
    height: Dimensions.get("window").height * 0.3,
    width: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  driverMarker: {
    backgroundColor: "#283618",
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fefae0",
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
    flex: 1,
    justifyContent: "center",
  },
  passengerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  passengerMobile: {
    fontSize: 14,
    color: "#606c38",
  },
  callButton: {
    backgroundColor: "#606c38",
    borderRadius: 20,
    padding: 8,
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
  activeDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 3,
    borderColor: "#fefae0",
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
  fareContainer: {
    backgroundColor: "#fefae0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#dda15e",
  },
  fareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  fareLabel: {
    fontSize: 14,
    color: "#606c38",
  },
  fareValue: {
    fontSize: 14,
    color: "#283618",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#dda15e",
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: "#283618",
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 16,
    color: "#283618",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  cancelButton: {
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
  cancelButtonText: {
    color: "#606c38",
    fontSize: 16,
    fontWeight: "bold",
  },
  actionButton: {
    backgroundColor: "#606c38",
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonHalf: {
    flex: 1,
    marginLeft: 10,
  },
  actionButtonFull: {
    flex: 1,
  },
  actionButtonText: {
    color: "#fefae0",
    fontSize: 16,
    fontWeight: "bold",
  },
});
