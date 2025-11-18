import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import UserDetailsPage from '../pages/UserDetailsPage/UserDetailsPage';
import DashboardLayout from '../layouts/DashboardLayouts';
import UsersPage from '../pages/Users/UsersPage';
import PlaceholderPage from '../pages/Placeholder/PlaceholderPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Login page */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route element={<DashboardLayout />}>
        <Route
          path="/dashboard"
          element={<PlaceholderPage pageName="Dashboard" />}
        />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserDetailsPage />} />

        {/* CUSTOMERS */}
        <Route
          path="/guarantors"
          element={<PlaceholderPage pageName="Guarantors" />}
        />
        <Route path="/loans" element={<PlaceholderPage pageName="Loans" />} />
        <Route
          path="/decision-models"
          element={<PlaceholderPage pageName="Decision Models" />}
        />
        <Route
          path="/savings"
          element={<PlaceholderPage pageName="Savings" />}
        />
        <Route
          path="/loan-requests"
          element={<PlaceholderPage pageName="Loan Requests" />}
        />
        <Route
          path="/whitelist"
          element={<PlaceholderPage pageName="Whitelist" />}
        />
        <Route path="/karma" element={<PlaceholderPage pageName="Karma" />} />

        {/* BUSINESSES */}
        <Route
          path="/organization"
          element={<PlaceholderPage pageName="Organization" />}
        />
        <Route
          path="/loan-products"
          element={<PlaceholderPage pageName="Loan Products" />}
        />
        <Route
          path="/savings-products"
          element={<PlaceholderPage pageName="Savings Products" />}
        />
        <Route
          path="/fees-and-charges"
          element={<PlaceholderPage pageName="Fees and Charges" />}
        />
        <Route
          path="/transactions"
          element={<PlaceholderPage pageName="Transactions" />}
        />
        <Route
          path="/services"
          element={<PlaceholderPage pageName="Services" />}
        />
        <Route
          path="/service-account"
          element={<PlaceholderPage pageName="Service Account" />}
        />
        <Route
          path="/settlements"
          element={<PlaceholderPage pageName="Settlements" />}
        />
        <Route
          path="/reports"
          element={<PlaceholderPage pageName="Reports" />}
        />

        {/* SETTINGS */}
        <Route
          path="/preferences"
          element={<PlaceholderPage pageName="Preferences" />}
        />
        <Route
          path="/fees-and-pricing"
          element={<PlaceholderPage pageName="Fees and Pricing" />}
        />
        <Route
          path="/audit-logs"
          element={<PlaceholderPage pageName="Audit Logs" />}
        />
      </Route>

      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
