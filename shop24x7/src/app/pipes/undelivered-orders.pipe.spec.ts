import { UndeliveredOrdersPipe } from './undelivered-orders.pipe';

describe('UndeliveredOrdersPipe', () => {
  it('create an instance', () => {
    const pipe = new UndeliveredOrdersPipe();
    expect(pipe).toBeTruthy();
  });
});
