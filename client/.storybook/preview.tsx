import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { Decorator } from '@storybook/react';
import type { Preview } from '@storybook/react-vite';

import { initialize, mswDecorator } from 'msw-storybook-addon';

// const queryClient = new QueryClient();
const createQueryClient = () => new QueryClient();
initialize();


export const decorators: Decorator[] = [
  (Story) => (
    <QueryClientProvider client={createQueryClient()}>
      <Story />
    </QueryClientProvider>
  ),
];

const preview: Preview = {
  decorators: decorators,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;