grammar LabCalculator;

/*
* Parser Rules
*/
compileUnit : expression EOF;
expression : LPAREN expression RPAREN #ParenthesizedExpr
  | expression EXPONENT expression #ExponentialExpr
  | expression operatorToken=(MULTIPLY | DIVIDE | MOD | DIV) expression #MultiplicativeExpr
  | expression operatorToken=(ADD | SUBTRACT) expression #AdditiveExpr
  | operatorToken=(ADD | SUBTRACT) expression #AdditiveUnaryExpr
  | NUMBER #NumberExpr
  | IDENTIFIER #IdentifierExpr
  ;
 
/*
* Lexer Rules
*/

NUMBER : INT ('.' INT)?;
IDENTIFIER : [a-zA-Z]+[0-9]+;
INT : ('0'..'9')+;
EXPONENT : '^';
MULTIPLY : '*';
DIVIDE : '/';
SUBTRACT : '-';
DIV : 'div';
MOD : 'mod';
ADD : '+';
LPAREN : '(';
RPAREN : ')';
WS : [ \t\r\n] -> channel(HIDDEN);