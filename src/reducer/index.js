import { combineReducers } from 'redux';

const initialState = {
  userData: [],
  grivData: [],
  editData: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_DATA':
      return {
        ...state,
        userData: action.payload,
      };
    case 'GET_DATA_BY_ID':
      return {
        ...state,
        editData: action.payload,
      };
    case 'GET_GRIEVANCE_DATA':
      return {
        ...state,
        grivData: action.payload,
      };
  }
  return state;
};

export default combineReducers({ studentReducer });
