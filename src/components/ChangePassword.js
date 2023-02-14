import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassAction } from '../action';
import { useDispatch } from 'react-redux';

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let initialValues = {
    currentPass: '',
    createPass: '',
    confirmPass: '',
  };

  const [initialState, setInitialState] = useState(initialValues);
  const [Err, setErr] = useState(false);
  const [onBlurErr, setOnBlurErr] = useState([]);
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (
      initialState.currentPass === '' ||
      initialState.createPass.length < 3 ||
      initialState.confirmPass.length === ''
    ) {
      setErr(true);
    } else if (initialState.createPass !== initialState.confirmPass) {
      alert('Passwords do not match!');
    } else {
      dispatch(
        changePassAction(
          {
            currentPass: initialState.currentPass,
            confirmPass: initialState.confirmPass,
          },
          navigate
        )
      );
    }
  };

  return (
    <div className="container mt-5 change-pass">
      <form onSubmit={onFormSubmit}>
        <div className="form-group mt-4">
          <label htmlFor="exampleInputEmail1">Current Password</label>
          <input
            type="text"
            className="form-control"
            placeholder="Current Password"
            onChange={(e) =>
              setInitialState({ ...initialState, currentPass: e.target.value })
            }
            value={initialState.currentPass}
            onBlur={() => {
              if (initialState.currentPass === '') {
                setOnBlurErr([...onBlurErr, 'currentPass']);
              } else {
                setOnBlurErr(onBlurErr.filter((e) => e !== 'currentPass'));
              }
            }}
          />
          {Err && initialState.currentPass === '' ? (
            <label className="text-danger">Current Password is Required!</label>
          ) : null}
          {!Err &&
          onBlurErr.includes('currentPass') &&
          initialState.currentPass === '' ? (
            <label className="text-danger">Current Password is Required!</label>
          ) : null}
        </div>
        <div className="form-group mt-4">
          <label htmlFor="exampleInputPassword1">New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="New Password"
            onChange={(e) =>
              setInitialState({ ...initialState, createPass: e.target.value })
            }
            value={initialState.createPass}
            onBlur={() => {
              if (initialState.createPass === '') {
                setOnBlurErr([...onBlurErr, 'createPass']);
              } else {
                setOnBlurErr(onBlurErr.filter((e) => e !== 'createPass'));
              }
            }}
          />
          {Err && initialState.createPass === '' ? (
            <label className="text-danger">New Password is Required!</label>
          ) : null}
          {Err &&
          initialState.createPass.length > 0 &&
          initialState.createPass.length < 3 ? (
            <label className="text-danger">
              Please Enter a strong password!
            </label>
          ) : null}
          {!Err &&
          onBlurErr.includes('createPass') &&
          initialState.createPass === '' ? (
            <label className="text-danger">New Password is Required!</label>
          ) : null}
        </div>

        <div className="form-group mt-4">
          <label htmlFor="exampleInputPassword1">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            onChange={(e) =>
              setInitialState({ ...initialState, confirmPass: e.target.value })
            }
            value={initialState.confirmPass}
            onBlur={() => {
              if (initialState.confirmPass === '') {
                setOnBlurErr([...onBlurErr, 'confirmPass']);
              } else {
                setOnBlurErr(onBlurErr.filter((e) => e !== 'confirmPass'));
              }
            }}
          />
          {Err && initialState.confirmPass === '' ? (
            <label className="text-danger">Confirm Password is Required!</label>
          ) : null}
          {!Err &&
          onBlurErr.includes('confirmPass') &&
          initialState.confirmPass === '' ? (
            <label className="text-danger">Confirm Password is Required!</label>
          ) : null}
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-danger mt-4"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button type="submit" className="btn btn-success mt-4 ml-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
