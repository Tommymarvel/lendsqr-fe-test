import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from 'lucide-react';
import { fetchUsers } from '../../services/api/usersApi';
import type {
  User,
  UserStatus,
  UserDetails,
} from '../../services/api/usersApi';
import './UsersPage.scss';

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

const statusClassMap: Record<UserStatus, string> = {
  Active: 'status-pill--active',
  Inactive: 'status-pill--inactive',
  Pending: 'status-pill--pending',
  Blacklisted: 'status-pill--blacklisted',
};

interface Filters {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: '' | UserStatus;
}

const initialFilters: Filters = {
  organization: '',
  username: '',
  email: '',
  date: '',
  phoneNumber: '',
  status: '',
};

const UsersPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [allUsersDetails, setAllUsersDetails] = useState<UserDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(100);
  const [openMenuId, setOpenMenuId] = useState<string | number | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);

        const res = await fetch('/users.json');
        if (res.ok) {
          const fullDetails: UserDetails[] = await res.json();
          setAllUsersDetails(fullDetails);
        }
      } catch (err) {
        console.error(err);
        setError('Unable to load users');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalUsersAll = users.length;

  const activeUsers = useMemo(
    () => users.filter((u) => u.status === 'Active').length,
    [users]
  );

  const usersWithLoans = useMemo(() => {
    if (allUsersDetails.length === 0) return 0;
    return allUsersDetails.filter((u) => {
      const loanRepayment = parseInt(
        u.education.loanRepayment.replace(/,/g, ''),
        10
      );
      return !isNaN(loanRepayment) && loanRepayment > 0;
    }).length;
  }, [allUsersDetails]);

  const usersWithSavings = useMemo(() => {
    if (allUsersDetails.length === 0) return 0;
    return allUsersDetails.filter((u) => {
      const balanceStr = u.account.balanceFormatted.replace(/[₦,]/g, '');
      const balance = parseFloat(balanceStr);
      return !isNaN(balance) && balance > 0;
    }).length;
  }, [allUsersDetails]);

  // UNIQUE OPTIONS FOR FILTERS
  const organizations = useMemo(
    () => Array.from(new Set(users.map((u) => u.organization))).sort(),
    [users]
  );

  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return users.filter((u) => {
      // helper to normalize dateJoined to ISO (YYYY-MM-DD)
      const toISO = (d: string): string | null => {
        const parsed = new Date(d);
        return isNaN(parsed.getTime())
          ? null
          : parsed.toISOString().slice(0, 10);
      };

      // global search
      if (term) {
        const inSearch =
          u.organization.toLowerCase().includes(term) ||
          u.username.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term) ||
          u.phoneNumber.toLowerCase().includes(term);
        if (!inSearch) return false;
      }

      // per-field filters
      if (filters.organization && u.organization !== filters.organization) {
        return false;
      }

      if (
        filters.username &&
        !u.username.toLowerCase().includes(filters.username.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.email &&
        !u.email.toLowerCase().includes(filters.email.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.phoneNumber &&
        !u.phoneNumber.toLowerCase().includes(filters.phoneNumber.toLowerCase())
      ) {
        return false;
      }

      if (filters.date) {
        const iso = toISO(u.dateJoined);
        if (iso !== filters.date) return false;
      }

      if (filters.status && u.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [users, searchTerm, filters]);

  const totalUsers = filteredUsers.length;

  const totalPages = Math.max(1, Math.ceil(totalUsers / pageSize));

  // clamp page when pageSize / filtered list changes
  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages));
  }, [pageSize, totalPages]);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleUsers = filteredUsers.slice(startIndex, endIndex);

  const handleViewDetails = (user: User) => {
    // keep row menu closed
    setOpenMenuId(null);
    navigate(`/users/${user.id}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    setOpenMenuId(null);
  };

  const handleFilterFieldChange = (field: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setSearchTerm('');
  };

  const renderPaginationNumbers = () => {
    const buttons: React.ReactNode[] = [];

    if (totalPages <= 6) {
      for (let p = 1; p <= totalPages; p += 1) {
        buttons.push(
          <button
            key={p}
            className={
              p === page
                ? 'pagination-btn pagination-btn--active'
                : 'pagination-btn'
            }
            onClick={() => handlePageChange(p)}
          >
            {p}
          </button>
        );
      }
    } else {
      const pagesToShow = [
        1,
        2,
        page - 1,
        page,
        page + 1,
        totalPages - 1,
        totalPages,
      ].filter((p) => p >= 1 && p <= totalPages);
      const unique = Array.from(new Set(pagesToShow)).sort((a, b) => a - b);

      let last: number | null = null;
      unique.forEach((p) => {
        if (last && p - last > 1) {
          buttons.push(
            <span key={`dots-${p}`} className="pagination-ellipsis">
              …
            </span>
          );
        }
        buttons.push(
          <button
            key={p}
            className={
              p === page
                ? 'pagination-btn pagination-btn--active'
                : 'pagination-btn'
            }
            onClick={() => handlePageChange(p)}
          >
            {p}
          </button>
        );
        last = p;
      });
    }

    return buttons;
  };

  if (loading) {
    return (
      <section className="users-page">
        <h1 className="users-title">Users</h1>
        <p className="users-loading">Loading users…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="users-page">
        <h1 className="users-title">Users</h1>
        <p className="users-error">{error}</p>
      </section>
    );
  }

  return (
    <section className="users-page">
      <h1 className="users-title">Users</h1>

      {/* SUMMARY CARDS */}
      <div className="users-summary">
        <article className="summary-card">
          <div className="summary-card-icon">
            <img src="/users-count.svg" alt="Users Count" />
          </div>
          <p className="summary-card-label">Users</p>
          <p className="summary-card-value">{totalUsersAll.toLocaleString()}</p>
        </article>

        <article className="summary-card">
          <div className="summary-card-icon">
            <img src="/active-users.svg" alt="Active Users" />
          </div>
          <p className="summary-card-label">Active Users</p>
          <p className="summary-card-value">{activeUsers.toLocaleString()}</p>
        </article>

        <article className="summary-card">
          <div className="summary-card-icon">
            <img src="/users-with-loan.svg" alt="Users with Loans" />
          </div>
          <p className="summary-card-label">Users with Loans</p>
          <p className="summary-card-value">
            {usersWithLoans.toLocaleString()}
          </p>
        </article>

        <article className="summary-card">
          <div className="summary-card-icon">
            <img src="/users-with-savings.svg" alt="Users with Savings" />
          </div>
          <p className="summary-card-label">Users with Savings</p>
          <p className="summary-card-value">
            {usersWithSavings.toLocaleString()}
          </p>
        </article>
      </div>

      {/* TABLE + FILTERS */}
      <div className="users-table-card">
        {/* Toolbar: search + filter toggle */}
        <div className="users-table-toolbar">
          <div className="users-table-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search for anything"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="users-filter-toggle"
            onClick={() => setIsFilterOpen((prev) => !prev)}
          >
            <img
              src="/th-filter-icon.svg"
              alt=""
              className="users-filter-toggle-icon"
            />
            <span>Filter</span>
          </button>
        </div>

        {/* Filter panel */}
        {isFilterOpen && (
          <div className="users-filter-panel">
            <button
              type="button"
              className="filter-close-btn"
              onClick={() => setIsFilterOpen(false)}
              aria-label="Close filter"
            >
              <X size={20} />
            </button>

            <div className="filter-field">
              <label htmlFor="filter-organization">Organization</label>
              <div className="filter-select">
                <select
                  id="filter-organization"
                  value={filters.organization}
                  onChange={(e) =>
                    handleFilterFieldChange('organization', e.target.value)
                  }
                >
                  <option value="">Select</option>
                  {organizations.map((org) => (
                    <option key={org} value={org}>
                      {org}
                    </option>
                  ))}
                </select>
                <span className="filter-select-caret">▾</span>
              </div>
            </div>

            <div className="filter-field">
              <label htmlFor="filter-username">Username</label>
              <input
                id="filter-username"
                type="text"
                placeholder="User"
                value={filters.username}
                onChange={(e) =>
                  handleFilterFieldChange('username', e.target.value)
                }
              />
            </div>

            <div className="filter-field">
              <label htmlFor="filter-email">Email</label>
              <input
                id="filter-email"
                type="email"
                placeholder="Email"
                value={filters.email}
                onChange={(e) =>
                  handleFilterFieldChange('email', e.target.value)
                }
              />
            </div>

            <div className="filter-field">
              <label htmlFor="filter-date">Date</label>
              <div className="filter-date-wrapper">
                <input
                  id="filter-date"
                  type="date"
                  value={filters.date}
                  onChange={(e) =>
                    handleFilterFieldChange('date', e.target.value)
                  }
                />
              </div>
            </div>

            <div className="filter-field">
              <label htmlFor="filter-phone">Phone Number</label>
              <input
                id="filter-phone"
                type="text"
                placeholder="Phone Number"
                value={filters.phoneNumber}
                onChange={(e) =>
                  handleFilterFieldChange('phoneNumber', e.target.value)
                }
              />
            </div>

            <div className="filter-field">
              <label htmlFor="filter-status">Status</label>
              <div className="filter-select">
                <select
                  id="filter-status"
                  value={filters.status}
                  onChange={(e) =>
                    handleFilterFieldChange(
                      'status',
                      e.target.value as UserStatus | ''
                    )
                  }
                >
                  <option value="">Select</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                  <option value="Blacklisted">Blacklisted</option>
                </select>
                <span className="filter-select-caret">▾</span>
              </div>
            </div>

            <div className="filter-actions">
              <button
                type="button"
                className="filter-btn filter-btn--reset"
                onClick={handleResetFilters}
              >
                Reset
              </button>
              <button
                type="button"
                className="filter-btn filter-btn--apply"
                onClick={() => setIsFilterOpen(false)}
              >
                Filter
              </button>
            </div>
          </div>
        )}

        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Organization</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Date Joined</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {visibleUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.organization}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.dateJoined}</td>
                  <td>
                    <span
                      className={`status-pill ${
                        statusClassMap[user.status] ?? ''
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="users-table-actions">
                    <button
                      type="button"
                      className="kebab-btn"
                      onClick={() =>
                        setOpenMenuId((prev) =>
                          prev === user.id ? null : user.id
                        )
                      }
                    >
                      <MoreVertical size={16} color="#545f7d" />
                    </button>

                    {openMenuId === user.id && (
                      <div className="row-menu">
                        <button
                          type="button"
                          className="row-menu-item"
                          onClick={() => handleViewDetails(user)}
                        >
                          <Eye size={16} />
                          <span>View Details</span>
                        </button>
                        {user.status !== 'Blacklisted' && (
                          <button type="button" className="row-menu-item">
                            <img
                              src="/blacklist-profile-icon.svg"
                              alt="Blacklist User"
                            />{' '}
                            <span>Blacklist User</span>
                          </button>
                        )}
                        {user.status !== 'Active' && (
                          <button type="button" className="row-menu-item">
                            <img
                              src="/activate-profile-icon.svg"
                              alt="Activate User"
                            />{' '}
                            <span>Activate User</span>
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {visibleUsers.length === 0 && (
                <tr>
                  <td colSpan={7} className="users-empty">
                    <img src="/no-user.svg" alt="No users" />
                    <p>No users found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER / PAGINATION */}
      <div className="users-table-footer">
        <div className="users-table-showing">
          <span>Showing</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {PAGE_SIZE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span>out of {totalUsers.toLocaleString()}</span>
        </div>

        <div className="users-pagination">
          <button
            type="button"
            className="pagination-btn pagination-btn--arrow"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft size={14} />
          </button>

          {renderPaginationNumbers()}

          <button
            type="button"
            className="pagination-btn pagination-btn--arrow"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            aria-label="Next page"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default UsersPage;
