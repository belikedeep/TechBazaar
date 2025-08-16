# Backend API Documentation

## Authentication & User Profile

### POST `/signup`

- Register a new user.
- Body: `{ name, email, password, role? }`

### POST `/login`

- Authenticate user, returns JWT token.
- Body: `{ email, password }`
- Response: `{ token, user }`

### GET `/profile`

- Get current user's profile.
- Auth: Bearer JWT required.
- Response: `{ user }`

### PUT `/profile`

- Update current user's profile (name, password).
- Auth: Bearer JWT required.
- Body: `{ name?, password? }`
- Cannot update email or role via this endpoint.
- Response: `{ user }`

### POST `/logout`

- No-op for JWT (client should delete token).
- Auth: Bearer JWT required.
- Response: `{ message: "Logged out" }`

---

## Role-Based Access Control

To restrict endpoints to specific roles, use the `requireRole` middleware:

```typescript
import { authenticateJWT, requireRole } from "../middleware/authMiddleware";

router.get("/admin-only", authenticateJWT, requireRole("admin"), handler);
```

- `requireRole("admin")` restricts access to admins.
- `requireRole("customer")` restricts access to customers.

---

## Notes

- All `/profile` endpoints require authentication.
- Only admins should be allowed to access admin-only routes.
- Customers can only access and update their own profile.
