import { resolve } from 'dns';
import { LabCalculatorLexer } from '../grammar/LabCalculatorLexer';
import { LabCalculatorParser } from '../grammar/LabCalculatorParser';
import { FormulaVisitor } from './FormulaVisitor';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { parse } from 'path';

export class FormulaEvaluator {

  evaluate(formula: string, variableResolver: (variable: string) => string) {
    const inputStream = CharStreams.fromString(formula);
    const lexer = new LabCalculatorLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new LabCalculatorParser(tokenStream);
    const tree = parser.expression();

    const visitor = new FormulaVisitor(variableResolver);
    return visitor.visit(tree);
  }

}