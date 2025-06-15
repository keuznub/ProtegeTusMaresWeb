
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './layouts/DashboardLayout'
import { useJsApiLoader } from '@react-google-maps/api'
import enviroments from './enviroments/enviroments.develpment'
import ReportPage from './pages/ReportPage'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './configs/firebaseInit'
import { useUser } from './context/UserContext'
import { FirestoreService } from './services/FirestoreServices'
import { FirebaseAuthService } from './services/FirebaseAuthService'


const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {

  useJsApiLoader({ googleMapsApiKey: GOOGLE_MAPS_API_KEY })
  const { setUser } = useUser()

  useEffect(() => {
    console.log("maps key", GOOGLE_MAPS_API_KEY);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) return
      const role = await FirestoreService.getRoleByUid(firebaseUser.uid)
      if (role != "admin" && role != "moderator") {
        FirebaseAuthService.logOut()
        return
      }
      setUser({ id: firebaseUser.uid, email: firebaseUser.email ?? "", avatar: firebaseUser.photoURL ?? "", name: firebaseUser.displayName ?? "" })
    });

    return () => unsubscribe();
  }, []);



  return <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' index element={<Navigate to={"/login"} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path='/dashboard' index element={<Dashboard />} />
        <Route path='/report/:id' element={<ReportPage />} />
      </Route>
    </Routes>
  </BrowserRouter>

}

export default App
