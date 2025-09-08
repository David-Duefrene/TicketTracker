import { UserGroupCreate } from '../features/userGroups/index';
import { CreateTicketQueue } from '../features/ticketQueue/index';
import {  AddUserToGroup, CreateUser } from '../features/users/index';
import { CreateTicket } from '../features/tickets/index';

import CreateGroupCaseQueuePermissionJuntion from '../features/groupCaseQueuePermissionJuntion/components/CreateGroupCaseQueuePermissionJuntion';

import { TabbedComponent } from '../components/TabbedComponent/index';
import GetGroups from '../features/groups/components/GetGroups';

const AdminBoard = () => {
    const userTabs: [string, React.ReactNode][] = [
        ['Create User', <CreateUser key="create-user" />],
        ['Add User to Group', <AddUserToGroup key="add-user-to-group" />],
    ];

    const groupTabs: [string, React.ReactNode][] = [
        ['Create Group', <UserGroupCreate key="create-group" />],
        ['Get Groups', <GetGroups key="get-groups" />], // Assuming GetGroups is a component that lists groups
    ];

    const ticketQueueTabs: [string, React.ReactNode][] = [
        ['Create Ticket Queue', <CreateTicketQueue key="create-ticket-queue" />],
        ['Create Group Case Queue Permission Junction', <CreateGroupCaseQueuePermissionJuntion key="create-group-case-queue-permission-junction" />],
    ];

    const ticketTabs: [string, React.ReactNode][] = [
        ['Create Ticket', <CreateTicket key="create-ticket" />],
    ];

    return <TabbedComponent tabs={
        [
            ['User Management', <TabbedComponent tabs={userTabs} key="user-management" />],
            ['Group Management', <TabbedComponent tabs={groupTabs} key="group-management" />],
            ['Ticket Queue Management', <TabbedComponent tabs={ticketQueueTabs} key="ticket-queue-management" />],
            ['Ticket Management', <TabbedComponent tabs={ticketTabs} key="ticket-management" />],
        ]
    } />;
};

export default AdminBoard;
