import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Menu from './components/Menu';
import Example1Components from './pages/Example1Components';
import Example2JSX from './pages/Example2JSX';
import Example3Props from './pages/Example3Props';
import Example4StateHooks from './pages/Example4StateHooks';
import Example5Eventos from './pages/Example5Eventos';
import Example6CondicionalListas from './pages/Example6CondicionalListas';
import Example7Routing from './pages/Example7Routing';
import Example8DataFetching from './pages/Example8DataFetching';
import Challenge from './pages/Challenge';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import View from './pages/View';
import AddPet from './pages/AddPet';
import EditPet from './pages/EditPet';


const queryClient = new QueryClient();

const ProtectedRoutes = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/example1" element={<Example1Components />} />
          <Route path="/example2" element={<Example2JSX />} />
          <Route path="/example3" element={<Example3Props />} />
          <Route path="/example4" element={<Example4StateHooks />} />
          <Route path="/example5" element={<Example5Eventos />} />
          <Route path="/example6" element={<Example6CondicionalListas />} />
          <Route path="/example7/*" element={<Example7Routing />} />
          <Route path="/example8" element={<Example8DataFetching />} />
          <Route path="/challenge" element={<Challenge />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/view/:id" element={<View />} /> */}

          {/* Rutas Públicas (Cualquiera puede entrar) */}
          <Route path="/" element={<Challenge />} />
          <Route path="/login" element={<Login />} />

          {/* Rutas Protegidas (Requieren sesión iniciada) */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/view/:id" element={<View />} />
            <Route path="/add" element={<AddPet />} />
            <Route path="/edit/:id" element={<EditPet />} />
          </Route>

          {/* Redirección por defecto si la ruta no existe */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;