import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="jumbotron text-center bg-primary text-white p-5 rounded">
        <h1 className="display-4">Admin Profile</h1>
        <p className="lead">Welcome back, Super Admin!</p>
      </div>

      {/* Profile Card */}
      <div className="card shadow-lg mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-body text-center">
          <img 
            src="/Images/admin.jpg"
            alt="Admin" 
            className="rounded-circle mb-3" 
            width="120"
          />
          <h4 className="card-title">Caroline</h4>
          <p className="card-text text-muted">Super Admin</p>
          <p className="card-text"><strong>Email:</strong> admin@gmail.com</p>
          <p className="card-text"><strong>Last Login:</strong> 2025-02-11 10:45 AM</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-5">
        <h3 className="text-center mb-3">Recent Activities</h3>
        <ul className="list-group">
          <li className="list-group-item">Updated employee records</li>
          <li className="list-group-item">Approved a new category</li>
          <li className="list-group-item">Reviewed admin access logs</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
