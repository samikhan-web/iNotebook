import React, { useEffect, useState } from "react";

const Account = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", bio: "" });
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");

  // Fetch user details
  const getUser = async () => {
    const response = await fetch("/api/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setUser(json);
    setFormData({ name: json.name, email: json.email, bio: json.bio || "" });
  };

  // Update profile
  const updateUser = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/updateuser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(formData),
    });
    const json = await response.json();
    setUser(json);
    setEditMode(false);
    setMessage("✅ Profile updated successfully");
  };

  // Change password
  const changePassword = async (e) => {
    e.preventDefault();
    const response = await fetch("api/auth/changepassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(passwordData),
    });
    const json = await response.json();
    if (json.success) {
      setMessage("✅ Password updated successfully");
      setPasswordData({ oldPassword: "", newPassword: "" });
      setPasswordMode(false);
    } else {
      setMessage("❌ " + (json.error || "Failed to update password"));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return <h3 className="text-center mt-5">Loading account details...</h3>;
  }

  return (
    <div className="container my-4">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">👤 My Account</h3>
        </div>
        <div className="card-body">
          {message && <div className="alert alert-info">{message}</div>}

          {/* View Mode */}
          {!editMode && !passwordMode && (
            <>
              <div className="d-flex align-items-center mb-3">
                <img
                  src={user.profilePicture || "https://via.placeholder.com/80"}
                  alt="Profile"
                  className="rounded-circle me-3 border"
                  width="80"
                  height="80"
                />
                <div>
                  <h5 className="mb-1">{user.name}</h5>
                  <p className="mb-1 text-muted">{user.email}</p>
                  <small className="text-muted">
                    Member since: {new Date(user.date).toDateString()}
                  </small>
                </div>
              </div>

              <p className="mt-3"><strong>Bio:</strong> {user.bio || "No bio added yet."}</p>

              <div className="mt-3">
                <button className="btn btn-outline-primary me-2" onClick={() => setEditMode(true)}>
                  ✏️ Edit Profile
                </button>
                <button className="btn btn-outline-danger" onClick={() => setPasswordMode(true)}>
                  🔒 Change Password
                </button>
              </div>
            </>
          )}

          {/* Edit Profile Form */}
          {editMode && (
            <form onSubmit={updateUser}>
              <h5 className="mb-3">✏️ Edit Profile</h5>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Bio</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-success me-2">💾 Save Changes</button>
              <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
            </form>
          )}

          {/* Change Password Form */}
          {passwordMode && (
            <form onSubmit={changePassword}>
              <h5 className="mb-3">🔒 Change Password</h5>
              <div className="mb-3">
                <label className="form-label">Old Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success me-2">✅ Update Password</button>
              <button type="button" className="btn btn-secondary" onClick={() => setPasswordMode(false)}>Cancel</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
