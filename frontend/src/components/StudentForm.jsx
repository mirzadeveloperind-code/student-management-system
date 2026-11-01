
import { useState, useEffect } from "react";

function StudentForm({
  addStudent,
  updateStudent,
  editingStudent,
  cancelEdit
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setEmail(editingStudent.email);
      setCourse(editingStudent.course);
      setAge(editingStudent.age);
    } else {
      clearForm();
    }
  }, [editingStudent]);

  const clearForm = () => {
    setName("");
    setEmail("");
    setCourse("");
    setAge("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const student = {
      name,
      email,
      course,
      age: Number(age)
    };

    if (editingStudent) {
      await updateStudent(editingStudent._id, student);
    } else {
      await addStudent(student);
    }

    clearForm();
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>
        {editingStudent ? "Edit Student" : "Add New Student"}
      </h2>

      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Age"
        min="1"
        max="120"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />

      <button type="submit">
        {editingStudent ? "Update Student" : "+ Add Student"}
      </button>

      {editingStudent && (
        <button
          type="button"
          className="cancel-btn"
          onClick={cancelEdit}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default StudentForm;
