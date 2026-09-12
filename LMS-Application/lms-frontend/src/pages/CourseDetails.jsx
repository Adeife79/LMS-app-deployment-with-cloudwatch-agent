import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/api';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, lessonsRes, materialsRes, enrollRes] = await Promise.all([
          api.get('courses/'),
          api.get('lessons/'),
          api.get('materials/'),
          api.get('enrollments/'),
        ]);

        const foundCourse = coursesRes.data.find((c) => c.id === parseInt(id));
        setCourse(foundCourse);
        setLessons(lessonsRes.data.filter((l) => l.course === parseInt(id)));
        setMaterials(materialsRes.data);

        const enrolledCourses = enrollRes.data.map((e) => e.course);
        setEnrolled(enrolledCourses.includes(parseInt(id)));
      } catch (err) {
        console.error('Failed to load course details:', err);
      }
    };

    fetchData();
  }, [id]);

  const handleEnroll = async () => {
    try {
      const userId = 1; // placeholder
      await api.post('enrollments/enroll/', {
        user: userId,
        course: parseInt(id),
      });
      setMessage('Enrolled successfully!');
      setEnrolled(true);
    } catch (err) {
      console.error(err);
      setMessage('Failed to enroll.');
    }
  };

  if (!course) return <div className="container py-5"><p>Loading course...</p></div>;

  return (
    <div className="container py-5">
      <h1 className="mb-3">{course.title}</h1>
      <p className="text-muted mb-4">{course.description}</p>

      {enrolled ? (
        <div className="alert alert-success">✅ You are enrolled in this course.</div>
      ) : (
        <button className="btn btn-primary mb-3" onClick={handleEnroll}>
          Enroll in Course
        </button>
      )}

      {message && <div className="alert alert-info">{message}</div>}

      <h2 className="mt-5 mb-3">Lessons</h2>

      {lessons.length === 0 ? (
        <p>No lessons available.</p>
      ) : (
        lessons.map((lesson) => (
          <div key={lesson.id} className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">{lesson.title}</h5>
              <ul className="list-group list-group-flush mt-3">
                {materials
                  .filter((m) => m.lesson === lesson.id)
                  .map((material) => (
                    <li key={material.id} className="list-group-item">
                      <a
                        href={material.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none"
                      >
                        📎 {material.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseDetails;
