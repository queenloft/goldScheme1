import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the initial state for the store
const initialState = {
  user: null,       // To store user profile information (e.g., name, email, id)
  token: null,      // To store the authentication token (e.g., JWT)
  isLoggedIn: false, // A boolean flag for quick checks
};

// Create the Zustand store with persistence
const useAuthStore = create(
  persist(
    (set) => ({
      ...initialState,

      /**
       * Action to handle user login.
       * It updates the state with user data and token, and sets isLoggedIn to true.
       * @param {object} userData - The user's profile data.
       * @param {string} token - The authentication token.
       */
      login: (userData, token) => {
        console.log('Storing user session:', { userData, token });
        set({
          user: userData,
          token: token,
          isLoggedIn: true,
        });
      },

      /**
       * Action to handle user logout.
       * It clears the user data and token from the state, effectively logging them out.
       */
      logout: () => {
        console.log('Clearing user session.');
        set(initialState); // Reset to the initial state
        // You can also add other cleanup logic here, like clearing caches.
      },

      /**
       * Optional: An action to update user data without re-logging in
       * (e.g., after a profile edit).
       * @param {object} updatedUserData - The new user data.
       */
      updateUser: (updatedUserData) => {
        set((state) => ({
          user: { ...state.user, ...updatedUserData },
        }));
      },
    }),
    {
      name: 'auth-storage', // Unique name for the AsyncStorage key
      storage: createJSONStorage(() => AsyncStorage), // Specify AsyncStorage for storage
    }
  )
);

export default useAuthStore;
