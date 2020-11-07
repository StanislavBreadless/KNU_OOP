export interface PersonData {
  name: string;
  worth: number;
  age: number;
  source: string;
  industry: string;
}

function isString(x: any): x is string {
  return typeof x === 'string';
}

function isNumber(x: any): x is number {
  return typeof x === 'number';
}


export function isPersonData(variable: any): variable is PersonData {
  return !!variable 
    && isString(variable.name)
    && isNumber(variable.worth)
    && isNumber(variable.age)
    && isString(variable.source)
    && isString(variable.industry);
}

export const personDataObjectModel = {
  'name': 'string',
  'worth': 'number',
  'age': 'number',
  'source': 'string',
  'industry': 'string'
}
