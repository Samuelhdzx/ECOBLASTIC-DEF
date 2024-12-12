import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo, useState, useEffect, ReactNode } from "react";
import { themeSettings } from "./theme";
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Navbar from "@/scenes/navbar/index";
import NavbarPublic from "@/scenes/navbar/index";
import Inicio from "@/scenes/Inicio/index";
import Dashboard from "@/scenes/dashboard";
import LoginPage from "@/Pages/LoginPage";
import RegisterPage from "@/Pages/RegisterPage";
import DataEntryForm from "./Pages/DataEntryForm";
import Profile from "./Pages/Profile";
import Manuales from "./Pages/Manuales";
import AllRecords from "./Pages/AllRecords";

import Predicciones from "./scenes/Predicciones/Predicciones";


          interface LayoutProps {
            children: ReactNode;
          }


          // Componente de layout protegido
          const ProtectedLayout = ({ children }: LayoutProps) => {
            const navigate = useNavigate();
            const [isLoading, setIsLoading] = useState(true);

            useEffect(() => {
              const user = localStorage.getItem('user');
              if (!user) {
                navigate('/login', { replace: true });
              }
              setIsLoading(false);
            }, [navigate]);

            if (isLoading) {
              return null; // O un componente de loading
            }

            return (
              <>
                <Navbar />
                {children}
              </>
            );
          };

          // Componente de layout público
          const PublicLayout = ({ children }: LayoutProps) => {
            return (
              <>
                <NavbarPublic />
                {children}
              </>
            );
          };
          
          


          function App() {
            const theme = useMemo(() => createTheme(themeSettings), []);
            const [isAuthenticated, setIsAuthenticated] = useState(() => {
              return !!localStorage.getItem('user');
            });
            useEffect(() => {
              const handleAuthChange = () => {
                setIsAuthenticated(!!localStorage.getItem('user'));
              };
              
              window.addEventListener('authChange', handleAuthChange);
              return () => window.removeEventListener('authChange', handleAuthChange);
          }, []);
          

            const publicRoutes = (
              <Routes>
                <Route path="/login" element={
                  <PublicLayout>
                    <LoginPage />
                  </PublicLayout>
                } />
                <Route path="/register" element={
                  <PublicLayout>
                    <RegisterPage />
                  </PublicLayout>
                } />
                <Route path="/inicio" element={
                  <PublicLayout>
                    <Inicio />
                  </PublicLayout>
                } />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            );

            const protectedRoutes = (
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                    
                // Add this to your imports
  import DataEntryForm from '@/components/DataEntryForm';

  // Add this to your protectedRoutes
  <Route path="/data-entry" element={
    <ProtectedLayout>
      <DataEntryForm />
    </ProtectedLayout>
  } />

   
   
    {/* <Route path="/registers" element={
    <ProtectedLayout>
<AllRecords />
    </ProtectedLayout>
  } />   */}

                <Route path="/inicio" element={
                  <ProtectedLayout>
                    <Inicio />
                  </ProtectedLayout>
                } />
                <Route path="/dashboard" element={
                  <ProtectedLayout>
                    <Dashboard />
                  </ProtectedLayout>
                } />
                <Route path="/predictions" element={
                  <ProtectedLayout>
                    <Predicciones/>
                  </ProtectedLayout>
                } />
                <Route path="/registers" element={
                  <ProtectedLayout>
                  <AllRecords />
                  </ProtectedLayout>
                } />
                <Route path="/manuals" element={
                  <ProtectedLayout>
                    <Manuales />
                  </ProtectedLayout>
                } />
                
                <Route path="/data_sensors" element={
                  <ProtectedLayout>
                    <div>Data Sensors Page</div>
                  </ProtectedLayout>
                } />
                <Route path="/add_data_sensors/new" element={
                  <ProtectedLayout>
                    <h1>New Data</h1>
                  </ProtectedLayout>
                } />
                <Route path="/data_sensors/:id" element={
                  <ProtectedLayout>
                    <h1>Update Data</h1>
                  </ProtectedLayout>
                } />




                <Route path="/profile" element={
                  <ProtectedLayout>
                   <Profile />
                  </ProtectedLayout>
                } />

<Route 
      path="/logout" 
      element={
        <ProtectedLayout>
          <Navigate to="/login" replace />
        </ProtectedLayout>
      } 
    />
                
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            );



            return (
              <div className="app">
                <BrowserRouter>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Box width="100%" height="100%">
                      {isAuthenticated ? protectedRoutes : publicRoutes}
                    </Box>
                  </ThemeProvider>
                </BrowserRouter>
              </div>
            );
          }

          export default App;
