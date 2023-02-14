import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  postGrievanceAction,
  getDataByIdAction,
  postEditGrievData,
  cancelAction,
} from '../action';

import { useDispatch } from 'react-redux';
import FileBase64 from 'react-file-base64';
import { useSelector } from 'react-redux';

const AddGrievance = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let grevId = useParams()?.grevId || null;
  const [notifyState, setNotifyState] = useState(false);

  useEffect(() => {
    if (grevId) {
      dispatch(getDataByIdAction(`grievance/${grevId}`));
    }
  }, [grevId]);

  let { editData } = useSelector((state) => state.studentReducer);

  let initialValues = {
    title: '',
    description: '',
    file: '',
  };

  const [initialState, setInitialState] = useState(initialValues);

  useEffect(() => {
    if (editData) {
      setInitialState(editData);
      grevId = null;
    }
  }, [editData]);

  const [Err, setErr] = useState(false);
  const [onBlurErr, setOnBlurErr] = useState([]);
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (initialState.title === '' || initialState.description.length < 3) {
      setErr(true);
    } else {
      setNotifyState(!notifyState);
      dispatch(
        postGrievanceAction(
          'grievance',
          {
            title: initialState.title,
            description: initialState.description,
            file: initialState.file,
          },
          navigate
        )
      );
    }
  };

  const onFormUpdate = () => {
    if (initialState.title === '' || initialState.description.length < 3) {
      setErr(true);
    } else {
      dispatch(
        postEditGrievData(`grievance/${grevId}`, {
          title: initialState.title,
          description: initialState.description,
          file: initialState.file,
        })
      );
      navigate('/grievance');
    }
  };

  const backBtn = () => {
    dispatch(cancelAction());
    navigate('/grievance');
  };

  return (
    <div className="container mt-5 change-pass">
      <form onSubmit={onFormSubmit}>
        <div className="form-group mt-4">
          <label htmlFor="exampleInputEmail1">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            onChange={(e) =>
              setInitialState({ ...initialState, title: e.target.value })
            }
            value={initialState.title}
            onBlur={() => {
              if (initialState.title === '') {
                setOnBlurErr([...onBlurErr, 'title']);
              } else {
                setOnBlurErr(onBlurErr.filter((e) => e !== 'title'));
              }
            }}
          />
          {Err && initialState.title === '' ? (
            <label className="text-danger">Title is Required!</label>
          ) : null}
          {!Err && onBlurErr.includes('title') && initialState.title === '' ? (
            <label className="text-danger">Title is Required!</label>
          ) : null}
        </div>

        <div className="form-group mt-4">
          <label htmlFor="exampleInputPassword1">Description</label>
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

        <div>
          <label className="text-success">File is not Mandatory</label>
        </div>
        <div>
          <FileBase64
            multiple={false}
            onDone={(files) => {
              setInitialState({
                ...initialState,
                file: files.base64,
              });
            }}
            value={initialState.file}
            className="file-base64"
          />
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-danger mt-4"
            onClick={backBtn}
          >
            Back
          </button>
          {editData ? (
            <button
              type="button"
              className="btn btn-info mt-4 ml-3"
              onClick={onFormUpdate}
            >
              Update
            </button>
          ) : (
            <button type="submit" className="btn btn-success mt-4 ml-3">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddGrievance;
