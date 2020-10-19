// @ts-ignore

import { 
  LabCalculatorVisitor,
} from '../grammar/LabCalculatorVisitor';
import { AdditiveUnaryExprContext, ExponentialExprContext, ParenthesizedExprContext } from "../grammar/LabCalculatorParser";
import { MultiplicativeExprContext } from "../grammar/LabCalculatorParser";
import { AdditiveExprContext } from "../grammar/LabCalculatorParser";
import { NumberExprContext } from "../grammar/LabCalculatorParser";
import { IdentifierExprContext } from "../grammar/LabCalculatorParser";
import { ExpressionContext } from "../grammar/LabCalculatorParser";

import { WRONG_FORMAT } from './Constants';

export class FormulaVisitor extends LabCalculatorVisitor<number> {
  public defaultResult() {
    return 0;
  }

  constructor(private variableResolver: (variable: string) => number) {
    super();
  }

  aggregateResult(aggregate: number, nextResult: number) {
    return aggregate + nextResult;
  }

  visitIdentifierExpr = (ctx: IdentifierExprContext): number => {
    return this.variableResolver(ctx.text);
  }

  visitExpression = (ctx: ExpressionContext): number => {
    return this.visitChildren(ctx);
  }

  visitNumberExpr = (ctx: NumberExprContext): number => {
    const result = +ctx.text;

    if(!isFinite(result)) {
      throw new Error(WRONG_FORMAT);
    }

    return result;
  }

  visitAdditiveExpr = (ctx: AdditiveExprContext): number => {
    this.visitChildren(ctx);

    const leftExpr = ctx.expression(0);
    const rightExpr = ctx.expression(1);

    const leftValue = +this.visit(leftExpr);
    const rightValue = +this.visit(rightExpr);

    const add = ctx.ADD();
    const sub = ctx.SUBTRACT();

    if(!isFinite(leftValue) || !isFinite(rightValue)) {
      throw new Error(WRONG_FORMAT);
    } else if (add) {
      return leftValue + rightValue;
    } else if (sub) {
      return leftValue - rightValue;
    } else {
      throw new Error(WRONG_FORMAT);
    }
  }

  visitExponentialExpr = (ctx: ExponentialExprContext): number => {
    this.visitChildren(ctx);

    const leftExpr = ctx.expression(0);
    const rightExpr = ctx.expression(1);

    const leftValue = +this.visit(leftExpr);
    const rightValue = +this.visit(rightExpr);

    if(!isFinite(leftValue) || !isFinite(rightValue)) {
      throw new Error(WRONG_FORMAT);
    } else {
      return Math.pow(leftValue, rightValue);
    }
  }

  visitMultiplicativeExpr = (ctx: MultiplicativeExprContext): number => {
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
      throw new Error(WRONG_FORMAT);
    }

    if (multiply) {
      return leftValue * rightValue;
    }
    if (divide) {
      return leftValue / rightValue;
    }
    if (div) {
      return Math.floor(leftValue / rightValue);
    }
    if (mod) {
      return leftValue % rightValue;
    }

    throw new Error(WRONG_FORMAT);
  }

  visitAdditiveUnaryExpr = (ctx: AdditiveUnaryExprContext): number => {
    this.visitChildren(ctx);

    const add = ctx.ADD();
    const expr = ctx.expression();
    const value = this.visit(expr);

    if(!isFinite(value)) {
      throw new Error(WRONG_FORMAT);
    }

    if(add) {
      return +value;
    } else {
      return -value;
    }
  }



  visitParenthesizedExpr = (ext: ParenthesizedExprContext): number => {
    return this.visitChildren(ext);
  }
}