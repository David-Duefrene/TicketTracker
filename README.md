# TicketTracker

A full-stack ticket tracking system built with ASP.NET Core (.NET 9) for the backend and React + TypeScript + Vite for the frontend.

## Features

- User authentication and authorization (JWT, ASP.NET Identity)
- Ticket management (CRUD operations)
- Ticket queues and group-based permissions
- Admin and user roles
- RESTful API with Swagger documentation
- Modern React frontend with Vite

## Project Structure

- `TicketTracker/` - ASP.NET Core backend (API, models, controllers)
- `client/` - React + TypeScript frontend

## Getting Started

### Prerequisites
- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js & npm](https://nodejs.org/)

### Backend Setup
1. Navigate to the project root:
   ```sh
   cd TicketTracker
   ```
2. Restore dependencies:
   ```sh
   dotnet restore
   ```
3. Run the backend:
   ```sh
   dotnet run
   ```
4. The API will be available at `https://localhost:5001` (default).
5. Swagger UI for API docs: `https://localhost:5001/swagger`

### Frontend Setup
1. Navigate to the client folder:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. The frontend will be available at `http://localhost:5173`.

### API Authentication
- Uses JWT Bearer tokens.
- Register/login via `/api/auth/register` and `/api/auth/login` endpoints.
- Pass the token in the `Authorization` header as `Bearer <token>` for protected endpoints.

### Development Notes
- Backend uses in-memory databases by default (see `Program.cs`).
- You can switch to SQL Server by updating the connection strings and uncommenting relevant lines in `Program.cs`.
- Frontend is configured to proxy API requests to the backend (see `client/vite.config.ts`).

## License
MIT

## Credits
- ASP.NET Core
- React
- Vite
- Swagger
