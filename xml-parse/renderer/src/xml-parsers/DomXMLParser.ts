import { IXMLParser as IXMLParser } from './IXMLParser';
import { PersonData } from '../types';
import { INVALID_DATA } from '../constants/constants';

export class DomXMLParser implements IXMLParser {

  private parser: DOMParser;

  constructor() {
    this.parser = new DOMParser();
  } 

  private parseStringRecord(node: Element, record: string): string {
    const itemNode = node.querySelector(record);

    if(!itemNode) {
      throw new Error(INVALID_DATA);
    }

    return itemNode.innerHTML;
  }

  private parseNumberRecord(node: Element, record: string): number {
    const str = this.parseStringRecord(node, record);

    const num = parseInt(str);
    
    if(!isFinite(num)) {
      throw new Error(INVALID_DATA);
    }

    return num;
  }

  private parseItem(domNode: Element): PersonData {
    const name = this.parseStringRecord(domNode, 'name');
    const worth = this.parseNumberRecord(domNode, 'worth');
    const age = this.parseNumberRecord(domNode, 'age');
    const source = this.parseStringRecord(domNode, 'source');
    const industry = this.parseStringRecord(domNode, 'industry');
    const country = this.parseStringRecord(domNode, 'country');

    return {
      name,
      worth,
      age,
      source,
      industry,
      country
    };
  }

  parseString(str: string): PersonData[] {
    const xmlDoc = this.parser.parseFromString(str, "text/xml");
    const items = Array.from(xmlDoc.querySelectorAll('item'));

    return items.map(this.parseItem);
  } 
}