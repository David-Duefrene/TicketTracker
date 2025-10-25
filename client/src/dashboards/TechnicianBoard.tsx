import { TabbedComponent } from '../components/TabbedComponent/index';

import { TicketList } from '../features/tickets/index';

const TechnicianBoard = () => {
    const technicianTabs: [string, React.ReactNode][] = [
        ['Open Tickets', <TicketList key="open-tickets" status="open" />],
        ['My Tickets', <TicketList key="my-tickets" status="my" />],
    ];
    return (
        <TabbedComponent tabs={technicianTabs} />
    );
};

export default TechnicianBoard;