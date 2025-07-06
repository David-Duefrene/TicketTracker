import React, { useState } from 'react';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import CreateUser from './Pages/CreateUser';
import Login from './Pages/Login';
import './App.css';

const queryClient = new QueryClient();

function App() {
  // For demo, assume user is always logged in
  const [isLoggedIn] = useState(false);

  return (
    <>
      <h1>TicketTracker - Create User</h1>
          <QueryClientProvider client={queryClient}>
      {isLoggedIn ? (
                  <CreateUser />
          ) : (
              <Login />
      )}
          </QueryClientProvider>
    </>
  );
}

export default App;
