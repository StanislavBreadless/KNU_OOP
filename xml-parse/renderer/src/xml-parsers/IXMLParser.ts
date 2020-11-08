import { PersonData } from '../types';

export interface IXMLParser {
  parseString(str: string): PersonData[];
}