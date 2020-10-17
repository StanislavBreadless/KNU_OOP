import { expect } from 'chai';
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
    ).to.be.equal('123');
  });

  it('Additive expression', () => {
    const formula = 'a10 + b12 - 5';

    const resolver = (variable: string) => {
      return variable === 'a10' ? '12' : '32';
    }

    expect(
      evaluator.evaluate(formula, resolver)
    ).to.be.equal('39');
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
    ).to.be.equal('2090.666667');
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
    ).to.be.equal('2090.666667');
  });
});