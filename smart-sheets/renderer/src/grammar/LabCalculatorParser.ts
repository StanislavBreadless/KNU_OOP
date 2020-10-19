// Generated from src/grammar/g4/LabCalculator.g4 by ANTLR 4.7.3-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { LabCalculatorListener } from "./LabCalculatorListener";
import { LabCalculatorVisitor } from "./LabCalculatorVisitor";


export class LabCalculatorParser extends Parser {
	public static readonly NUMBER = 1;
	public static readonly IDENTIFIER = 2;
	public static readonly INT = 3;
	public static readonly EXPONENT = 4;
	public static readonly MULTIPLY = 5;
	public static readonly DIVIDE = 6;
	public static readonly SUBTRACT = 7;
	public static readonly DIV = 8;
	public static readonly MOD = 9;
	public static readonly ADD = 10;
	public static readonly LPAREN = 11;
	public static readonly RPAREN = 12;
	public static readonly WS = 13;
	public static readonly RULE_compileUnit = 0;
	public static readonly RULE_expression = 1;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"compileUnit", "expression",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, "'^'", "'*'", "'/'", "'-'", 
		"'div'", "'mod'", "'+'", "'('", "')'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "NUMBER", "IDENTIFIER", "INT", "EXPONENT", "MULTIPLY", "DIVIDE", 
		"SUBTRACT", "DIV", "MOD", "ADD", "LPAREN", "RPAREN", "WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(LabCalculatorParser._LITERAL_NAMES, LabCalculatorParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return LabCalculatorParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "LabCalculator.g4"; }

	// @Override
	public get ruleNames(): string[] { return LabCalculatorParser.ruleNames; }

  // @Override
  // @ts-ignore
	public get serializedATN(): string { return LabCalculatorParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(LabCalculatorParser._ATN, this);
	}
	// @RuleVersion(0)
	public compileUnit(): CompileUnitContext {
		let _localctx: CompileUnitContext = new CompileUnitContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, LabCalculatorParser.RULE_compileUnit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 4;
			this.expression(0);
			this.state = 5;
			this.match(LabCalculatorParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 2;
		this.enterRecursionRule(_localctx, 2, LabCalculatorParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 16;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case LabCalculatorParser.LPAREN:
				{
				_localctx = new ParenthesizedExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 8;
				this.match(LabCalculatorParser.LPAREN);
				this.state = 9;
				this.expression(0);
				this.state = 10;
				this.match(LabCalculatorParser.RPAREN);
				}
				break;
			case LabCalculatorParser.SUBTRACT:
			case LabCalculatorParser.ADD:
				{
				_localctx = new AdditiveUnaryExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 12;
				(_localctx as AdditiveUnaryExprContext)._operatorToken = this._input.LT(1);
				_la = this._input.LA(1);
				if (!(_la === LabCalculatorParser.SUBTRACT || _la === LabCalculatorParser.ADD)) {
					(_localctx as AdditiveUnaryExprContext)._operatorToken = this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 13;
				this.expression(3);
				}
				break;
			case LabCalculatorParser.NUMBER:
				{
				_localctx = new NumberExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 14;
				this.match(LabCalculatorParser.NUMBER);
				}
				break;
			case LabCalculatorParser.IDENTIFIER:
				{
				_localctx = new IdentifierExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 15;
				this.match(LabCalculatorParser.IDENTIFIER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 29;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 27;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
					case 1:
						{
						_localctx = new ExponentialExprContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, LabCalculatorParser.RULE_expression);
						this.state = 18;
						if (!(this.precpred(this._ctx, 6))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 6)");
						}
						this.state = 19;
						this.match(LabCalculatorParser.EXPONENT);
						this.state = 20;
						this.expression(7);
						}
						break;

					case 2:
						{
						_localctx = new MultiplicativeExprContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, LabCalculatorParser.RULE_expression);
						this.state = 21;
						if (!(this.precpred(this._ctx, 5))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 5)");
						}
						this.state = 22;
						(_localctx as MultiplicativeExprContext)._operatorToken = this._input.LT(1);
						_la = this._input.LA(1);
						if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << LabCalculatorParser.MULTIPLY) | (1 << LabCalculatorParser.DIVIDE) | (1 << LabCalculatorParser.DIV) | (1 << LabCalculatorParser.MOD))) !== 0))) {
							(_localctx as MultiplicativeExprContext)._operatorToken = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 23;
						this.expression(6);
						}
						break;

					case 3:
						{
						_localctx = new AdditiveExprContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, LabCalculatorParser.RULE_expression);
						this.state = 24;
						if (!(this.precpred(this._ctx, 4))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 4)");
						}
						this.state = 25;
						(_localctx as AdditiveExprContext)._operatorToken = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === LabCalculatorParser.SUBTRACT || _la === LabCalculatorParser.ADD)) {
							(_localctx as AdditiveExprContext)._operatorToken = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 26;
						this.expression(5);
						}
						break;
					}
					}
				}
				this.state = 31;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 1:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 6);

		case 1:
			return this.precpred(this._ctx, 5);

		case 2:
			return this.precpred(this._ctx, 4);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x0F#\x04\x02" +
		"\t\x02\x04\x03\t\x03\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03\x13\n\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03" +
		"\x1E\n\x03\f\x03\x0E\x03!\v\x03\x03\x03\x02\x02\x03\x04\x04\x02\x02\x04" +
		"\x02\x02\x04\x04\x02\t\t\f\f\x04\x02\x07\b\n\v\x02&\x02\x06\x03\x02\x02" +
		"\x02\x04\x12\x03\x02\x02\x02\x06\x07\x05\x04\x03\x02\x07\b\x07\x02\x02" +
		"\x03\b\x03\x03\x02\x02\x02\t\n\b\x03\x01\x02\n\v\x07\r\x02\x02\v\f\x05" +
		"\x04\x03\x02\f\r\x07\x0E\x02\x02\r\x13\x03\x02\x02\x02\x0E\x0F\t\x02\x02" +
		"\x02\x0F\x13\x05\x04\x03\x05\x10\x13\x07\x03\x02\x02\x11\x13\x07\x04\x02" +
		"\x02\x12\t\x03\x02\x02\x02\x12\x0E\x03\x02\x02\x02\x12\x10\x03\x02\x02" +
		"\x02\x12\x11\x03\x02\x02\x02\x13\x1F\x03\x02\x02\x02\x14\x15\f\b\x02\x02" +
		"\x15\x16\x07\x06\x02\x02\x16\x1E\x05\x04\x03\t\x17\x18\f\x07\x02\x02\x18" +
		"\x19\t\x03\x02\x02\x19\x1E\x05\x04\x03\b\x1A\x1B\f\x06\x02\x02\x1B\x1C" +
		"\t\x02\x02\x02\x1C\x1E\x05\x04\x03\x07\x1D\x14\x03\x02\x02\x02\x1D\x17" +
		"\x03\x02\x02\x02\x1D\x1A\x03\x02\x02\x02\x1E!\x03\x02\x02\x02\x1F\x1D" +
		"\x03\x02\x02\x02\x1F \x03\x02\x02\x02 \x05\x03\x02\x02\x02!\x1F\x03\x02" +
		"\x02\x02\x05\x12\x1D\x1F";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!LabCalculatorParser.__ATN) {
			LabCalculatorParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(LabCalculatorParser._serializedATN));
		}

		return LabCalculatorParser.__ATN;
	}

}

export class CompileUnitContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public EOF(): TerminalNode { return this.getToken(LabCalculatorParser.EOF, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
  // @Override
  // @ts-ignore
	public get ruleIndex(): number { return LabCalculatorParser.RULE_compileUnit; }
	// @Override
	public enterRule(listener: LabCalculatorListener): void {
		if (listener.enterCompileUnit) {
			listener.enterCompileUnit(this);
		}
	}
	// @Override
	public exitRule(listener: LabCalculatorListener): void {
		if (listener.exitCompileUnit) {
			listener.exitCompileUnit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LabCalculatorVisitor<Result>): Result {
		if (visitor.visitCompileUnit) {
			return visitor.visitCompileUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
  // @ts-ignore
	public get ruleIndex(): number { return LabCalculatorParser.RULE_expression; }
	public copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class ParenthesizedExprContext extends ExpressionContext {
	public LPAREN(): TerminalNode { return this.getToken(LabCalculatorParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(LabCalculatorParser.RPAREN, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: LabCalculatorListener): void {
		if (listener.enterParenthesizedExpr) {
			listener.enterParenthesizedExpr(this);
		}
	}
	// @Override
	public exitRule(listener: LabCalculatorListener): void {
		if (listener.exitParenthesizedExpr) {
			listener.exitParenthesizedExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LabCalculatorVisitor<Result>): Result {
		if (visitor.visitParenthesizedExpr) {
			return visitor.visitParenthesizedExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExponentialExprContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public EXPONENT(): TerminalNode { return this.getToken(LabCalculatorParser.EXPONENT, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: LabCalculatorListener): void {
		if (listener.enterExponentialExpr) {
			listener.enterExponentialExpr(this);
		}
	}
	// @Override
	public exitRule(listener: LabCalculatorListener): void {
		if (listener.exitExponentialExpr) {
			listener.exitExponentialExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LabCalculatorVisitor<Result>): Result {
		if (visitor.visitExponentialExpr) {
			return visitor.visitExponentialExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
// @ts-ignore
export class MultiplicativeExprContext extends ExpressionContext {
  // @ts-ignore
	public _operatorToken: Token;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public MULTIPLY(): TerminalNode | undefined { return this.tryGetToken(LabCalculatorParser.MULTIPLY, 0); }
	public DIVIDE(): TerminalNode | undefined { return this.tryGetToken(LabCalculatorParser.DIVIDE, 0); }
	public MOD(): TerminalNode | undefined { return this.tryGetToken(LabCalculatorParser.MOD, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(LabCalculatorParser.DIV, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: LabCalculatorListener): void {
		if (listener.enterMultiplicativeExpr) {
			listener.enterMultiplicativeExpr(this);
		}
	}
	// @Override
	public exitRule(listener: LabCalculatorListener): void {
		if (listener.exitMultiplicativeExpr) {
			listener.exitMultiplicativeExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LabCalculatorVisitor<Result>): Result {
		if (visitor.visitMultiplicativeExpr) {
			return visitor.visitMultiplicativeExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
// @ts-ignore
export class AdditiveExprContext extends ExpressionContext {
  // @ts-ignore
	public _operatorToken: Token;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public ADD(): TerminalNode | undefined { return this.tryGetToken(LabCalculatorParser.ADD, 0); }
	public SUBTRACT(): TerminalNode | undefined { return this.tryGetToken(LabCalculatorParser.SUBTRACT, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: LabCalculatorListener): void {
		if (listener.enterAdditiveExpr) {
			listener.enterAdditiveExpr(this);
		}
	}
	// @Override
	public exitRule(listener: LabCalculatorListener): void {
		if (listener.exitAdditiveExpr) {
			listener.exitAdditiveExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LabCalculatorVisitor<Result>): Result {
		if (visitor.visitAdditiveExpr) {
			return visitor.visitAdditiveExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AdditiveUnaryExprContext extends ExpressionContext {
  // @ts-ignore
	public _operatorToken: Token;
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public ADD(): TerminalNode | undefined { return this.tryGetToken(LabCalculatorParser.ADD, 0); }
	public SUBTRACT(): TerminalNode | undefined { return this.tryGetToken(LabCalculatorParser.SUBTRACT, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: LabCalculatorListener): void {
		if (listener.enterAdditiveUnaryExpr) {
			listener.enterAdditiveUnaryExpr(this);
		}
	}
	// @Override
	public exitRule(listener: LabCalculatorListener): void {
		if (listener.exitAdditiveUnaryExpr) {
			listener.exitAdditiveUnaryExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LabCalculatorVisitor<Result>): Result {
		if (visitor.visitAdditiveUnaryExpr) {
			return visitor.visitAdditiveUnaryExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberExprContext extends ExpressionContext {
	public NUMBER(): TerminalNode { return this.getToken(LabCalculatorParser.NUMBER, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: LabCalculatorListener): void {
		if (listener.enterNumberExpr) {
			listener.enterNumberExpr(this);
		}
	}
	// @Override
	public exitRule(listener: LabCalculatorListener): void {
		if (listener.exitNumberExpr) {
			listener.exitNumberExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LabCalculatorVisitor<Result>): Result {
		if (visitor.visitNumberExpr) {
			return visitor.visitNumberExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IdentifierExprContext extends ExpressionContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(LabCalculatorParser.IDENTIFIER, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: LabCalculatorListener): void {
		if (listener.enterIdentifierExpr) {
			listener.enterIdentifierExpr(this);
		}
	}
	// @Override
	public exitRule(listener: LabCalculatorListener): void {
		if (listener.exitIdentifierExpr) {
			listener.exitIdentifierExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LabCalculatorVisitor<Result>): Result {
		if (visitor.visitIdentifierExpr) {
			return visitor.visitIdentifierExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


