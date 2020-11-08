import React from 'react';
import { DataService } from '../data-service/dataService';
import { PersonData, ParserType, DataSearchFilters } from '../types'; 

import './style.css';

interface IOptionsFormProps {
  setParser: (type: ParserType) => void;
  search: (searchParams: DataSearchFilters) => void;
  transform: () => void;
  clear: () => void;
}

interface IOptionsFormState {
  filterOptions: DataSearchFilters
}

export class OptionsForm extends React.Component<IOptionsFormProps, IOptionsFormState> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='options-form'>
        <div className='buttons-wrapper'>
          <button onClick={() => this.props.search(this.state.filterOptions)}>Search</button>
          <button onClick={() => this.props.clear()}>Clear</button>
          <button onClick={() => this.props.transform()}>Transform</button>
        </div>
      </div>
    )
  }
}