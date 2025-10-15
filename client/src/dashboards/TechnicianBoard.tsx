import { TabbedComponent } from '../components/TabbedComponent/index';

import { ListTickets } from '../features/tickets/index';
import Comp from '../features/tickets/components/TicketList';

const TechnicianBoard = () => {
    const technicianTabs: [string, React.ReactNode][] = [
        ['Open Tickets', <Comp key="open-tickets" status="open" />],
        ['My Tickets', <Comp key="my-tickets" status="my" />],
    ];
    return (
        <TabbedComponent tabs={technicianTabs} />
    );
};

export default TechnicianBoard;