export { Toast as VueToast } from './vue';
export { Toast as ReactToast } from './react';
export * from './types';

import { createRoot } from 'react-dom/client';
import { Demo } from './demo';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Demo />);
}