import "./newEvent.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import eventApi from "../../api/eventApi";
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import toast, { Toaster } from 'react-hot-toast';
import Select from "react-select";
import { useEffect } from "react";
import moment from "moment";

const facultyOptions = [
  { value: "Graphic and Digital Design", label: "Graphic and Digital Design" },
  { value: "IT", label: "IT" },
  { value: "Business Management", label: "Business Management" }
];

const NewEvent = () => {
  const { id } = useParams();
  const isEdit = id !== '0'

  const [name, setName] = useState('');
  const [due_date, setDueDate] = useState(null);
  const [closure_date, setClosureDate] = useState(null);
  const [description, setDescription] = useState('');
  const [faculty, setFaculty] = useState(facultyOptions[0].value);

  useEffect(() => {
    const handler = async () => {
      if (id !== '0') {
        const response = await eventApi.detail(id)
        const event = response.event
        setName(event.name)
        setDueDate(moment(event.due_date).valueOf())
        setClosureDate(moment(event.closure_date).valueOf())
        setDescription(event.description)
        // setFaculty(event.faculty)
      }
    }

    handler()

    return () => {
    }
  }, [isEdit, id])

  const handleUpdate = async () => {
    const response = await eventApi.update(id, {
      name,
      description,
      due_date: due_date,
      closure_date: closure_date
    })

    if (response) {
      toast.success('Cập nhật event thành công', {
        position: "top-right",
        reverseOrder: true,
        duration: 6000,
      });
    } else {
      toast.error('Cập nhật event thất bại', {
        position: "top-right",
        reverseOrder: true,
        duration: 6000,
      });
    }
  }

  const navigate = useNavigate();
  const showToastMessageSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      reverseOrder: true,
      duration: 6000,
    });
  };

  const showToastMessageFail = (message) => {
    toast.error(message, {
      position: "top-right",
      reverseOrder: true,
      duration: 6000,
    });
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const facultyChangeHandler = (selection) => {
    setFaculty(selection.value);
    console.log("User Selected Value - ", selection.value);
  };

  const handleDateTimeChange = (name, newDateTime) => {
    console.log(newDateTime)
    const formattedDate = newDateTime.format('YYYY-MM-DDTHH:mm:ss');
    switch (name) {
      case 'due_date':
        setDueDate(formattedDate);
        break;
      case 'closure_date':
        setClosureDate(formattedDate);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!closure_date || closure_date <= due_date) {
      showToastMessageFail("Closure Date must be after Due Date");
      return;
    }
    if (isEdit) {
      await handleUpdate()
      showToastMessageSuccess('Cập nhật thành công');
      navigate('/campaigns');

    } else {
      try {
        const eventData = {
          name,
          due_date,
          closure_date,
          description,
          faculty,
        };

        const response = await eventApi.create(eventData);
        console.log("response", response);
        showToastMessageSuccess(response.message);
        navigate('/campaigns');
      } catch (error) {
        console.log('Failed to fetch', error);
        showToastMessageFail(error.message);
      }
    }


  };

  return (
    <div className="new">
      <Toaster />
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{!isEdit ? 'Add Event' : 'Edit Event'}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="formInput">
                <label htmlFor="due_date">Due Date:</label>
                <DateTime
                  id="due_date"
                  value={due_date}
                  onChange={(newDateTime) => handleDateTimeChange('due_date', newDateTime)}
                  required
                />
              </div>
              <div className="formInput">
                <label htmlFor="closure_date">Closure Date:</label>
                <DateTime
                  id="closure_date"
                  value={closure_date}
                  onChange={(newDateTime) => handleDateTimeChange('closure_date', newDateTime)}
                  required
                />
              </div>
              <div className="formInput">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="formInput">
                <label htmlFor="faculty">Faculty:</label>
                <Select
                  name="faculty"
                  value={{ value: faculty, label: faculty }}
                  options={facultyOptions}
                  onChange={facultyChangeHandler}
                  required
                />
              </div>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEvent;
