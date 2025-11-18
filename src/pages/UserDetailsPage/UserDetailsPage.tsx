import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserById } from '../../services/api/usersApi';
import type { UserDetails } from '../../services/api/usersApi';
import './UserDetailsPage.scss';

const LOCAL_STORAGE_KEY_PREFIX = 'lendsqr-user-details-';

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'general' | 'documents' | 'bank' | 'loans' | 'savings' | 'system'
  >('general');

  useEffect(() => {
    if (!id) return;

    const storageKey = `${LOCAL_STORAGE_KEY_PREFIX}${id}`;

    // 1) Try localStorage first (requirement)
    const cached = localStorage.getItem(storageKey);
    if (cached) {
      try {
        const parsed: UserDetails = JSON.parse(cached);
        // Validate that cached data has the required structure
        if (
          parsed.profile &&
          parsed.education &&
          parsed.socials &&
          parsed.guarantor &&
          parsed.account
        ) {
          setUser(parsed);
          setLoading(false);
          return;
        } else {
          // Invalid structure, remove and fetch fresh
          localStorage.removeItem(storageKey);
        }
      } catch {
        localStorage.removeItem(storageKey);
      }
    }

    // 2) Fallback to mock API
    const load = async () => {
      try {
        const fetched = await fetchUserById(id);
        if (!fetched) {
          setError('User not found');
        } else {
          setUser(fetched);
          localStorage.setItem(storageKey, JSON.stringify(fetched));
        }
      } catch (err) {
        console.error(err);
        setError('Unable to load user details');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleBack = () => {
    navigate('/users');
  };

  if (loading) {
    return (
      <section className="user-details-page">
        <p className="user-details-loading">Loading user details…</p>
      </section>
    );
  }

  if (error || !user || !user.profile) {
    return (
      <section className="user-details-page">
        <button className="user-details-back-link" onClick={handleBack}>
          ← Back to Users
        </button>
        <p className="user-details-error">
          {error ?? 'User not found or invalid data'}
        </p>
      </section>
    );
  }

  return (
    <section className="user-details-page">
      {/* Top back link */}
      <button className="user-details-back-link" onClick={handleBack}>
        ← Back to Users
      </button>

      {/* Page title + actions */}
      <div className="user-details-header">
        <h1 className="user-details-title">User Details</h1>

        <div className="user-details-actions">
          <button className="btn-outline btn-outline--danger">
            BLACKLIST USER
          </button>
          <button className="btn-outline btn-outline--success">
            ACTIVATE USER
          </button>
        </div>
      </div>

      {/* Top summary card */}
      <div className="user-summary-card">
        <div className="user-summary-main">
          <div className="user-summary-avatar">
            <span className="user-summary-initials">
              {user.profile.fullName
                .split(' ')
                .map((n: string) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </span>
          </div>

          <div className="user-summary-name">
            <h2>{user.profile.fullName}</h2>
            <p>{user.profile.userId}</p>
          </div>

          <div className="user-summary-divider" />

          <div className="user-summary-tier">
            <p className="label">User&apos;s Tier</p>
            <div className="stars">
              {[1, 2, 3].map((star) => (
                <span
                  key={star}
                  className={
                    star <= user.account.tier ? 'star star--filled' : 'star'
                  }
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="user-summary-divider" />

          <div className="user-summary-account">
            <p className="amount">{user.account.balanceFormatted}</p>
            <p className="account-meta">
              {user.account.number} / {user.account.bank}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="user-summary-tabs">
          <button
            type="button"
            className={
              activeTab === 'general' ? 'user-tab user-tab--active' : 'user-tab'
            }
            onClick={() => setActiveTab('general')}
          >
            General Details
          </button>
          <button
            type="button"
            className={
              activeTab === 'documents'
                ? 'user-tab user-tab--active'
                : 'user-tab'
            }
            onClick={() => setActiveTab('documents')}
          >
            Documents
          </button>
          <button
            type="button"
            className={
              activeTab === 'bank' ? 'user-tab user-tab--active' : 'user-tab'
            }
            onClick={() => setActiveTab('bank')}
          >
            Bank Details
          </button>
          <button
            type="button"
            className={
              activeTab === 'loans' ? 'user-tab user-tab--active' : 'user-tab'
            }
            onClick={() => setActiveTab('loans')}
          >
            Loans
          </button>
          <button
            type="button"
            className={
              activeTab === 'savings' ? 'user-tab user-tab--active' : 'user-tab'
            }
            onClick={() => setActiveTab('savings')}
          >
            Savings
          </button>
          <button
            type="button"
            className={
              activeTab === 'system' ? 'user-tab user-tab--active' : 'user-tab'
            }
            onClick={() => setActiveTab('system')}
          >
            App and System
          </button>
        </div>
      </div>

      {/* Only General Details is “real” for now – others can be placeholders */}
      {activeTab === 'general' && (
        <div className="user-details-card">
          {/* Personal Information */}
          <section className="details-section">
            <h2 className="details-section-title">Personal Information</h2>
            <div className="details-grid">
              <div className="details-field">
                <p className="label">Full Name</p>
                <p className="value">{user.profile.fullName}</p>
              </div>
              <div className="details-field">
                <p className="label">Phone Number</p>
                <p className="value">{user.profile.phoneNumber}</p>
              </div>
              <div className="details-field">
                <p className="label">Email Address</p>
                <p className="value">{user.profile.email}</p>
              </div>
              <div className="details-field">
                <p className="label">BVN</p>
                <p className="value">{user.profile.bvn}</p>
              </div>
              <div className="details-field">
                <p className="label">Gender</p>
                <p className="value">{user.profile.gender}</p>
              </div>
              <div className="details-field">
                <p className="label">Marital Status</p>
                <p className="value">{user.profile.maritalStatus}</p>
              </div>
              <div className="details-field">
                <p className="label">Children</p>
                <p className="value">{user.profile.children}</p>
              </div>
              <div className="details-field">
                <p className="label">Type of Residence</p>
                <p className="value">{user.profile.residenceType}</p>
              </div>
            </div>
          </section>

          <hr className="details-divider" />

          {/* Education and Employment */}
          <section className="details-section">
            <h2 className="details-section-title">Education and Employment</h2>
            <div className="details-grid">
              <div className="details-field">
                <p className="label">Level of Education</p>
                <p className="value">{user.education.level}</p>
              </div>
              <div className="details-field">
                <p className="label">Employment Status</p>
                <p className="value">{user.education.status}</p>
              </div>
              <div className="details-field">
                <p className="label">Sector of Employment</p>
                <p className="value">{user.education.sector}</p>
              </div>
              <div className="details-field">
                <p className="label">Duration of Employment</p>
                <p className="value">{user.education.duration}</p>
              </div>
              <div className="details-field">
                <p className="label">Office Email</p>
                <p className="value">{user.education.officeEmail}</p>
              </div>
              <div className="details-field">
                <p className="label">Monthly Income</p>
                <p className="value">{user.education.monthlyIncome}</p>
              </div>
              <div className="details-field">
                <p className="label">Loan Repayment</p>
                <p className="value">{user.education.loanRepayment}</p>
              </div>
            </div>
          </section>

          <hr className="details-divider" />

          {/* Socials */}
          <section className="details-section">
            <h2 className="details-section-title">Socials</h2>
            <div className="details-grid">
              <div className="details-field">
                <p className="label">Twitter</p>
                <p className="value">{user.socials.twitter}</p>
              </div>
              <div className="details-field">
                <p className="label">Facebook</p>
                <p className="value">{user.socials.facebook}</p>
              </div>
              <div className="details-field">
                <p className="label">Instagram</p>
                <p className="value">{user.socials.instagram}</p>
              </div>
            </div>
          </section>

          <hr className="details-divider" />

          {/* Guarantor */}
          <section className="details-section">
            <h2 className="details-section-title">Guarantor</h2>
            <div className="details-grid">
              <div className="details-field">
                <p className="label">Full Name</p>
                <p className="value">{user.guarantor.fullName}</p>
              </div>
              <div className="details-field">
                <p className="label">Phone Number</p>
                <p className="value">{user.guarantor.phoneNumber}</p>
              </div>
              <div className="details-field">
                <p className="label">Email Address</p>
                <p className="value">{user.guarantor.email}</p>
              </div>
              <div className="details-field">
                <p className="label">Relationship</p>
                <p className="value">{user.guarantor.relationship}</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab !== 'general' && (
        <div className="user-details-card user-details-card--placeholder">
          <p>
            Only <strong>General Details</strong> is implemented for this
            assessment. Other tabs are placeholders.
          </p>
        </div>
      )}
    </section>
  );
};

export default UserDetailsPage;
