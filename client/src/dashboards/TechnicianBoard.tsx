import { TabbedComponent } from '../components/TabbedComponent/index';

import { ListTickets } from '../features/tickets/index';

const TechnicianBoard = () => {
    const technicianTabs: [string, React.ReactNode][] = [
        ['Open Tickets', <ListTickets key="open-tickets" status="open" />],
        ['My Tickets', <ListTickets key="my-tickets" status="my" />],
    ];
    return (
        <TabbedComponent tabs={technicianTabs} />
    );
};

export default TechnicianBoard;