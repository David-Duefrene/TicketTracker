
import type { Meta, StoryObj } from '@storybook/react-vite';
import TicketList from './TicketList';

const meta: Meta<typeof TicketList> = {
  title: 'features/tickets/components/TicketList',
  component: TicketList,
};

export default meta;

export const Default: StoryObj<typeof TicketList> = {
  args: {
    tickets: [
      { id: 1, title: 'Sample Ticket 1', status: 'open', ticketQueue: 'default' },
      { id: 2, title: 'Sample Ticket 2', status: 'in_progress', ticketQueue: 'default' },
      { id: 3, title: 'Sample Ticket 3', status: 'closed', ticketQueue: 'default' },
    ],
  },
};