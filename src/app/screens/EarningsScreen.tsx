import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function EarningsScreen({ navigation }: { navigation: any }) {
  const [selectedPeriod, setSelectedPeriod] = useState("today"); 
  const earningsData = {
    today: {
      total: 750,
      rides: 12,
      tips: 150,
      hours: 8,
      chart: [65, 80, 120, 95, 180, 130, 80],
      recentRides: [
        { id: "R-12345", time: "2:30 PM", fare: 100, tip: 20 },
        { id: "R-12344", time: "1:15 PM", fare: 85, tip: 15 },
        { id: "R-12343", time: "11:40 AM", fare: 90, tip: 0 },
        { id: "R-12342", time: "9:20 AM", fare: 110, tip: 30 },
      ],
    },
    week: {
      total: 4850,
      rides: 78,
      tips: 950,
      hours: 42,
      chart: [750, 820, 650, 830, 720, 580, 500],
      recentRides: [
        { id: "R-12341", time: "Yesterday, 4:45 PM", fare: 95, tip: 15 },
        { id: "R-12340", time: "Yesterday, 2:10 PM", fare: 120, tip: 25 },
        { id: "R-12339", time: "Yesterday, 11:30 AM", fare: 80, tip: 0 },
        { id: "R-12338", time: "2 days ago, 5:15 PM", fare: 110, tip: 20 },
      ],
    },
    month: {
      total: 18750,
      rides: 312,
      tips: 3850,
      hours: 168,
      chart: [4200, 3800, 4500, 6250],
      recentRides: [
        { id: "R-12337", time: "Last week, Friday", fare: 150, tip: 30 },
        { id: "R-12336", time: "Last week, Thursday", fare: 95, tip: 15 },
        { id: "R-12335", time: "Last week, Tuesday", fare: 85, tip: 10 },
        { id: "R-12334", time: "2 weeks ago, Monday", fare: 130, tip: 25 },
      ],
    },
  };

  const currentData = earningsData[selectedPeriod as keyof typeof earningsData];

  const renderChart = () => {
    const chartData = currentData.chart;
    const maxValue = Math.max(...chartData);

    return (
      <View style={styles.chartContainer}>
        <View style={styles.chart}>
          {chartData.map((value, index) => (
            <View key={index} style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  {
                    height: (value / maxValue) * 120,
                    backgroundColor: index % 2 === 0 ? "#606c38" : "#dda15e",
                  },
                ]}
              />
              <Text style={styles.barLabel}>
                {selectedPeriod === "today"
                  ? `${index + 1}h`
                  : selectedPeriod === "week"
                  ? ["M", "T", "W", "T", "F", "S", "S"][index]
                  : `W${index + 1}`}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
         <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#283618" />
        </TouchableOpacity>
        <Text style={styles.logoText}>TRICYRIDE</Text>
        <Text style={styles.headerTitle}>Earnings</Text>
      </View>

      <View style={styles.periodSelector}>
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === "today" && styles.periodButtonActive,
          ]}
          onPress={() => setSelectedPeriod("today")}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === "today" && styles.periodButtonTextActive,
            ]}
          >
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === "week" && styles.periodButtonActive,
          ]}
          onPress={() => setSelectedPeriod("week")}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === "week" && styles.periodButtonTextActive,
            ]}
          >
            This Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === "month" && styles.periodButtonActive,
          ]}
          onPress={() => setSelectedPeriod("month")}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === "month" && styles.periodButtonTextActive,
            ]}
          >
            This Month
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>
            {selectedPeriod === "today"
              ? "Today's Earnings"
              : selectedPeriod === "week"
              ? "This Week's Earnings"
              : "This Month's Earnings"}
          </Text>
          <Text style={styles.summaryAmount}>
            ₱{currentData.total.toFixed(2)}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <FontAwesome5 name="motorcycle" size={20} color="#606c38" />
            <Text style={styles.statValue}>{currentData.rides}</Text>
            <Text style={styles.statLabel}>Rides</Text>
          </View>
          <View style={styles.statCard}>
            <FontAwesome5 name="hand-holding-usd" size={20} color="#606c38" />
            <Text style={styles.statValue}>₱{currentData.tips}</Text>
            <Text style={styles.statLabel}>Tips</Text>
          </View>
          <View style={styles.statCard}>
            <FontAwesome5 name="clock" size={20} color="#606c38" />
            <Text style={styles.statValue}>{currentData.hours}h</Text>
            <Text style={styles.statLabel}>Online Hours</Text>
          </View>
        </View>

        {renderChart()}

        <View style={styles.recentRidesSection}>
          <Text style={styles.sectionTitle}>Recent Rides</Text>

          {currentData.recentRides.map((ride, index) => (
            <View key={index} style={styles.rideItem}>
              <View style={styles.rideInfo}>
                <Text style={styles.rideId}>Ride #{ride.id.substring(2)}</Text>
                <Text style={styles.rideTime}>{ride.time}</Text>
              </View>
              <View style={styles.rideFare}>
                <Text style={styles.fareAmount}>
                  ₱{(ride.fare + ride.tip).toFixed(2)}
                </Text>
                {ride.tip > 0 && (
                  <Text style={styles.tipAmount}>incl. ₱{ride.tip} tip</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefae0",
  },
  header: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 16,
    color: '#606c38',
    marginTop: 5,
  },
  periodSelector: {
    flexDirection: "row",
    backgroundColor: "#fefae0",
    padding: 8,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 4,
  },
  periodButtonActive: {
    backgroundColor: "#606c38",
  },
  periodButtonText: {
    fontSize: 14,
    color: "#283618",
    fontWeight: "500",
  },
  periodButtonTextActive: {
    color: "#fefae0",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  summaryCard: {
    backgroundColor: "#dda15e",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    color: "#283618",
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#283618",
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#283618",
    marginVertical: 6,
  },
  statLabel: {
    fontSize: 12,
    color: "#606c38",
  },
  chartContainer: {
    backgroundColor: "#fefae0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#dda15e",
  },
  chart: {
    height: 150,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  barContainer: {
    flex: 1,
    alignItems: "center",
  },
  bar: {
    width: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    color: "#606c38",
  },
  recentRidesSection: {
    marginBottom: 24,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#283618',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 16,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    padding: 7,
  },
  rideItem: {
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
  rideId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 4,
  },
  rideTime: {
    fontSize: 14,
    color: "#606c38",
  },
  rideFare: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  fareAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 4,
  },
  tipAmount: {
    fontSize: 12,
    color: "#606c38",
    fontStyle: "italic",
  },
});
