import { IsExpiredDatePipe } from './is-expired-date.pipe';

describe('IsExpiredDatePipe', () => {
  it('create an instance', () => {
    const pipe = new IsExpiredDatePipe();
    expect(pipe).toBeTruthy();
  });
});
