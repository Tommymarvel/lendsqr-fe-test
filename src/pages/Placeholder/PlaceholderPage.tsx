import { useNavigate } from 'react-router-dom';
import './PlaceholderPage.scss';

interface PlaceholderPageProps {
  pageName: string;
}

const PlaceholderPage = ({ pageName }: PlaceholderPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="placeholder-page">
      <div className="placeholder-content">
        <div className="placeholder-icon">📄</div>
        <h1 className="placeholder-title">{pageName}</h1>
        <p className="placeholder-message">
          This page is not part of the assessment requirements.
        </p>
        <p className="placeholder-submessage">
          Only the <strong>Users</strong> page and <strong>User Details</strong>{' '}
          page have been implemented as specified.
        </p>
        <button
          className="placeholder-button"
          onClick={() => navigate('/users')}
        >
          Go to Users Page
        </button>
      </div>
    </div>
  );
};

export default PlaceholderPage;
