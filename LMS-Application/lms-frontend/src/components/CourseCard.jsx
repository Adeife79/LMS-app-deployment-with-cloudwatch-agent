import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="card h-100">
      <img
        src={course.image || "https://via.placeholder.com/300x150"}
        className="card-img-top"
        alt="course"
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{course.title}</h5>
        <p className="card-text text-muted">{course.description}</p>
        <Link to={`/courses/${course.id}`} className="btn btn-outline-primary mt-auto">
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
