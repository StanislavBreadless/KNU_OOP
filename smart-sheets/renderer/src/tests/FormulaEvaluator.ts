import { expect } from 'chai';
import { resolve } from 'dns';
import { FormulaEvaluator } from '../table-manager/FormulaEvaluator';

describe('Basic parsing', () => {
  const evaluator = new FormulaEvaluator();

  it('Returning one number', () => {
    const formula = '123';

    expect(
      evaluator.evaluate(formula, () => '')
    ).to.equal('123');
  });

  it('Resolving one variable', () => {
    const formula = 'a10';

    const resolver = (variable: string) => {
      return variable === 'a10' ? '123' : '321';
    }

    expect(
      evaluator.evaluate(formula, resolver)
    ).to.equal('123');
  });

  it('Additive expression', () => {
    const formula = 'a10 + b12 - 5';

    const resolver = (variable: string) => {
      return variable === 'a10' ? '12' : '32';
    }

    expect(
      evaluator.evaluate(formula, resolver)
    ).to.equal('39');
  });

  it('Mutliplicative expression', () => {
    const values = {
      "a10": '12',
      "b10": '134',
      "c10": '90',
      "d10": '110'
    };

    /// 12 * 134 + 90 * 5 + 110/3 + 12 div 5 - 90 mod 7 = 
    /// 1608 + 450 + 36.666... + 2 - 6 = 2090.666667
    const formula = 'a10 * b10 + c10 * 5 + d10 / 3 + a10 div 5 - c10 mod 7';

    const resolver = (variable: string) => {
      // @ts-ignore
      return values[variable] as string;
    }

    expect(
      (+evaluator.evaluate(formula, resolver)).toFixed(6)
    ).to.equal('2090.666667');
  });

  it('Mutliplicative expression', () => {
    const values = {
      "a10": '12',
      "b10": '134',
      "c10": '90',
      "d10": '110'
    };

    /// 12 * 134 + 90 * 5 + 110/3 + 12 div 5 - 90 mod 7 = 
    /// 1608 + 450 + 36.666... + 2 - 6 = 2090.666667
    const formula = 'a10 * b10 + c10 * 5 + d10 / 3 + a10 div 5 - c10 mod 7';

    const resolver = (variable: string) => {
      // @ts-ignore
      return values[variable] as string;
    }

    expect(
      (+evaluator.evaluate(formula, resolver)).toFixed(6)
    ).to.equal('2090.666667');
  });

  it('Parenthesized expression', () => {
    const values = {
      "a10": '12',
      "b10": '134'
    };

    const formula = '(a10 + b10) * 3 + 10';

    const resolver = (variable: string) => {
      // @ts-ignore
      return values[variable] as string;
    }

    expect(
      (+evaluator.evaluate(formula, resolver)).toFixed(6)
    ).to.equal('448.000000');
  });

  it('Ultimate expression', () => {
    const values = {
      "a10": '12',
      "b10": '134',
      "c10": '90',
      "d10": '110'
    };

    /// (12 + 134)*3/10 + 30 - 90 = 43.8 + 20 - 90 = 
    /// = -26.2
    const formula = '(a10 + b10) * 3 / 10 + d10 mod c10 - c10 div 1';

    const resolver = (variable: string) => {
      // @ts-ignore
      return values[variable] as string;
    }

    expect(
      (+evaluator.evaluate(formula, resolver)).toFixed(6)
    ).to.equal('-26.200000');
  });
});