// @ts-ignore

import { 
  LabCalculatorVisitor,
} from '../grammar/LabCalculatorVisitor';
import { ParenthesizedExprContext } from "../grammar/LabCalculatorParser";
import { ExponentialExprContext } from "../grammar/LabCalculatorParser";
import { MultiplicativeExprContext } from "../grammar/LabCalculatorParser";
import { AdditiveExprContext } from "../grammar/LabCalculatorParser";
import { NumberExprContext } from "../grammar/LabCalculatorParser";
import { IdentifierExprContext } from "../grammar/LabCalculatorParser";
import { CompileUnitContext } from "../grammar/LabCalculatorParser";
import { ExpressionContext } from "../grammar/LabCalculatorParser";
import { ParseTree } from 'antlr4ts/tree';

const WRONG_FORMAT = 'Wrong format error';

export class FormulaVisitor extends LabCalculatorVisitor<string> {
  public defaultResult() {
    return '';
  }

  constructor(private variableResolver: (variable: string) => string) {
    super();
  }

  // @ts-ignore 
  visitIdentifierExpr(ctx: IdentifierExprContext): string {
    return this.variableResolver(ctx.toString());
  }

  // @ts-ignore
  visitNumberExpr(ctx: NumberExprContext): string {
    return ctx.toString();
  }

  // @ts-ignore
  visitAdditiveExpr(ctx: AdditiveExprContext): string {
    const leftExpr = ctx.expression(0);
    const rightExpr = ctx.expression(1);

    const leftValue = +this.visit(leftExpr);
    const rightValue = +this.visit(rightExpr);

    if(!isFinite(leftValue) || !isFinite(rightValue)) {
      return WRONG_FORMAT;
    } else {
      return (leftValue + rightValue).toString();
    }
  }

  // @ts-ignore 
  visitMultiplicativeExpr(ctx: MultiplicativeExprContext): string {
    const leftExpr = ctx.expression(0);
    const rightExpr = ctx.expression(1);

    const leftValue = +this.visit(leftExpr);
    const rightValue = +this.visit(rightExpr);

    if(!isFinite(leftValue) || !isFinite(rightValue)) {
      return WRONG_FORMAT;
    } else {
      return (leftValue * rightValue).toString();
    }
  }
}