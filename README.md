# Refund API

Study project: a simple refund request API with authentication, file uploads, and a SQLite database.

## Study goals

- Practice building a REST API with Express + TypeScript.
- Implement authentication with JWT and role-based access.
- Use Prisma ORM with SQLite for persistence.
- Handle file uploads with Multer and store files on disk.
- Validate inputs with Zod.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Ensure `.env` exists

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="..."
JWT_EXPIRES_IN="1d"
```

3. Start the server:

```bash
npm run dev
```

Server runs on `http://localhost:3333`.

## Routes

### Public

- `POST /users` Create a user (role: `employee` or `manager`).
- `POST /sessions` Login and receive a JWT token.

### Authenticated (JWT required)

Add header: `Authorization: Bearer <token>`.

- `POST /refunds` (role: `employee`)
- `GET /refunds` (role: `manager`)
- `GET /refunds/:id` (role: `manager` or `employee`)
- `POST /uploads` (role: `employee`) Multipart form-data with field `file`

### Static files

- `GET /uploads/<filename>` Serves uploaded files.
