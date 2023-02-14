import React, { useEffect } from 'react';
import { NavLink } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { getGrievanceAction } from '../action';

const Discussions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGrievanceAction('discussions'));
  }, []);

  const { grivData } = useSelector((state) => state.studentReducer);

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
    },
    {
      name: 'Subject',
      selector: (row) => row.subject,
    },
    {
      name: 'Faculty',
      selector: (row) => row.faculty,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: '72px',
      },
    },
    table: {
      style: {
        border: '0.51px rigde',
        padding: '5px',
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
        fontSize: '20px',
        backgroundColor: '#d4ffcf',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
        fontSize: '17px',
        backgroundColor: '#e6ffe3',
      },
    },
  };
  return (
    <div>
      <div>
        <div className="container mt-2 main2">
          <div
            className="list-btns"
            onClick={() => {
              navigate('/add-discussions');
            }}
          >
            <NavLink className="btn btn-success mt-3">Add Discussions</NavLink>
            &nbsp;&nbsp;&nbsp;
          </div>

          <DataTable
            columns={columns}
            customStyles={customStyles}
            data={grivData}
            pagination
            title="Discussions"
          />
        </div>
      </div>
    </div>
  );
};

export default Discussions;
