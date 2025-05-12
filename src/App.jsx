import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Contacto from "./model/contacto/Contacto";
import Dashboard from "./model/dashboard/Dashboard";
import Carrito from "./model/carrito/Carrito";
import PageNotFound from "./model/NotFound/PageNotFound";
import Login from "./model/login/Login";
import Productos from "./model/productos/Productos";
import Empresas from "./model/empresas/Empresas";
import Registro from "./model/registro/Registro";
import ProtectedRoute from "./ui/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Historial from "./model/historial/Historial";
import Admin from "./admin/Admin";
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // time to wait until refetch again, time in miliseconds.
        staleTime: 0,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="productos" element={<Productos />} />

              <Route
                path="carrito"
                element={
                  <ProtectedRoute>
                    <Carrito />
                  </ProtectedRoute>
                }
              />

              <Route
                path="historial"
                element={
                  <ProtectedRoute>
                    <Historial />
                  </ProtectedRoute>
                }
              />

              <Route path="contacto" element={<Contacto />} />
              <Route path="empresas" element={<Empresas />} />
              <Route path="/productos/:id_empresa" element={<Productos />} />
              <Route path="registro" element={<Registro />} />
              <Route path="admin" element={<Admin />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
