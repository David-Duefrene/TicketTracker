import { UserGroupCreate } from '../features/userGroups/index';
import { CreateTicketQueue } from '../features/ticketQueue/index';
import {  AddUserToGroup, CreateUser } from '../features/users/index';
import CreateGroupCaseQueuePermissionJuntion from '../features/groupCaseQueuePermissionJuntion/components/CreateGroupCaseQueuePermissionJuntion';

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
        ['Create Group Case Queue Permission Junction', <CreateGroupCaseQueuePermissionJuntion key="create-group-case-queue-permission-junction" />],
    ];

    return <TabbedComponent tabs={
        [
            ['User Management', <TabbedComponent tabs={userTabs} key="user-management" />],
            ['Group Management', <TabbedComponent tabs={groupTabs} key="group-management" />],
            ['Ticket Queue Management', <TabbedComponent tabs={ticketQueueTabs} key="ticket-queue-management" />],
        ]
    } />;
};

export default AdminBoard;
