import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import CourseCard from '../components/CourseCard';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [catRes, courseRes] = await Promise.all([
          api.get('categories/'),
          api.get('courses/'),
        ]);
        setCategories(Array.isArray(catRes.data) ? catRes.data : []);
        setCourses(Array.isArray(courseRes.data) ? courseRes.data : []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        if (err.response?.status === 401) {
          navigate('/login');
        }
        setCategories([]);
        setCourses([]);
      }
    };

    fetchData();
  }, [navigate]);

  const filteredCourses = selectedCategory
    ? courses.filter((c) => c.category === selectedCategory)
    : courses;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">📚 Available Courses</h1>

      <div className="mb-4">
        <div className="btn-group flex-wrap" role="group">
          <button
            type="button"
            className={`btn ${selectedCategory === null ? 'btn-primary' : 'btn-outline-secondary'} me-2 mb-2`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-outline-secondary'} me-2 mb-2`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="row">
        {filteredCourses.map((course) => (
          <div key={course.id} className="col-12 col-sm-6 col-lg-4 mb-4">
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;