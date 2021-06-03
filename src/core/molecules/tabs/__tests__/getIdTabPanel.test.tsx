import { tabId, panelId } from '../utils';

describe('tab/panel id', () => {
  it('should have correct tabId', () => {
    const actual = tabId(123, 'id');
    expect(actual).toBe('tab:id-123');
  });
  it('should have correct panelId', () => {
    const actual = panelId(123, 'id');
    expect(actual).toBe('panel:id-123');
  });
});
