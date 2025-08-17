import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { useAuthStore } from './store/authStore'

/**
 * Initialize auth from localStorage token so auth state survives refresh.
 * If a token exists, set it on the store and fetch the user profile.
 */
const token = localStorage.getItem("token");
if (token) {
  useAuthStore.getState().setToken(token);
  // Fire-and-forget profile fetch so UI restores user data after refresh
  useAuthStore.getState().fetchProfile().catch(() => { });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
