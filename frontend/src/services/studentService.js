
const API_URL = "http://localhost:5000/api/students";

// Get all students
export const getStudents = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return response.json();
};

// Add student
export const addStudentAPI = async (student) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(student)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add student");
  }

  return data.student;
};

// Delete student
export const deleteStudentAPI = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete student");
  }

  return data;
};

// Update student
export const updateStudentAPI = async (id, student) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(student)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update student");
  }

  return data.student;
};
