import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const RegistrationScreen = ({ navigation }: { navigation: any }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    // Validate and submit registration data
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.logoText}>TRICYRIDE</Text>
          <Text style={styles.headerTitle}>Getting to know you...</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name*</Text>
            <TextInput
              style={styles.input}
              value={formData.firstName}
              onChangeText={(text) => handleChange('firstName', text)}
              placeholder="Enter your first name"
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name*</Text>
            <TextInput
              style={styles.input}
              value={formData.lastName}
              onChangeText={(text) => handleChange('lastName', text)}
              placeholder="Enter your last name"
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Middle Name (optional)</Text>
            <TextInput
              style={styles.input}
              value={formData.middleName}
              onChangeText={(text) => handleChange('middleName', text)}
              placeholder="Enter your middle name"
              placeholderTextColor="#aaa"
            />
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, (formData.firstName && formData.lastName) ? styles.buttonActive : {}]} 
            onPress={handleSubmit}
            disabled={!formData.firstName || !formData.lastName}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dda15e',
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 30,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#283618',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: '#283618',
    fontWeight: '500',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#606c38',
    fontWeight: '500',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    fontSize: 16,
    color: '#283618',
  },
  submitButton: {
    backgroundColor: '#dda15e',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonActive: {
    backgroundColor: '#606c38',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RegistrationScreen;