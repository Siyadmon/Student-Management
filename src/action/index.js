import {
  postDataToJson,
  getDataFromJson,
  editDataInJson,
  deleteDataFromJson,
} from '../Service';

import { encryptFunction, decryptFunction } from '../utils/security';

//action to get user data
export const getUsersDataAction = (url) => async (dispatch) => {
  const { data } = await getDataFromJson(url);
  dispatch({
    type: 'GET_USER_DATA',
    payload: data,
  });
};

//action to post data
export const postUsersAction = (url, data, navigate) => async (dispatch) => {
  const query = await postDataToJson(url, data);
  dispatch(getUsersDataAction('users'));
  alert('Successfully Registered ✓');
  if (navigate) {
    navigate('/');
  }
};

// postGrievanceAction;
export const postGrievanceAction =
  (url, data, navigate) => async (dispatch) => {
    const query = await postDataToJson(url, data);
    dispatch(getUsersDataAction('grievance'));
    alert('Added Successfully ✓');
    navigate('/grievance');
  };

//action to get Grievance data
export const getGrievanceAction = (url) => async (dispatch) => {
  const { data } = await getDataFromJson(url);
  dispatch({
    type: 'GET_GRIEVANCE_DATA',
    payload: data,
  });
};

//login action
export const getLoginDataAction = (url, obj, navigate) => async (dispatch) => {
  const { data } = await getDataFromJson(url);

  const findData = data.find(
    (d) => d.email === obj.email && decryptFunction(d.password) === obj.password
  );

  if (findData) {
    alert('Login Success ✓');
    let email = obj.email;
    sessionStorage.setItem('email', email);
    const timer = setTimeout(() => {
      navigate('/grievance');
    }, 300);
    return () => clearTimeout(timer);
  } else {
    alert('Invalid email or password!');
  }
};

//action to change password
export const changePassAction = (obj, navigate) => async (dispatch) => {
  const sessionEmail = sessionStorage.getItem('email');
  const { data } = await getDataFromJson('users');
  const user = data.find((d) => d.email === sessionEmail);

  if (obj.currentPass === decryptFunction(user.password)) {
    const query = await editDataInJson(`users/${user.id}`, {
      ...user,
      password: encryptFunction(obj.confirmPass),
    });
    alert('Password Changed Successfully ✓');
    navigate('/');
  } else {
    alert('Current Password is incorrect !');
  }
};

// action to fetch data by id
export const getDataByIdAction = (url) => async (dispatch) => {
  const { data } = await getDataFromJson(url);
  dispatch({
    type: 'GET_DATA_BY_ID',
    payload: data,
  });
};

// action to post edited data
export const postEditData = (url, data, navigate) => async (dispatch) => {
  const query = await editDataInJson(url, data);
  if (navigate) {
    navigate('/');
  }
  dispatch({
    type: 'GET_DATA_BY_ID',
    payload: null,
  });
  alert('Successfully Updated ✓');
  dispatch(getUsersDataAction('users'));
};

export const postEditGrievData = (url, data, navigate) => async (dispatch) => {
  const query = await editDataInJson(url, data);
  dispatch({
    type: 'GET_DATA_BY_ID',
    payload: null,
  });
  if (navigate) {
    navigate('/grievance');
  }
  alert('Successfully Updated ✓');
  dispatch(getUsersDataAction('grievance'));
};

//action to clear edit value after clicking back
export const cancelAction = () => (dispatch) => {
  dispatch({
    type: 'GET_DATA_BY_ID',
    payload: null,
  });
};
