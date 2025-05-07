import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useUser } from "../utils/UserContext"; // Update this path
import { DriversProfile } from "../../types/drivers";
import { apiDriverProfile } from "../../api/driverMeService"; // Update this path

export default function RiderProfileScreen({
  navigation,
}: {
  navigation: any;
}) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const { setUserData, setToken } = useUser();
  const [profileData, setProfileData] = useState<DriversProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDriverProfile();
  }, []);

  const fetchDriverProfile = async () => {
    try {
      setIsLoading(true);
      const response = await apiDriverProfile();
      setProfileData(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching profile data:", err);
      setError("Failed to load profile data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUserData(null);
    setToken(null);
    navigation.navigate("Welcome");
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#606c38" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <FontAwesome5 name="exclamation-circle" size={50} color="#bc6c25" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchDriverProfile}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Helper function to format name from separate fields
  const getFullName = () => {
    if (!profileData) return "";
    return [profileData.firstName, profileData.middleName, profileData.lastName]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#283618" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#283618" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {profileData && (
          <>
            <View style={styles.profileSection}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={require("../../../assets/favicon.png")}
                  style={styles.profileImage}
                />
              </View>
              <Text style={styles.profileName}>{getFullName()}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome5 name="star" size={16} color="#606c38" />
                <Text style={styles.ratingText}>
                  {profileData.rating || "N/A"}
                </Text>
              </View>
              <Text style={styles.memberSince}>
                Member since {profileData.memberSince || "N/A"}
              </Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Contact Information</Text>

              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <FontAwesome5 name="phone" size={16} color="#808080" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Mobile Number</Text>
                  <Text style={styles.infoValue}>
                    {profileData.phoneNumber || "Not set"}
                  </Text>
                </View>
                <TouchableOpacity style={styles.editIconContainer}>
                  <FontAwesome5 name="pencil-alt" size={16} color="#dda15e" />
                </TouchableOpacity>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <FontAwesome5 name="envelope" size={16} color="#808080" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Email Address</Text>
                  <Text style={styles.infoValue}>
                    {profileData.emailAddress || "Not set"}
                  </Text>
                </View>
                <TouchableOpacity style={styles.editIconContainer}>
                  <FontAwesome5 name="pencil-alt" size={16} color="#dda15e" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Tricycle Information</Text>

              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <FontAwesome5 name="id-card" size={16} color="#808080" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Plate Number</Text>
                  <Text style={styles.infoValue}>
                    {profileData.tricycleInfo?.plateNumber || "Not set"}
                  </Text>
                </View>
                <TouchableOpacity style={styles.editIconContainer}>
                  <FontAwesome5 name="pencil-alt" size={16} color="#dda15e" />
                </TouchableOpacity>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <FontAwesome5 name="motorcycle" size={16} color="#808080" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Model</Text>
                  <Text style={styles.infoValue}>
                    {profileData.tricycleInfo?.model || "Not set"}
                  </Text>
                </View>
                <TouchableOpacity style={styles.editIconContainer}>
                  <FontAwesome5 name="pencil-alt" size={16} color="#dda15e" />
                </TouchableOpacity>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <FontAwesome5 name="palette" size={16} color="#808080" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Color</Text>
                  <Text style={styles.infoValue}>
                    {profileData.tricycleInfo?.color || "Not set"}
                  </Text>
                </View>
                <TouchableOpacity style={styles.editIconContainer}>
                  <FontAwesome5 name="pencil-alt" size={16} color="#dda15e" />
                </TouchableOpacity>
              </View>
            </View>

            {/* <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>App Settings</Text>
              
              <View style={styles.settingRow}>
                <View style={styles.settingIconContainer}>
                  <FontAwesome5 name="bell" size={16} color="#fefae0" />
                </View>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>Push Notifications</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: "#767577", true: "#606c38" }}
                  thumbColor={notificationsEnabled ? "#dda15e" : "#f4f3f4"}
                />
              </View>
              
              <View style={styles.settingRow}>
                <View style={styles.settingIconContainer}>
                  <FontAwesome5 name="moon" size={16} color="#fefae0" />
                </View>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>Dark Mode</Text>
                </View>
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                  trackColor={{ false: "#767577", true: "#606c38" }}
                  thumbColor={darkModeEnabled ? "#dda15e" : "#f4f3f4"}
                />
              </View>
            </View>
             */}

            <View style={styles.statsSection}>
              <Text style={styles.sectionTitle}>Your Stats</Text>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>
                    {profileData.totalRides || 0}
                  </Text>
                  <Text style={styles.statLabel}>Total Rides</Text>
                </View>
                <View style={[styles.statItem, styles.borderLeftRight]}>
                  <Text style={styles.statNumber}>
                    {profileData.rating || "N/A"}
                  </Text>
                  <Text style={styles.statLabel}>Rating</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>
                    {profileData.memberSince
                      ? calculateMonthsActive(profileData.memberSince)
                      : "N/A"}
                  </Text>
                  <Text style={styles.statLabel}>Months Active</Text>
                </View>
              </View>
            </View>

            <View style={styles.supportSection}>
              <TouchableOpacity style={styles.supportRow}>
                <FontAwesome5
                  name="question-circle"
                  size={16}
                  color="#808080"
                />
                <Text style={styles.supportText}>Help & Support</Text>
                <FontAwesome5 name="chevron-right" size={14} color="#283618" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.supportRow}>
                <FontAwesome5 name="file-alt" size={16} color="#808080" />
                <Text style={styles.supportText}>Terms & Conditions</Text>
                <FontAwesome5 name="chevron-right" size={14} color="#283618" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.supportRow}>
                <FontAwesome5 name="shield-alt" size={16} color="#808080" />
                <Text style={styles.supportText}>Privacy Policy</Text>
                <FontAwesome5 name="chevron-right" size={14} color="#283618" />
              </TouchableOpacity>
            </View>

            <View style={styles.buttonSection}>
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={fetchDriverProfile}
              >
                <FontAwesome5
                  name="sync"
                  size={16}
                  color="#fefae0"
                  style={styles.refreshIcon}
                />
                <Text style={styles.refreshText}>Refresh Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <FontAwesome5
                  name="sign-out-alt"
                  size={16}
                  color="#fefae0"
                  style={styles.logoutIcon}
                />
                <Text style={styles.logoutText}>Log Out</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.version}>App Version 1.0.0</Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper function to calculate months active with improved date parsing
const calculateMonthsActive = (memberSince: string) => {
  try {    
    // Handle "Month Year" format manually
    if (/^[A-Za-z]+ \d{4}$/.test(memberSince)) {
      const parts = memberSince.split(' ');
      const monthName = parts[0].toLowerCase();
      const year = parseInt(parts[1]);
      
      // Manual month name to number mapping with type safety
      const months: Record<string, number> = {
        'january': 0, 'february': 1, 'march': 2, 'april': 3,
        'may': 4, 'june': 5, 'july': 6, 'august': 7,
        'september': 8, 'october': 9, 'november': 10, 'december': 11
      };
      
      // Check if month was found with type safety
      if (!(monthName in months)) {
        console.error("Could not parse month name:", monthName);
        return 'N/A';
      }
      
      const month = months[monthName];
      
      // Create date with the first day of the month
      const joinDate = new Date(year, month, 1);
      
      // Verify date is valid
      if (isNaN(joinDate.getTime())) {
        console.error("Invalid date created:", joinDate);
        return 'N/A';
      }
      
      const currentDate = new Date();
      
      let monthsDiff = (currentDate.getFullYear() - joinDate.getFullYear()) * 12;
      monthsDiff += currentDate.getMonth() - joinDate.getMonth();
      
      return monthsDiff <= 0 ? 'New' : monthsDiff;
    } else {
      console.error("Date format doesn't match expected 'Month Year' pattern");
      return 'N/A';
    }
  } catch (error) {
    console.error('Error calculating months active:', error);
    return 'N/A';
  }
};

// Keep your existing styles or define them here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefae0",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#283618",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: "#283618",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#606c38",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fefae0",
    fontWeight: "bold",
  },
  refreshButton: {
    backgroundColor: "#606c38",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  refreshIcon: {
    marginRight: 8,
  },
  refreshText: {
    color: "#fefae0",
    fontWeight: "bold",
    fontSize: 16,
  },
  // Include all your other style definitions here
  // (header, content, profileSection, etc.)
  // ...

  // I'm including these since they're referenced in the new code
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#dda15e",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#283618",
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#dda15e",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 16,
    color: "#283618",
  },
  memberSince: {
    fontSize: 14,
    color: "#606c38",
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: "#606c38",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#fefae0",
    fontWeight: "bold",
  },
  infoSection: {
    backgroundColor: "#ffff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#dda15e",
  },
  infoValue: {
    fontSize: 14,
    color: "#00000",
  },
  editIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fefae0",
    justifyContent: "center",
    alignItems: "center",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  settingIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#283618",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: "#fefae0",
  },
  buttonSection: {
    padding: 16,
  },
  logoutButton: {
    backgroundColor: "#bc6c25",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: "#fefae0",
    fontWeight: "bold",
    fontSize: 16,
  },
  statsSection: {
    backgroundColor: "#ffff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    padding: 12,
  },
  borderLeftRight: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#dda15e",
  },
  statNumber: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#00000",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#dda15e",
  },
  supportSection: {
    backgroundColor: "#ffff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  supportRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#283618",
  },
  supportText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#00000",
  },
  footer: {
    alignItems: "center",
    padding: 16,
  },
  version: {
    fontSize: 12,
    color: "#606c38",
  },
});
