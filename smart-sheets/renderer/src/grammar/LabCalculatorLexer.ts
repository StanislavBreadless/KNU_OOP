// Generated from src/grammar/g4/LabCalculator.g4 by ANTLR 4.7.3-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class LabCalculatorLexer extends Lexer {
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

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"NUMBER", "IDENTIFIER", "INT", "EXPONENT", "MULTIPLY", "DIVIDE", "SUBTRACT", 
		"DIV", "MOD", "ADD", "LPAREN", "RPAREN", "WS",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, "'^'", "'*'", "'/'", "'-'", 
		"'div'", "'mod'", "'+'", "'('", "')'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "NUMBER", "IDENTIFIER", "INT", "EXPONENT", "MULTIPLY", "DIVIDE", 
		"SUBTRACT", "DIV", "MOD", "ADD", "LPAREN", "RPAREN", "WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(LabCalculatorLexer._LITERAL_NAMES, LabCalculatorLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return LabCalculatorLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(LabCalculatorLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "LabCalculator.g4"; }

	// @Override
	public get ruleNames(): string[] { return LabCalculatorLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return LabCalculatorLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return LabCalculatorLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return LabCalculatorLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x0FL\b\x01\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
		"\x04\x0E\t\x0E\x03\x02\x03\x02\x03\x02\x05\x02!\n\x02\x03\x03\x06\x03" +
		"$\n\x03\r\x03\x0E\x03%\x03\x03\x03\x03\x06\x03*\n\x03\r\x03\x0E\x03+\x03" +
		"\x04\x06\x04/\n\x04\r\x04\x0E\x040\x03\x05\x03\x05\x03\x06\x03\x06\x03" +
		"\x07\x03\x07\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03" +
		"\n\x03\v\x03\v\x03\f\x03\f\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E" +
		"\x02\x02\x02\x0F\x03\x02\x03\x05\x02\x04\x07\x02\x05\t\x02\x06\v\x02\x07" +
		"\r\x02\b\x0F\x02\t\x11\x02\n\x13\x02\v\x15\x02\f\x17\x02\r\x19\x02\x0E" +
		"\x1B\x02\x0F\x03\x02\x06\x04\x02C\\c|\x03\x023;\x03\x022;\x05\x02\v\f" +
		"\x0F\x0F\"\"\x02O\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02" +
		"\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02\r" +
		"\x03\x02\x02\x02\x02\x0F\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13" +
		"\x03\x02\x02\x02\x02\x15\x03\x02\x02\x02\x02\x17\x03\x02\x02\x02\x02\x19" +
		"\x03\x02\x02\x02\x02\x1B\x03\x02\x02\x02\x03\x1D\x03\x02\x02\x02\x05#" +
		"\x03\x02\x02\x02\x07.\x03\x02\x02\x02\t2\x03\x02\x02\x02\v4\x03\x02\x02" +
		"\x02\r6\x03\x02\x02\x02\x0F8\x03\x02\x02\x02\x11:\x03\x02\x02\x02\x13" +
		">\x03\x02\x02\x02\x15B\x03\x02\x02\x02\x17D\x03\x02\x02\x02\x19F\x03\x02" +
		"\x02\x02\x1BH\x03\x02\x02\x02\x1D \x05\x07\x04\x02\x1E\x1F\x070\x02\x02" +
		"\x1F!\x05\x07\x04\x02 \x1E\x03\x02\x02\x02 !\x03\x02\x02\x02!\x04\x03" +
		"\x02\x02\x02\"$\t\x02\x02\x02#\"\x03\x02\x02\x02$%\x03\x02\x02\x02%#\x03" +
		"\x02\x02\x02%&\x03\x02\x02\x02&\'\x03\x02\x02\x02\')\t\x03\x02\x02(*\t" +
		"\x04\x02\x02)(\x03\x02\x02\x02*+\x03\x02\x02\x02+)\x03\x02\x02\x02+,\x03" +
		"\x02\x02\x02,\x06\x03\x02\x02\x02-/\x042;\x02.-\x03\x02\x02\x02/0\x03" +
		"\x02\x02\x020.\x03\x02\x02\x0201\x03\x02\x02\x021\b\x03\x02\x02\x0223" +
		"\x07`\x02\x023\n\x03\x02\x02\x0245\x07,\x02\x025\f\x03\x02\x02\x0267\x07" +
		"1\x02\x027\x0E\x03\x02\x02\x0289\x07/\x02\x029\x10\x03\x02\x02\x02:;\x07" +
		"f\x02\x02;<\x07k\x02\x02<=\x07x\x02\x02=\x12\x03\x02\x02\x02>?\x07o\x02" +
		"\x02?@\x07q\x02\x02@A\x07f\x02\x02A\x14\x03\x02\x02\x02BC\x07-\x02\x02" +
		"C\x16\x03\x02\x02\x02DE\x07*\x02\x02E\x18\x03\x02\x02\x02FG\x07+\x02\x02" +
		"G\x1A\x03\x02\x02\x02HI\t\x05\x02\x02IJ\x03\x02\x02\x02JK\b\x0E\x02\x02" +
		"K\x1C\x03\x02\x02\x02\x07\x02 %+0\x03\x02\x03\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!LabCalculatorLexer.__ATN) {
			LabCalculatorLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(LabCalculatorLexer._serializedATN));
		}

		return LabCalculatorLexer.__ATN;
	}

}

