// Mock Firebase configuration for demo purposes
// In production, this would contain actual Firebase config

export const auth = {
  currentUser: null
};

export const db = {
  collection: () => ({
    doc: () => ({
      set: () => Promise.resolve(),
      get: () => Promise.resolve({ exists: () => false, data: () => ({}) })
    })
  })
};

export default {
  auth,
  db
};