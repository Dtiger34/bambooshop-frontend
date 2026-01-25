# Sample Data Files

This folder contains sample/seed data for development and testing purposes.

## Available Data Files

### sampleUsers.ts

Contains sample user data with the following fields:

- **email**: User's email address (unique)
- **name**: User's full name
- **password**: Plain text password (will be hashed when created)
- **role**: USER or ADMIN

#### Sample Accounts

| Email                  | Password     | Role  | Name          |
| ---------------------- | ------------ | ----- | ------------- |
| admin@bambooshop.com   | Admin@123    | ADMIN | Admin User    |
| manager@bambooshop.com | Manager@123  | ADMIN | Shop Manager  |
| support@bambooshop.com | Support@123  | ADMIN | Support Team  |
| john.doe@example.com   | User@123     | USER  | John Doe      |
| jane.smith@example.com | User@456     | USER  | Jane Smith    |
| customer1@example.com  | Customer@123 | USER  | Alice Johnson |
| customer2@example.com  | Customer@456 | USER  | Bob Williams  |
| test.user@example.com  | Test@123     | USER  | Test User     |

## Usage

### Import in your code:

```typescript
import {
  sampleUsers,
  getSampleUserByEmail,
  getSampleAdminUsers,
} from "@/data/sampleUsers";

// Get all sample users
const allUsers = sampleUsers;

// Get a specific user
const admin = getSampleUserByEmail("admin@bambooshop.com");

// Get all admin users
const admins = getSampleAdminUsers();
```

### Create users via API:

```typescript
import { UserService } from "@/services/user.service";
import { sampleUsers } from "@/data/sampleUsers";

// Create a single user
const result = await UserService.createUser(sampleUsers[0]);

// Create all sample users
for (const user of sampleUsers) {
  await UserService.createUser(user);
}
```

## Notes

- Passwords shown here are for development only
- All passwords will be hashed using bcrypt before storage
- In production, use strong, unique passwords
- Never commit real user credentials to version control
