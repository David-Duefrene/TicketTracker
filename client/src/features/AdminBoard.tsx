import CreateUser from '../Components/Users/CreateUser';
import CreateGroup from '../Components/Groups/CreateGroup';
import CreateTicketQueue from '../Components/TicketQueue/CreateTicketQueue';
import AddUserToGroup from '../Components/Users/AddUserToGroup';

import TabbedComponent from '../Components/UI/tabbedComponent';

const AdminBoard = () => {
    const tabs: [string, React.ReactNode][] = [
        ['Create User', <CreateUser key="create-user" />],
        ['Create Group', <CreateGroup key="create-group" />],
        ['Create Ticket Queue', <CreateTicketQueue key="create-ticket-queue" />],
        ['Add User to Group', <AddUserToGroup key="add-user-to-group" />]
    ];

    return <TabbedComponent tabs={tabs} />;
};

export default AdminBoard;
