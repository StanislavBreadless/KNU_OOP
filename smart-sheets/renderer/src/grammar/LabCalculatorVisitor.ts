// Generated from src/grammar/g4/LabCalculator.g4 by ANTLR 4.7.3-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { ParenthesizedExprContext } from "./LabCalculatorParser";
import { ExponentialExprContext } from "./LabCalculatorParser";
import { MultiplicativeExprContext } from "./LabCalculatorParser";
import { AdditiveExprContext } from "./LabCalculatorParser";
import { AdditiveUnaryExprContext } from "./LabCalculatorParser";
import { NumberExprContext } from "./LabCalculatorParser";
import { IdentifierExprContext } from "./LabCalculatorParser";
import { CompileUnitContext } from "./LabCalculatorParser";
import { ExpressionContext } from "./LabCalculatorParser";

import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `LabCalculatorParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export abstract class LabCalculatorVisitor<Result> extends AbstractParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `ParenthesizedExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenthesizedExpr?: (ctx: ParenthesizedExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `ExponentialExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExponentialExpr?: (ctx: ExponentialExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `MultiplicativeExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplicativeExpr?: (ctx: MultiplicativeExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `AdditiveExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdditiveExpr?: (ctx: AdditiveExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `AdditiveUnaryExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdditiveUnaryExpr?: (ctx: AdditiveUnaryExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumberExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberExpr?: (ctx: NumberExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `IdentifierExpr`
	 * labeled alternative in `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifierExpr?: (ctx: IdentifierExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LabCalculatorParser.compileUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompileUnit?: (ctx: CompileUnitContext) => Result;

	/**
	 * Visit a parse tree produced by `LabCalculatorParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;
}

