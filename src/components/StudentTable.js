import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [states, setStates] = useState({}); 

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsResponse = await axios.get('https://localhost:7079/api/Student/GetStudents');
        setStudents(studentsResponse.data);

        // Fetch and set state names based on stateId
        const stateIds = studentsResponse.data.map((student) => student.stateId);
        const uniqueStateIds = Array.from(new Set(stateIds));
        
        const statesResponse = await Promise.all(
          uniqueStateIds.map((stateId) => axios.get(`https://localhost:7079/api/State/GetStateById/${stateId}`))
        );

        const stateMap = {};
        statesResponse.forEach((response) => {
          stateMap[response.data.stateId] = response.data.stateName;
        });

        setStates(stateMap);
      } catch (error) {
        console.error('Error fetching students or states:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className='container mt-2'>
      <h2 className="mb-4">Student Data</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mother's Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Class</th>
            <th>State</th>
            <th>City</th>
            <th>Pincode</th>
            <th>Gender</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.mothersName}</td>
              <td>{student.email}</td>
              <td>{student.dob}</td>
              <td>{student.class}</td>
              <td>{states[student.stateId]}</td>
              <td>{student.city}</td>
              <td>{student.pincode}</td>
              <td>{student.gender}</td>
              <td>{student.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;

