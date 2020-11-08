import { PersonData, DataSearchFilters as DataSearchFilters } from '../types';
import { IXMLParser } from '../xml-parsers/IXMLParser';
import { ItemFilter } from './itemFilter';


export class DataService {

  constructor(private parser: IXMLParser) {}

  public setParser(newParser: IXMLParser) {
    this.parser = newParser;
  }

  public getData(strData: string, filters: DataSearchFilters): PersonData[] {
    const itemFilter = ItemFilter.fromFiltersObject(filters);


    const data = this.parser.parseString(strData);

    return data.filter(item => itemFilter.filter(item));
  }
}