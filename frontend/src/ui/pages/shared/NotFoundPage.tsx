import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div className="not-found">
    <h2>Page not found</h2>
    <Link className="button button--primary" to="/dashboard">Return home</Link>
  </div>
);
