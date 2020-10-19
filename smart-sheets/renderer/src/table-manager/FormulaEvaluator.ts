import { LabCalculatorLexer } from '../grammar/LabCalculatorLexer';
import { LabCalculatorParser } from '../grammar/LabCalculatorParser';
import { FormulaVisitor } from './FormulaVisitor';
import { CharStreams, CommonTokenStream } from 'antlr4ts';

import { BAD_VARIABLE } from './ErrorMessages';

import { ThrowingParserErrorListener, ThrowingLexerErrorListener } from './ErrorListener';

export class FormulaEvaluator {

  evaluate(formula: string, variableResolver: (variable: string) => string): string {
    try {
      const inputStream = CharStreams.fromString(formula);
      const lexer = new LabCalculatorLexer(inputStream);
      lexer.removeErrorListeners();
      lexer.addErrorListener(ThrowingLexerErrorListener.INSTANCE);
      const tokenStream = new CommonTokenStream(lexer);
      
      const parser = new LabCalculatorParser(tokenStream);
      parser.removeErrorListeners();
      parser.addErrorListener(ThrowingParserErrorListener.INSTANCE);
      const tree = parser.expression();
  
      const visitor = new FormulaVisitor((variable: string) => {
        const value = +variableResolver(variable);
        if (!isFinite(value)) {
          throw new Error(BAD_VARIABLE);
        }
  
        return value;
      });

      return visitor.visit(tree).toString();
    } catch(err) {
      return err.toString();
    }
  }

}