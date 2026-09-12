import { useEffect, useState } from 'react';
import api from '../utils/api'; // Import the centralized axios instance

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', bio: '' });
  const [message, setMessage] = useState('');
  const [role, setRole] = useState(null); // "student" or "teacher"

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const studentRes = await api.get('user/profile/student/');
        setProfile(studentRes.data || { name: '', bio: '' });
        setRole('student');
      } catch (error) {
        try {
          const teacherRes = await api.get('user/profile/teacher/');
          setProfile(teacherRes.data || { name: '', bio: '' });
          setRole('teacher');
        } catch (error) {
          console.error('Unable to fetch profile for either role');
          setMessage('Error loading profile.');
        }
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const endpoint =
      role === 'student'
        ? 'user/profile/student/'
        : 'user/profile/teacher/';

    try {
      await api.post(endpoint, profile);
      setMessage('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update profile:', err);
      setMessage('Update failed.');
    }
  };

  return (
    <div className="container py-5">
      <div className="card p-4 mx-auto shadow" style={{ maxWidth: '500px' }}>
        <h2 className="mb-4 text-center">
          {role === 'student' ? 'Student Profile' : role === 'teacher' ? 'Teacher Profile' : 'Profile'}
        </h2>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={profile.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="bio" className="form-label">Bio</label>
            <textarea
              name="bio"
              id="bio"
              rows="4"
              value={profile.bio}
              onChange={handleChange}
              className="form-control"
              placeholder="Tell us about yourself"
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
