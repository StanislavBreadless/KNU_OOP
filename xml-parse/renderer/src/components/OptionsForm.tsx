import React, { useState } from 'react';
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

function StringLabel(props: {
  textLabel: string,
  value: string|undefined,
  setValue: (string) => any
}) {
  const {textLabel, value, setValue} = props;

  return (
    <label className={`dynamic-label ${!!value ? "active" : ""}`}>
      {textLabel}
      <input value={value ? value: ''} onChange={e => setValue(e.target.value)}></input>
    </label>
  )
}

function NumberLabel(props: {
  textLabel: string,
  value: number | undefined,
  setValue: ((_: number|undefined) => any)
}) {

  const {textLabel, value, setValue} = props;

  const updateValue = (val: string) => {
    const newVal = val.trim();
    if(newVal === '') {
      setValue(undefined);
      return;
    }

    const numVal = +newVal;

    if(!isFinite(numVal)) {
      setValue(undefined);
      return;
    } else {
      setValue(numVal); 
    }
  }

  return <StringLabel
    textLabel={textLabel}
    value={value !== undefined ? value.toString() : value}
    setValue={updateValue}
  />
}

export class OptionsForm extends React.Component<IOptionsFormProps, DataSearchFilters> {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='options-form'>
        <StringLabel
          textLabel={'Name:'}
          value={this.state.name}
          setValue={(name) => this.setState({  name  })}
        ></StringLabel>
        <NumberLabel
          textLabel={'Minimum age:'}
          value={this.state.minAge}
          setValue={(minAge) => this.setState({ minAge })}
        ></NumberLabel>
        <NumberLabel
          textLabel={'Maximum age:'}
          value={this.state.maxAge}
          setValue={(maxAge) => this.setState({ maxAge })}
        ></NumberLabel>
        <NumberLabel
          textLabel={'Minimum worth (is $ billions):'}
          value={this.state.minWorth}
          setValue={(minWorth) => this.setState({ minWorth })}
        ></NumberLabel>
        <NumberLabel
          textLabel={'Maximum worth (is $ billions):'}
          value={this.state.maxWorth}
          setValue={(maxWorth) => this.setState({  maxWorth })}
        ></NumberLabel>
        <StringLabel
          textLabel={'Source:'}
          value={this.state.source}
          setValue={(source) => this.setState({  source })}
        ></StringLabel>
        <StringLabel
          textLabel={'Country:'}
          value={this.state.country}
          setValue={(country) => this.setState({  country  })}
        ></StringLabel>
        <StringLabel
          textLabel={'Industry:'}
          value={this.state.industry}
          setValue={(industry) => this.setState({  industry })}
        ></StringLabel>

        <div className='buttons-wrapper'>
          <button onClick={() => this.props.search(this.state)}>Search</button>
          <button onClick={() => {
            Object.keys(this.state).forEach(key => this.setState({
              [key]: undefined
            }));
          }}>Clear</button>
          <button onClick={() => this.props.transform()}>Transform</button>
        </div>
      </div>
    )
  }
}