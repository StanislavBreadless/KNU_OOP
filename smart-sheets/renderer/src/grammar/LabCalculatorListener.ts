// Generated from src/grammar/g4/LabCalculator.g4 by ANTLR 4.7.3-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { ParenthesizedExprContext } from "./LabCalculatorParser";
import { ExponentialExprContext } from "./LabCalculatorParser";
import { MultiplicativeExprContext } from "./LabCalculatorParser";
import { AdditiveExprContext } from "./LabCalculatorParser";
import { AdditiveUnaryExprContext } from "./LabCalculatorParser";
import { NumberExprContext } from "./LabCalculatorParser";
import { IdentifierExprContext } from "./LabCalculatorParser";
import { CompileUnitContext } from "./LabCalculatorParser";
import { ExpressionContext } from "./LabCalculatorParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `LabCalculatorParser`.
 */
export interface LabCalculatorListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `ParenthesizedExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	enterParenthesizedExpr?: (ctx: ParenthesizedExprContext) => void;
	/**
	 * Exit a parse tree produced by the `ParenthesizedExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	exitParenthesizedExpr?: (ctx: ParenthesizedExprContext) => void;

	/**
	 * Enter a parse tree produced by the `ExponentialExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExponentialExpr?: (ctx: ExponentialExprContext) => void;
	/**
	 * Exit a parse tree produced by the `ExponentialExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExponentialExpr?: (ctx: ExponentialExprContext) => void;

	/**
	 * Enter a parse tree produced by the `MultiplicativeExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMultiplicativeExpr?: (ctx: MultiplicativeExprContext) => void;
	/**
	 * Exit a parse tree produced by the `MultiplicativeExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMultiplicativeExpr?: (ctx: MultiplicativeExprContext) => void;

	/**
	 * Enter a parse tree produced by the `AdditiveExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAdditiveExpr?: (ctx: AdditiveExprContext) => void;
	/**
	 * Exit a parse tree produced by the `AdditiveExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAdditiveExpr?: (ctx: AdditiveExprContext) => void;

	/**
	 * Enter a parse tree produced by the `AdditiveUnaryExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAdditiveUnaryExpr?: (ctx: AdditiveUnaryExprContext) => void;
	/**
	 * Exit a parse tree produced by the `AdditiveUnaryExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAdditiveUnaryExpr?: (ctx: AdditiveUnaryExprContext) => void;

	/**
	 * Enter a parse tree produced by the `NumberExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	enterNumberExpr?: (ctx: NumberExprContext) => void;
	/**
	 * Exit a parse tree produced by the `NumberExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	exitNumberExpr?: (ctx: NumberExprContext) => void;

	/**
	 * Enter a parse tree produced by the `IdentifierExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	enterIdentifierExpr?: (ctx: IdentifierExprContext) => void;
	/**
	 * Exit a parse tree produced by the `IdentifierExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	exitIdentifierExpr?: (ctx: IdentifierExprContext) => void;

	/**
	 * Enter a parse tree produced by `LabCalculatorParser.compileUnit`.
	 * @param ctx the parse tree
	 */
	enterCompileUnit?: (ctx: CompileUnitContext) => void;
	/**
	 * Exit a parse tree produced by `LabCalculatorParser.compileUnit`.
	 * @param ctx the parse tree
	 */
	exitCompileUnit?: (ctx: CompileUnitContext) => void;

	/**
	 * Enter a parse tree produced by `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;
}

