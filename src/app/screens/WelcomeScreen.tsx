import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { apiTestLoginOTP } from "../../api/accountService"; // Update this path to match your project structure
import { useUser } from "../utils/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { setUserData } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (phoneNumber.length < 9) return;

    setIsLoading(true);
    try {
      // Format phone number with country code
      const formattedPhoneNumber = `+63${phoneNumber}`;

      // Call the API
      const response = await apiTestLoginOTP({
        phonenumber: formattedPhoneNumber,
      });
      console.log(response.data);

      await AsyncStorage.setItem("authToken", response.data.token);
      // If successful, navigate to Registration screen
      // You might want to pass the phone number or response data to the next screen
      if (response.data.user.isVerifiedNumber == null) {
        setUserData(response.data.user);
        navigation.navigate("Main");
      } else {
        // For new users, navigate to Registration
        navigation.navigate("Registration", {
          phoneNumber: formattedPhoneNumber,
          responseData: response.data,
        });
      }
    } catch (error) {
      // Handle error
      console.error("Login error:", error);
      Alert.alert("Error", "Unable to proceed. Please try again later.", [
        { text: "OK" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
      >
        <View style={styles.header}>
          <Text style={styles.logoText}>TRICYRIDE</Text>
          <Text style={styles.tagline}>ANG SERVICE NG BAYAN</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.welcomeText}>Welcome to Tricyride!</Text>
          <Text style={styles.instructionText}>Hi! What's your mobile?</Text>

          <View style={styles.phoneInputContainer}>
            <Text style={styles.countryCode}>+63</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Mobile Number Here"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
              maxLength={10}
              editable={!isLoading}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.continueButton,
              phoneNumber.length > 8 ? styles.buttonActive : {},
              isLoading ? styles.buttonDisabled : {},
            ]}
            onPress={handleContinue}
            disabled={phoneNumber.length < 9 || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.buttonText}>Continue</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefae0",
  },
  keyboardAvoidView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
    color: "#606c38",
  },
  inputContainer: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 20,
    textAlign: "center",
  },
  instructionText: {
    fontSize: 16,
    color: "#606c38",
    marginBottom: 15,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  countryCode: {
    fontSize: 16,
    color: "#283618",
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#283618",
  },
  continueButton: {
    backgroundColor: "#dda15e",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "#606c38",
  },
  buttonDisabled: {
    backgroundColor: "#a0a0a0",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default WelcomeScreen;
