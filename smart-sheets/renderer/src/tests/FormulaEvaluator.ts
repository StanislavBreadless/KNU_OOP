import { expect } from 'chai';
import { FormulaEvaluator } from '../table-manager/FormulaEvaluator';

describe('Basic parsing', () => {
  const evaluator = new FormulaEvaluator();

  it('Returning one number', () => {

    const formula = '123';

    expect(
      evaluator.evaluate(formula, () => ''),
      '123'
    );
  });

  it('Resolving one variable', () => {

    const formula = 'a10';

    const resolver = (variable: string) => {
      return variable === 'a10' ? '123' : '321';
    }

    expect(
      evaluator.evaluate(formula, resolver),
      '123'
    );
  });

  it('Additive expression', () => {

    const formula = 'a10 + b12 + 5';

    const resolver = (variable: string) => {
      return variable === 'a10' ? '12' : '32';
    }

    expect(
      evaluator.evaluate(formula, resolver),
      '49'
    );
  });

  it('Additive expression', () => {

    const formula = 'a10 + b12 + 5';

    const resolver = (variable: string) => {
      return variable === 'a10' ? '12' : '32';
    }

    expect(
      evaluator.evaluate(formula, resolver),
      '49'
    );
  });

  it('Mutliplicative expression', () => {

    /// 122 * 12 + 12 * 32 + 20 = 1334 + 384 + 20 = 1738
    const formula = '112 * a10 + a10 * b12 + 5 * 4';

    const resolver = (variable: string) => {
      return variable === 'a10' ? '12' : '32';
    }

    expect(
      evaluator.evaluate(formula, resolver),
      '1738'
    );
  });
});