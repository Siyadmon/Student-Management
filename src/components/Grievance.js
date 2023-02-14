import React, { useEffect } from 'react';
import { NavLink } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGrievanceAction } from '../action';
import DataTable from 'react-data-table-component';

const Grievance = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGrievanceAction('grievance'));
  }, []);

  const { grivData } = useSelector((state) => state.studentReducer);

  const onEdit = (id) => {
    navigate(`/add-grievance/${id}`);
  };

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
    },
    {
      name: 'Title',
      selector: (row) => row.title,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
    },
    {
      name: 'Attachment',
      selector: (row) => (
        <a href={row.file} download>
          Download
        </a>
      ),
    },
    {
      name: 'Action',
      selector: (row) => (
        <button className="btn btn-warning" onClick={() => onEdit(row.id)}>
          Edit
        </button>
      ),
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
        backgroundColor: '#d2f1f7',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
        fontSize: '17px',
        backgroundColor: '#e6fff1',
      },
    },
  };

  return (
    <div>
      <div className="container mt-2 main2">
        <div
          className="list-btns"
          onClick={() => {
            navigate('/add-grievance');
          }}
        >
          <NavLink className="btn btn-info mt-3">Add Grievance</NavLink>
          &nbsp;&nbsp;&nbsp;
        </div>

        <DataTable
          columns={columns}
          customStyles={customStyles}
          data={grivData}
          pagination
          title="Grievances"
        />
      </div>
    </div>
  );
};

export default Grievance;
