import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { postGrievanceAction } from '../action';

const AddDiscussions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Err, setErr] = useState(false);
  const [onBlurErr, setOnBlurErr] = useState([]);

  let initialValues = {
    subject: '',
    faculty: '',
    description: '',
    sendMail: false,
  };

  const [initialState, setInitialState] = useState(initialValues);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (
      initialState.subject === '' ||
      initialState.faculty === '' ||
      initialState.description.length < 3
    ) {
      setErr(true);
    } else {
      dispatch(
        postGrievanceAction('discussions', {
          subject: initialState.subject,
          faculty: initialState.faculty,
          description: initialState.description,
          sendMail: initialState.sendMail,
        })
      );
      navigate('/discussions');
    }
  };

  return (
    <div className="container mt-5 change-pass">
      <h4>Add Discussions</h4>
      <form onSubmit={onFormSubmit}>
        <div className="form-group mt-4">
          <label htmlFor="exampleInputEmail1">Subject</label>
          <div>
            <select
              className="form-control form-select-lg mb-3"
              aria-label=".form-select-lg example"
              onChange={(e) =>
                setInitialState({
                  ...initialState,
                  subject: e.target.value,
                })
              }
              value={initialState.subject}
              onBlur={() => {
                if (initialState.subject === '') {
                  setOnBlurErr([...onBlurErr, 'subject']);
                } else {
                  setOnBlurErr(onBlurErr.filter((e) => e !== 'subject'));
                }
              }}
            >
              <option value="">Choose Subject</option>
              <option value="English">English</option>
              <option value="Science">Science</option>
              <option value="Geography">Geography</option>
              <option value="physics">physics</option>
            </select>
            <div>
              {Err && initialState.subject === '' ? (
                <label className="text-danger">Subject is Required!</label>
              ) : null}
              {!Err &&
              onBlurErr.includes('subject') &&
              initialState.subject === '' ? (
                <label className="text-danger">Subject is Required!</label>
              ) : null}
            </div>
          </div>
        </div>
        {/* ============================== */}
        <div className="form-group mt-4">
          <label htmlFor="exampleInputEmail1">Faculty</label>
          <div>
            <select
              className="form-select-lg mb-3 form-control"
              aria-label=".form-select-lg example"
              onChange={(e) =>
                setInitialState({
                  ...initialState,
                  faculty: e.target.value,
                })
              }
              value={initialState.faculty}
              onBlur={() => {
                if (initialState.faculty === '') {
                  setOnBlurErr([...onBlurErr, 'faculty']);
                } else {
                  setOnBlurErr(onBlurErr.filter((e) => e !== 'faculty'));
                }
              }}
            >
              <option value="">Choose Faculty</option>
              <option value="Dr. Suresh Subramoniam">
                Dr. Suresh Subramoniam
              </option>
              <option value="Dr. Raju G">Dr. Raju G</option>
              <option value="Dr. Dhanya J.S">Dr. Dhanya J.S</option>
              <option value="Ms. Gayathri Renjit">Ms. Gayathri Renjit</option>
            </select>
            <div>
              {Err && initialState.faculty === '' ? (
                <label className="text-danger">Faculty is Required!</label>
              ) : null}
              {!Err &&
              onBlurErr.includes('faculty') &&
              initialState.faculty === '' ? (
                <label className="text-danger">Faculty is Required!</label>
              ) : null}
            </div>
          </div>
        </div>
        {/* ================================= */}

        <div className="form-group mt-4">
          <label>Description</label>
          <textarea
            className="form-control"
            placeholder="Description"
            rows="4"
            onChange={(e) =>
              setInitialState({ ...initialState, description: e.target.value })
            }
            value={initialState.description}
            onBlur={() => {
              if (initialState.description === '') {
                setOnBlurErr([...onBlurErr, 'description']);
              } else {
                setOnBlurErr(onBlurErr.filter((e) => e !== 'description'));
              }
            }}
          ></textarea>

          {Err && initialState.description === '' ? (
            <label className="text-danger">Description is Required!</label>
          ) : null}
          {Err &&
          initialState.description.length > 0 &&
          initialState.description.length < 3 ? (
            <label className="text-danger">
              Minimum 3 characters required!
            </label>
          ) : null}
          {!Err &&
          onBlurErr.includes('description') &&
          initialState.description === '' ? (
            <label className="text-danger">Description is Required!</label>
          ) : null}
        </div>

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            onChange={(e) =>
              setInitialState({
                ...initialState,
                sendMail: !initialState.sendMail,
              })
            }
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Send Email to faculty
          </label>
        </div>

        <div className="d-flex justify-content-end">
          <span>
            <button
              type="button"
              className="btn btn-danger mt-2"
              onClick={() => navigate('/discussions')}
            >
              Back
            </button>
          </span>
          <button type="submit" className="btn btn-primary mt-2 mb-4 ml-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDiscussions;
