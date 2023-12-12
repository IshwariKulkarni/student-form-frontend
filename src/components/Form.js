import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import 'bootstrap/dist/css/bootstrap.min.css';


const Form = () => {
    const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  // const [newState, setNewState] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    mothersName: '',
    email: '',
    dob: '',
    class: '',
    stateId: 1,
    city: '',
    pincode: '',
    gender: '',
    category: '',
  });
  

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('https://localhost:7079/api/State');
        console.log('Fetched states:', response.data);
        setStates(response.data); // Assuming the response is an array of state objects
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);

  const handleStateChange = (selectedOption) => {
    console.log('Selected Option(before):', selectedOption);
   
    if (selectedOption && selectedOption.__isNew__) {
      // If a new state is typed and not present in the list, create it
      handleCreateNewState(selectedOption.label);
    } else {
      setSelectedState(selectedOption);
      setFormData((prevData) => ({
        ...prevData,
        stateId: selectedOption ? selectedOption.value : 1,
      }));
    }
  };

  const handleCreateNewState = async (newStateName) => {
    try {
      console.log('Creating New State:', newStateName);
      const response = await axios.post('https://localhost:7079/api/State', { stateName: newStateName });
      const newOption = { value: response.data.stateId, label: response.data.stateName };

      setSelectedState(newOption);

      setFormData((prevData) => ({
        ...prevData,
        stateId: newOption.value,
      }));

      
      setStates((prevStates) => [...prevStates, newOption]);
      console.log("New option :", newOption)
      
    } catch (error) {
      console.error('Error creating new state:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Include the selected state in your formData
    setFormData((prevData) => ({
      ...prevData,
      stateId: selectedState ? selectedState.value : 1,
      // stateId:selectedState.value
    }));

    console.log('Form data before submission:', formData); // Log form data to the console

    try {
      const response = await axios.post('https://localhost:7079/api/Student/AddStudent', formData);
      console.log('Form submitted successfully:', response.data);
      // Add any success handling logic here
      
  toast.success('Form submitted successfully');
  
    } catch (error) {
      console.error('Error submitting form:', error);
      // Add any error handling logic here
      toast.error('Error submitting form');
    }
  };

  return (
    <div className='container mt-2'>
        <h2 className="mb-4">Student Admission Form</h2>
        <div className="d-flex justify-content-center">
        <div className="border p-4 w-50" style={{ backgroundColor: '#e6f7ff' }}>
    <form onSubmit={handleSubmit}>
      

      <div className="row">
        <div className="col-md-6">
          {/* Left Column */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input type="text" name="name" id="name" className="form-control" value={formData.name} onChange={handleInputChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" name="email" id="email" className="form-control" value={formData.email} onChange={handleInputChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="studentClass" className="form-label">Class:</label>
            {/* <input type="text" name="class" id="class" className="form-control" value={formData.class} onChange={handleInputChange} required />
             */}
             <select
    name="class"
    id="class"
    className="form-control"
    value={formData.class}
    onChange={handleInputChange}
    required
  ><option value="">Select Class</option>
  <option value="5th">5th</option>
  <option value="6th">6th</option>
  <option value="7th">7th</option>
</select>
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label">City:</label>
            <input type="text" name="city" id="city" className="form-control" value={formData.city} onChange={handleInputChange} required />
          </div>

          <div className="mb-3">
            <label className="form-check-label d-block">Gender:</label>
            <div className="form-check form-check-inline">
              <input type="radio" id="male" className="form-check-input" name="gender" value="male" checked={formData.gender === "male"} onChange={handleInputChange} required />
              <label htmlFor="male" className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" id="female" className="form-check-input" name="gender" value="female" checked={formData.gender === "female"} onChange={handleInputChange} />
              <label htmlFor="female" className="form-check-label">Female</label>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          {/* Right Column */}
          <div className="mb-3">
            <label htmlFor="mothersName" className="form-label">Mother's Name:</label>
            <input type="text" name="mothersName" id="mothersName" className="form-control" value={formData.mothersName} onChange={handleInputChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="dob" className="form-label">Date of Birth:</label>
            <input type="date" name="dob" id="dob" className="form-control" value={formData.dob} onChange={handleInputChange} required />
          </div>

          <div className="mb-3">
                  <label htmlFor="state" className="form-label">State:</label>
                  {console.log('Options:', states.map((state) => ({ value: state.stateId, label: state.stateName })))}

                  <CreatableSelect
                    id="state"
                    isClearable
                    onChange={handleStateChange}
                    onCreateOption={handleCreateNewState}
                    options={states.map((state) => ({ value: state.stateId, label: state.stateName }))}
                    value={selectedState}
                  />
                </div>

          <div className="mb-3">
            <label htmlFor="pincode" className="form-label">Pincode:</label>
            <input type="text" name="pincode" id="pincode" className="form-control" value={formData.pincode} onChange={handleInputChange} required />
          </div>

          <div className="mb-3">
            <label className="form-check-label d-block">Category:</label>
            <div className="form-check form-check-inline">
              <input type="radio" id="general" className="form-check-input" name="category" value="general" checked={formData.category === "general"} onChange={handleInputChange} required />
              <label htmlFor="general" className="form-check-label">General</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" id="obc" className="form-check-input" name="category" value="obc" checked={formData.category === "obc"} onChange={handleInputChange} />
              <label htmlFor="obc" className="form-check-label">OBC</label>
            </div>
          </div>
        </div>
      </div>
    

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    
    </div>
    </div>
    <ToastContainer />
  </div>
);
};

export default Form
