
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

import {
  getStudents,
  addStudentAPI,
  deleteStudentAPI,
  updateStudentAPI
} from "./services/studentService";

import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setError("");
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (student) => {
    try {
      setError("");
      const newStudent = await addStudentAPI(student);
      setStudents((prev) => [newStudent, ...prev]);
      alert("Student added successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const updateStudent = async (id, student) => {
    try {
      setError("");
      const updatedStudent = await updateStudentAPI(id, student);

      setStudents((prev) =>
        prev.map((item) =>
          item._id === id ? updatedStudent : item
        )
      );

      setEditingStudent(null);
      alert("Student updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      setError("");
      await deleteStudentAPI(id);

      setStudents((prev) =>
        prev.filter((student) => student._id !== id)
      );

      if (editingStudent?._id === id) {
        setEditingStudent(null);
      }

      alert("Student deleted successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const totalCourses = new Set(
    students.map((student) => student.course.trim().toLowerCase())
  ).size;

  const averageAge = students.length
    ? Math.round(
        students.reduce((total, student) => total + Number(student.age), 0) /
        students.length
      )
    : 0;

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">🎓</span>
          <h2>EduManage</h2>
        </div>

        <p className="sidebar-label">MAIN MENU</p>

        <nav className="sidebar-nav">
          <a className="nav-link active" href="#dashboard">
            <span>▦</span> Dashboard
          </a>

          <a className="nav-link" href="#students">
            <span>♙</span> Students
          </a>

          <a className="nav-link" href="#add-student">
            <span>＋</span> Add Student
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="admin-avatar">A</div>
          <div>
            <strong>Administrator</strong>
            <small>Management Panel</small>
          </div>
        </div>
      </aside>

      <div className="main-area">
        <Navbar />

        <main className="dashboard-content" id="dashboard">
          <div className="welcome">
            <div>
              <h1>Dashboard Overview</h1>
              <p>Welcome back! Here's your student management summary.</p>
            </div>
            <a className="primary-link" href="#add-student">
              + Add Student
            </a>
          </div>

          {error && (
            <p className="error-message">{error}</p>
          )}

          <div className="stats-grid">
            <div className="dashboard-card">
              <div className="stat-icon blue-icon">♙</div>
              <p>Total Students</p>
              <h2>{students.length}</h2>
              <small>Registered students</small>
            </div>

            <div className="dashboard-card">
              <div className="stat-icon green-icon">▤</div>
              <p>Total Courses</p>
              <h2>{totalCourses}</h2>
              <small>Unique courses</small>
            </div>

            <div className="dashboard-card">
              <div className="stat-icon orange-icon">◷</div>
              <p>Average Age</p>
              <h2>{averageAge}</h2>
              <small>Years</small>
            </div>
          </div>

          <section id="add-student" className="dashboard-section">
            <StudentForm
              addStudent={addStudent}
              updateStudent={updateStudent}
              editingStudent={editingStudent}
              cancelEdit={() => setEditingStudent(null)}
            />
          </section>

          <section id="students" className="dashboard-section">
            {loading ? (
              <p>Loading students...</p>
            ) : (
              <StudentList
                students={students}
                deleteStudent={deleteStudent}
                editStudent={setEditingStudent}
              />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
