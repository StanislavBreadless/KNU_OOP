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
      <input value={value} onChange={e => setValue(e.target.value)}></input>
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

export class OptionsForm extends React.Component<IOptionsFormProps, IOptionsFormState> {

  constructor(props) {
    super(props);
    this.state = {
      filterOptions: {}
    };
  }

  render() {
    return (
      <div className='options-form'>
        <StringLabel
          textLabel={'Name:'}
          value={this.state.filterOptions.name}
          setValue={(name) => this.setState({ filterOptions: { name} })}
        ></StringLabel>
        <NumberLabel
          textLabel={'Minimum age:'}
          value={this.state.filterOptions.minAge}
          setValue={(minAge) => this.setState({ filterOptions: { minAge} })}
        ></NumberLabel>
        <NumberLabel
          textLabel={'Maximum age:'}
          value={this.state.filterOptions.minAge}
          setValue={(maxAge) => this.setState({ filterOptions: { maxAge} })}
        ></NumberLabel>
        <NumberLabel
          textLabel={'Minimum worth (is $ billions):'}
          value={this.state.filterOptions.minWorth}
          setValue={(minWorth) => this.setState({ filterOptions: { minWorth } })}
        ></NumberLabel>
        <NumberLabel
          textLabel={'Maximum worth (is $ billions):'}
          value={this.state.filterOptions.maxWorth}
          setValue={(maxWorth) => this.setState({ filterOptions: { maxWorth } })}
        ></NumberLabel>
        <StringLabel
          textLabel={'Source:'}
          value={this.state.filterOptions.source}
          setValue={(source) => this.setState({ filterOptions: { source } })}
        ></StringLabel>
        <StringLabel
          textLabel={'Country:'}
          value={this.state.filterOptions.country}
          setValue={(country) => this.setState({ filterOptions: { country } })}
        ></StringLabel>
        <StringLabel
          textLabel={'Industry:'}
          value={this.state.filterOptions.industry}
          setValue={(industry) => this.setState({ filterOptions: { industry } })}
        ></StringLabel>

        <div className='buttons-wrapper'>
          <button onClick={() => this.props.search(this.state.filterOptions)}>Search</button>
          <button onClick={() => this.props.clear()}>Clear</button>
          <button onClick={() => this.props.transform()}>Transform</button>
        </div>
      </div>
    )
  }
}