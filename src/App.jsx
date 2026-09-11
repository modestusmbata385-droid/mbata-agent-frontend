import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './state/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AppShell from './layouts/AppShell.jsx';

import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import DashboardPage from './pages/dashboard/DashboardPage.jsx';
import FinancePage from './pages/finance/FinancePage.jsx';
import BusinessPage from './pages/business/BusinessPage.jsx';
import BossPage from './pages/boss/BossPage.jsx';
import DriverPage from './pages/driver/DriverPage.jsx';
import TenantPage from './pages/tenant/TenantPage.jsx';
import EducationPage from './pages/education/EducationPage.jsx';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/finance/*" element={<FinancePage />} />
          <Route path="/business/*" element={<BusinessPage />} />
          <Route path="/boss/*" element={<BossPage />} />
          <Route path="/driver/*" element={<DriverPage />} />
          <Route path="/tenant/*" element={<TenantPage />} />
          <Route path="/education/*" element={<EducationPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
