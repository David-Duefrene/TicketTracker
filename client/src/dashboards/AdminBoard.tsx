import { UserGroupCreate } from '../features/userGroups/index';
import { CreateTicketQueue } from '../features/ticketQueue/index';
import {  AddUserToGroup, CreateUser } from '../features/users/index';

import { TabbedComponent } from '../components/TabbedComponent/index';

const AdminBoard = () => {
    const userTabs: [string, React.ReactNode][] = [
        ['Create User', <CreateUser key="create-user" />],
        ['Add User to Group', <AddUserToGroup key="add-user-to-group" />],
    ];

    const groupTabs: [string, React.ReactNode][] = [
        ['Create Group', <UserGroupCreate key="create-group" />],
    ];

    const ticketQueueTabs: [string, React.ReactNode][] = [
        ['Create Ticket Queue', <CreateTicketQueue key="create-ticket-queue" />],
    ];

    return <TabbedComponent tabs={
        [
            ['User Management', userTabs],
            ['Group Management', groupTabs],
            ['Ticket Queue Management', ticketQueueTabs],
        ]
    } />;
};

export default AdminBoard;
