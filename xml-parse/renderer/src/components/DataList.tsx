import { ENXIO } from 'constants';
import React from 'react';
import { PersonData } from '../types'; 

import './style.css';

interface IDataListProps {
  data: PersonData[]
};

const DataTableHead = () => {
  return (
    <thead>
      <th>Name</th>
      <th>Net Worth</th>
      <th>Age</th>
      <th>Country</th>
      <th>Source</th>
      <th>Industry</th>
    </thead>
  )
}

const tableRow = (personData: PersonData) => {
  return (
    <tr>
      <td>{personData.name}</td>
      <td>{personData.worth}</td>
      <td>{personData.worth}</td>
      <td>{personData.country}</td>
      <td>{personData.source}</td>
      <td>{personData.industry}</td>
    </tr>
  )
}

const DataTableBody = (props: {data: PersonData[]}) => {
  const {data} = props;
  const rows = data.map(tableRow);
  return (
    <tbody>
      {rows}
    </tbody>
  )
}

export class DataList extends React.Component<IDataListProps> {

  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div className='data-list'>
        <table className='data-table'>
          <DataTableHead />
          <DataTableBody data={this.props.data}/>
        </table>
      </div>
    )
  }
}