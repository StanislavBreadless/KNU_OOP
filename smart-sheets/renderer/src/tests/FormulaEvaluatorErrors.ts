import { expect } from 'chai';
import { FormulaEvaluator } from '../table-manager/FormulaEvaluator';

import * as Constants from '../table-manager/Constants';

describe('Error handling in FormulaEvaluator', () => {
  const evaluator = new FormulaEvaluator();

  it('Bad variable', () => {
    const formula = 'a12';

    const error = new Error(Constants.BAD_VARIABLE);

    expect(
      evaluator.evaluate(formula, () => 'error')
    ).to.equal(error.toString());
  });

  it('Wrong format', () => {
    const formula = '12a + 12';

    const error = new Error(Constants.WRONG_FORMAT);

    expect(
      evaluator.evaluate(formula, () => 'error')
    ).to.equal(error.toString());
  });


});