import { Token } from 'antlr4ts/Token';
import { Recognizer } from 'antlr4ts/Recognizer';
import { RecognitionException } from 'antlr4ts/RecognitionException';
import { ParserErrorListener } from 'antlr4ts/ParserErrorListener';

import { ANTLRErrorListener } from 'antlr4ts/ANTLRErrorListener';
 
import { WRONG_FORMAT } from './Constants';

export class ThrowingLexerErrorListener implements ANTLRErrorListener<number> {
  public static INSTANCE: ThrowingLexerErrorListener =  new ThrowingLexerErrorListener();

  public syntaxError<T extends number>(
		/*@NotNull*/
		recognizer: Recognizer<T, any>,
		offendingSymbol: T | undefined,
		line: number,
		charPositionInLine: number,
		/*@NotNull*/
		msg: string,
		e: RecognitionException | undefined) {
      throw new Error(WRONG_FORMAT);
    }
}

export class ThrowingParserErrorListener implements ParserErrorListener {
	public static INSTANCE: ThrowingParserErrorListener =  new ThrowingParserErrorListener();

	public syntaxError<T extends Token>(
    recognizer: Recognizer<T, any>, 
    offendingSymbol: T | undefined, 
    line: number, charPositionInLine: number, 
    msg: string, 
    e: RecognitionException | undefined) {
    throw new Error(WRONG_FORMAT);
	}

}
