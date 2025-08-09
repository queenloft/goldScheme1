import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Expose commonly used Firebase services from a single module.
// This keeps imports consistent across the app.
export const firebaseAuth = auth();
export const db = firestore();

// Authentication helpers
export const signInWithPhone = phoneNumber =>
  firebaseAuth.signInWithPhoneNumber(phoneNumber);

export const createUserDocument = async (uid, data) => {
  const userRef = db.collection('users').doc(uid);
  await userRef.set(
    { ...data, created_at: firestore.FieldValue.serverTimestamp() },
    { merge: true }
  );
  return userRef;
};

// Firestore helpers
export const listenToSchemes = callback =>
  db.collection('schemes').onSnapshot(callback);

export const listenToActivatedPlans = (userId, callback) =>
  db.collection('users')
    .doc(userId)
    .collection('activatedPlans')
    .onSnapshot(callback);

export const joinScheme = async (userId, schemeId) => {
  const userSchemesRef = db
    .collection('users')
    .doc(userId)
    .collection('joinedSchemes')
    .doc(schemeId);

  await userSchemesRef.set({
    schemeRef: db.collection('schemes').doc(schemeId),
    joinedAt: firestore.FieldValue.serverTimestamp(),
  });
};

export default { firebaseAuth, db };
