import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  postUsersAction,
  getUsersDataAction,
  getDataByIdAction,
  postEditData,
} from '../action';
import { useNavigate } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import { decryptFunction, encryptFunction } from '../utils/security';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './App';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useContext(Context);
  const userId = useParams()?.id || null;

  useEffect(() => {
    dispatch(getUsersDataAction('users'));
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(getDataByIdAction(`users/${userId}`));
    }
  }, [userId]);

  const { userData } = useSelector((state) => state.studentReducer);
  const { editData } = useSelector((state) => state.studentReducer);

  useEffect(() => {
    if (editData) {
      setInitialState(editData);
    }
  }, [editData]);

  let initialValues = {
    name: '',
    email: '',
    phone: '',
    CurrentAddress: '',
    PresentAddess: '',
    image: '',
  };

  let [initialState, setInitialState] = useState(initialValues);
  const [checkAddress, setCheckAddress] = useState(false);

  let existEmail = userData.filter((d) => d.email === initialState.email);

  useEffect(() => {
    if (existEmail.length > 0 && editData === null) {
      alert(
        'User Already exist! Please Register with a different email address'
      );
      setInitialState({
        ...initialState,
        email: '',
      });
    }
  }, [initialState.email]);

  useEffect(() => {
    if (checkAddress === true)
      setInitialState({
        ...initialState,
        PresentAddess: initialState.CurrentAddress,
      });
    else {
      setInitialState({
        ...initialState,
        PresentAddess: '',
      });
    }
  }, [checkAddress]);

  const [err, setErr] = useState(false);
  const EmailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (
      !EmailRegex.test(initialState.email) ||
      initialState.name.length < 3 ||
      initialState.phone.length < 10 ||
      initialState.phone.length > 10 ||
      initialState.CurrentAddress.length < 10 ||
      initialState.PresentAddess.length < 10 ||
      initialState.image === ''
    ) {
      setErr(true);
    } else if (existEmail.length > 0 && editData === null) {
      setInitialState({
        ...initialState,
        email: '',
      });
    } else if (editData) {
      dispatch(
        postEditData(`users/${userId}`, {
          name: initialState.name,
          email: initialState.email,
          phone: initialState.phone,
          CurrentAddress: initialState.CurrentAddress,
          PresentAddess: initialState.PresentAddess,
          image: initialState.image,
        })
      );

      navigate(-1);
    } else {
      dispatch(
        postUsersAction('users', {
          name: initialState.name,
          email: initialState.email,
          phone: initialState.phone,
          password: encryptFunction(initialState.phone),
          CurrentAddress: initialState.CurrentAddress,
          PresentAddess: initialState.PresentAddess,
          image: initialState.image,
        })
      );
      navigate('/login');
    }
  };

  return (
    <div className="regOuter container mt-5 mb-5">
      <form className="register ml-auto mr-auto " onSubmit={onFormSubmit}>
        <h4>Sign Up</h4>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            onChange={(e) =>
              setInitialState({ ...initialState, name: e.target.value })
            }
            value={initialState.name}
          />
          {err && initialState.name === '' ? (
            <label className="text-danger">Name Required!</label>
          ) : null}
          {err &&
          initialState.name.length > 0 &&
          initialState.name.length < 3 ? (
            <label className="text-danger">Please enter a valid email!</label>
          ) : null}
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) =>
              setInitialState({ ...initialState, email: e.target.value })
            }
            value={initialState.email}
          />
          {err && initialState.email === '' ? (
            <label className="text-danger">Email Required!</label>
          ) : null}
          {err &&
          initialState.email !== '' &&
          !EmailRegex.test(initialState.email) ? (
            <label className="text-danger">Please enter a valid email!</label>
          ) : null}
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="number"
            className="form-control"
            placeholder="Phone Number"
            onChange={(e) =>
              setInitialState({ ...initialState, phone: e.target.value })
            }
            value={initialState.phone}
          />
          <label className="text-success">
            [ Use Your Phone Number as Password ]
          </label>
          <br />
          {err && initialState.phone === '' ? (
            <label className="text-danger">Phone Number is Required!</label>
          ) : null}
          {(err &&
            initialState.phone.length > 0 &&
            initialState.phone.length < 10) ||
          initialState.phone.length > 10 ? (
            <label className="text-danger">
              Please enter a valid Number (only 10 numbers!)
            </label>
          ) : null}
        </div>

        <div className="form-group">
          <label>Current Address</label>
          <textarea
            className="form-control"
            placeholder="Current Address"
            onChange={(e) =>
              setInitialState({
                ...initialState,
                CurrentAddress: e.target.value,
              })
            }
            value={initialState.CurrentAddress}
          ></textarea>
          {err && initialState.CurrentAddress === '' ? (
            <label className="text-danger">Current Address is Required!</label>
          ) : null}
          {err &&
          initialState.CurrentAddress.length > 0 &&
          initialState.CurrentAddress.length < 10 ? (
            <label className="text-danger">
              Please enter a valid Address (min 10 characters!)
            </label>
          ) : null}
        </div>

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            onChange={() => setCheckAddress(!checkAddress)}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Present Address Same as Above
          </label>
        </div>

        <div className="form-group">
          <label>Present Address</label>
          <textarea
            className="form-control"
            placeholder="Current Address"
            onChange={(e) =>
              setInitialState({
                ...initialState,
                PresentAddess: e.target.value,
              })
            }
            value={initialState.PresentAddess}
          ></textarea>
          {err && initialState.PresentAddess === '' ? (
            <label className="text-danger">Present Address is Required!</label>
          ) : null}
          {err &&
          initialState.PresentAddess.length > 0 &&
          initialState.PresentAddess.length < 10 ? (
            <label className="text-danger">
              Please enter a valid Address (min 10 characters!)
            </label>
          ) : null}
        </div>
        <div>
          <FileBase64
            multiple={false}
            onDone={(files) => {
              setInitialState({
                ...initialState,
                image: files.base64,
              });
            }}
            value={initialState.image}
            className="file-base64"
          />
          <div>
            {err && initialState.image.length == '' ? (
              <label className="text-danger">Image is Required!</label>
            ) : null}
          </div>
        </div>
        <div className="mt-4 d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-danger mr-3"
            onClick={() => {
              setInitialState(initialValues);
              navigate(-1);
            }}
          >
            Back
          </button>
          <button type="submit" className="btn btn-success">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
