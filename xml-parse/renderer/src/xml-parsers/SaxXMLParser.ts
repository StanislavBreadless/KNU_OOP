import { IXMLParser } from './IXMLParser';
import { PersonData, isPersonData } from '../types';
/* @ts-ignore */
import * as xml from 'sax-parser';
import { parse } from 'path';
import { INVALID_DATA, XML_ITEM_TAG_NAME } from '../constants/constants';
import { TouchBarScrubber } from 'electron';



export class SaxXMLParser implements IXMLParser {
  private parser: any;
  private currentItem: any;
  private currentTagChars: string|null = null;
  private parsingResult: PersonData[];

  private tagsStack: string[];

  private getCurrentTag() {
    if(!this.tagsStack.length) {
      return null;
    }

    return this.tagsStack[this.tagsStack.length - 1];
  }

  private onStartElement(elem, attrs, prefix, uri, namespaces) {
    this.currentTagChars = '';

    if(elem === XML_ITEM_TAG_NAME) {
      this.currentItem = {};
    }

    this.tagsStack.push(elem);
  }

  private onEndElement(elem, attrs, prefix, uri, namespaces) {
    if(elem === XML_ITEM_TAG_NAME) {
      if(this.currentItem) {
        if(!isPersonData(this.currentItem)) {
          throw new Error(INVALID_DATA);
        }

        this.parsingResult.push(this.currentItem);
        this.currentItem = null;
      }
    }

    this.tagsStack.pop();
  }


  private onChars(chars) {
    const currentTag = this.getCurrentTag();
    if(
        currentTag 
        && currentTag !== XML_ITEM_TAG_NAME 
        && this.currentItem
        && !!chars
    ) {
      if(!this.currentItem[currentTag]) {
        this.currentItem[currentTag] = chars;
      } else {
        this.currentItem[currentTag] += chars;
      }
    } 
  }

  private onWarning(msg) {
    console.log("<WARNING>" + msg + "</WARNING>");
  }

  private onComment(msg) {
    console.log("<WARNING>" + msg + "</WARNING>");
  }

  private onError(msg) {
    throw new Error(msg);
  }

  // initParser() {

  // }

  // bindHandlers() {
  //   this.onStartElement = this.onStartElement.bind(this);
  //   this.onEndElement = this.onEndElement.bind(this);
  //   this.onChars = this.onChars.bind(this);
  //   this.onError = this.onError.bind(this);
  //   this.onWarning = this.onWarning.bind(this);
  // }

  constructor() {
    this.parser = new xml.SaxParser((cb) => {
      cb.onStartDocument(() => {});
      cb.onEndDocument(() => {});
      cb.onStartElementNS(this.onStartElement.bind(this));
      cb.onEndElementNS(this.onEndElement.bind(this));
      cb.onCharacters(this.onChars.bind(this));
      cb.onComment(this.onComment.bind(this));
      cb.onWarning(this.onWarning.bind(this));
      cb.onError(this.onError.bind(this));
    });

    
    this.parsingResult = [];
    this.tagsStack = [];
  }

  private initParsing() {
    this.parser = new xml.SaxParser((cb) => {
      cb.onStartDocument(() => {});
      cb.onEndDocument(() => {});
      cb.onStartElementNS(this.onStartElement.bind(this));
      cb.onEndElementNS(this.onEndElement.bind(this));
      cb.onCharacters(this.onChars.bind(this));
      cb.onComment(this.onComment.bind(this));
      cb.onWarning(this.onWarning.bind(this));
      cb.onError(this.onError.bind(this));
    });

    this.parsingResult = [];
    this.tagsStack = [];
    this.currentItem = null;
    this.currentTagChars = null;
  }

  parseString(str: string): PersonData[] {
    this.initParsing();

    this.parser.parseString(str);

    return this.parsingResult;
  } 
}



