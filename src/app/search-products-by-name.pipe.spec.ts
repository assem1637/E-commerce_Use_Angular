import { SearchProductsByNamePipe } from './search-products-by-name.pipe';

describe('SearchProductsByNamePipe', () => {
  it('create an instance', () => {
    const pipe = new SearchProductsByNamePipe();
    expect(pipe).toBeTruthy();
  });
});
