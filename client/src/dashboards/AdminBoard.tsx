import { UserGroupCreate } from '../features/userGroups/index';
import { CreateTicketQueue } from '../features/ticketQueue/index';
import {  AddUserToGroup, CreateUser } from '../features/users/index';

import { TabbedComponent } from '../components/TabbedComponent/index';

const AdminBoard = () => {
    const tabs: [string, React.ReactNode][] = [
        ['Create User', <CreateUser key="create-user" />],
        ['Create Group', <UserGroupCreate key="create-group" />],
        ['Create Ticket Queue', <CreateTicketQueue key="create-ticket-queue" />],
        ['Add User to Group', <AddUserToGroup key="add-user-to-group" />]
    ];

    return <TabbedComponent tabs={tabs} />;
};

export default AdminBoard;
