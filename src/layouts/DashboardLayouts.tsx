import { NavLink, Outlet } from 'react-router-dom';
import { ChevronDown, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import './DashboardLayout.scss';

type NavItem = {
  label?: string;
  icon?: React.ReactNode;
  to?: string;
  section?: 'CUSTOMERS' | 'BUSINESSES' | 'SETTINGS';
};

const navItems: NavItem[] = [
  {
    label: 'Switch Organization',
    to: '#',
    icon: <img src="/icons/briefcase.svg" alt="" />,
  },

  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: <img src="/icons/home.svg" alt="" />,
  },

  { section: 'CUSTOMERS' },
  { label: 'Users', to: '/users', icon: <img src="/icons/users.svg" alt="" /> },
  {
    label: 'Guarantors',
    to: '/guarantors',
    icon: <img src="/icons/guarantors.svg" alt="" />,
  },
  { label: 'Loans', to: '/loans', icon: <img src="/icons/loans.svg" alt="" /> },
  {
    label: 'Decision Models',
    to: '/decision-models',
    icon: <img src="/icons/decision-models.svg" alt="" />,
  },
  { label: 'Savings', to: '/savings', icon: <img src="/icons/savings.svg" alt="" /> },
  {
    label: 'Loan Requests',
    to: '/loan-requests',
    icon: <img src="/icons/loan-requests.svg" alt="" />,
  },
  {
    label: 'Whitelist',
    to: '/whitelist',
    icon: <img src="/icons/whitelist.svg" alt="" />,
  },
  { label: 'Karma', to: '/karma', icon: <img src="/icons/karma.svg" alt="" /> },

  { section: 'BUSINESSES' },
  {
    label: 'Organization',
    to: '/organization',
    icon: <img src="/icons/organization.svg" alt="" />,
  },
  {
    label: 'Loan Products',
    to: '/loan-products',
    icon: <img src="/icons/loan-products.svg" alt="" />,
  },
  {
    label: 'Savings Products',
    to: '/savings-products',
    icon: <img src="/icons/savings-products.svg" alt="" />,
  },
  {
    label: 'Fees and Charges',
    to: '/fees-and-charges',
    icon: <img src="/icons/fees-and-charges.svg" alt="" />,
  },
  {
    label: 'Transactions',
    to: '/transactions',
    icon: <img src="/icons/transactions.svg" alt="" />,
  },
  // Additional BUSINESS items
  {
    label: 'Services',
    to: '/services',
    icon: <img src="/icons/services.svg" alt="" />,
  },
  {
    label: 'Service Account',
    to: '/service-account',
    icon: <img src="/icons/service-account.svg" alt="" />,
  },
  {
    label: 'Settlements',
    to: '/settlements',
    icon: <img src="/icons/settlements.svg" alt="" />,
  },
  {
    label: 'Reports',
    to: '/reports',
    icon: <img src="/icons/reports.svg" alt="" />,
  },

  { section: 'SETTINGS' },
  {
    label: 'Preferences',
    to: '/preferences',
    icon: <img src="/icons/preferences.svg" alt="" />,
  },
  {
    label: 'Fees and Pricing',
    to: '/fees-and-pricing',
    icon: <img src="/icons/fees-and-pricing.svg" alt="" />,
  },
  {
    label: 'Audit Logs',
    to: '/audit-logs',
    icon: <img src="/icons/audit-logs.svg" alt="" />,
  },
];

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="app-shell">
      {/* HEADER - spans entire width */}
      <header className="topbar">
        <button
          className="topbar-hamburger"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="topbar-left">
          <div className="topbar-logo">
            <img src="/lendsqr-logo.svg" alt="Lendsqr" />
          </div>

          <form className="topbar-search">
            <input
              type="text"
              placeholder="Search for anything"
              aria-label="Search for anything"
            />
            <button type="submit" className="topbar-search-button">
              <Search size={14} />
            </button>
          </form>
        </div>

        <div className="topbar-right">
          <a href="#" className="topbar-link">
            Docs
          </a>
          <button className="topbar-icon-button" aria-label="Notifications">
            <img src="/bell.svg" alt="Notifications" />
          </button>
          <button className="topbar-profile">
            <span className="topbar-avatar">
              <img src="/profile.png" alt="Adedeji" />
            </span>
            <span className="topbar-name">Adedeji</span>
            <img src="/arrow-down.svg" alt="Dropdown" />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu} />
      )}

      {/* SIDEBAR */}
      <aside
        className={`sidebar ${isMobileMenuOpen ? 'sidebar--mobile-open' : ''}`}
      >
        <nav className="sidebar-nav">
          {navItems.map((item, idx) =>
            item.section ? (
              <p key={`section-${idx}`} className="sidebar-section">
                {item.section}
              </p>
            ) : (
              <NavLink
                key={item.label}
                to={item.to || '#'}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  [
                    'sidebar-link',
                    isActive && item.to !== '#' ? 'sidebar-link--active' : '',
                    item.label === 'Switch Organization'
                      ? 'sidebar-link--switch'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
                end={item.label === 'Dashboard'}
              >
                <span className="sidebar-link-icon">{item.icon}</span>
                <span className="sidebar-link-label">{item.label}</span>
                {item.label === 'Switch Organization' && (
                  <ChevronDown size={16} className="sidebar-link-caret" />
                )}
              </NavLink>
            )
          )}
        </nav>
      </aside>

      {/* MAIN AREA - CONTENT ONLY */}
      <main className="main">
        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
