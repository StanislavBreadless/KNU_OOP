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

  aggregateResult(aggregate: string, nextResult: string) {
    return (+aggregate + nextResult).toString();
  }

  // @ts-ignore 
  visitIdentifierExpr(ctx: IdentifierExprContext): string {
    return this.variableResolver(ctx.text);
  }

  // @ts-ignore
  visitExpression(ctx: ExpressionContext): string {
    return this.visitChildren(ctx);
  }

  // @ts-ignore
  visitNumberExpr(ctx: NumberExprContext): string {
    return ctx.text;
  }

  // @ts-ignore
  visitAdditiveExpr(ctx: AdditiveExprContext): string {
    this.visitChildren(ctx);

    const leftExpr = ctx.expression(0);
    const rightExpr = ctx.expression(1);

    const leftValue = +this.visit(leftExpr);
    const rightValue = +this.visit(rightExpr);

    const add = ctx.ADD();
    const sub = ctx.SUBTRACT();

    if(!isFinite(leftValue) || !isFinite(rightValue)) {
      return WRONG_FORMAT;
    } else if (add) {
      return (leftValue + rightValue).toString();
    } else if (sub) {
      return (leftValue - rightValue).toString();
    } else {
      return WRONG_FORMAT;
    }
  }

  // @ts-ignore 
  visitMultiplicativeExpr(ctx: MultiplicativeExprContext): string {
    this.visitChildren(ctx);

    const leftExpr = ctx.expression(0);
    const rightExpr = ctx.expression(1);

    const multiply = ctx.MULTIPLY();
    const divide = ctx.DIVIDE();
    const div = ctx.DIV();
    const mod = ctx.MOD();

    const leftValue = +this.visit(leftExpr);
    const rightValue = +this.visit(rightExpr);

    if(!isFinite(leftValue) || !isFinite(rightValue)) {
      return WRONG_FORMAT;
    }

    if (multiply) {
      return (leftValue * rightValue).toString();
    }
    if (divide) {
      return (leftValue / rightValue).toString();
    }
    if (div) {
      const val1 = +leftValue;
      const val2 = +rightValue;
      return Math.floor(val1 / val2).toString();
    }
    if (mod) {
      return (leftValue % rightValue).toString();
    }

    return WRONG_FORMAT;
  }
}