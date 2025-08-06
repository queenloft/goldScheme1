import { COLORS } from '@src/config';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, Pressable, Image, StatusBar } from 'react-native';

// --- Reusable Modal Component ---
// This component can be used anywhere in your app.
const CustomModal = ({ modalVisible, setModalVisible, onConfirm, onCancel }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Need your attention</Text>
          <Text style={styles.modalText}>Are you sure you want to logout your account?</Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.buttonYes]}
              onPress={onConfirm}>
              <Text style={styles.textStyleYes}>YES</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonNo]}
              onPress={onCancel}>
              <Text style={styles.textStyleNo}>NO</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;


// --- Stylesheet ---
const styles = StyleSheet.create({
  // Main screen styles
  container: {
    flex: 1,
    backgroundColor: '#3D4A3A', // Dark green background
  },
  header: {
    backgroundColor: '#B49F6A', // Gold color
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  profileContent: {
    flex: 1,
    backgroundColor: '#F0F0F0', // Light grey background for the content area
    marginTop: -30,
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: {
     marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#B49F6A',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
  },
  infoLabel: {
      fontSize: 16,
      color: '#666',
  },
  infoValue: {
      fontSize: 16,
      color: '#333',
      fontWeight: '500',
  },
  editProfileButton: {
      backgroundColor: '#B49F6A',
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 25,
      marginTop: 30,
      marginBottom: 20,
      width: '80%',
      alignItems: 'center',
  },
  editProfileButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
  },
  footerLinks: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
  },
  deleteAccountLink: {
      color: '#D32F2F', // Red color for delete
      fontSize: 15,
      fontWeight: 'bold',
  },
  changePinLink: {
      color: '#3D4A3A',
      fontSize: 15,
      fontWeight: 'bold',
  },

  // Modal styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flex: 1,
    marginHorizontal: 10,
  },
  buttonYes: {
    // No specific background color, just text
    backgroundColor: COLORS.theme,
  },
  buttonNo: {
     backgroundColor: COLORS.primary,
    // No specific background color, just text
  },
  textStyleYes: {
    color: COLORS.textLight,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  textStyleNo: {
    color: COLORS.primaryDark,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});
