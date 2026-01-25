import { CreateUserDto, UserRole } from '@/types/user';

/**
 * Sample user data for testing and development
 * Passwords are plain text here but will be hashed when created via API
 */
export const sampleUsers: CreateUserDto[] = [
  {
    email: 'admin@bambooshop.com',
    name: 'Admin User',
    password: 'Admin@123',
    role: UserRole.ADMIN,
  },
  {
    email: 'john.doe@example.com',
    name: 'John Doe',
    password: 'User@123',
    role: UserRole.USER,
  },
  {
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    password: 'User@456',
    role: UserRole.USER,
  },
  {
    email: 'manager@bambooshop.com',
    name: 'Shop Manager',
    password: 'Manager@123',
    role: UserRole.ADMIN,
  },
  {
    email: 'customer1@example.com',
    name: 'Alice Johnson',
    password: 'Customer@123',
    role: UserRole.USER,
  },
  {
    email: 'customer2@example.com',
    name: 'Bob Williams',
    password: 'Customer@456',
    role: UserRole.USER,
  },
  {
    email: 'support@bambooshop.com',
    name: 'Support Team',
    password: 'Support@123',
    role: UserRole.ADMIN,
  },
  {
    email: 'test.user@example.com',
    name: 'Test User',
    password: 'Test@123',
    role: UserRole.USER,
  },
];

/**
 * Get a single sample user by email
 */
export function getSampleUserByEmail(email: string): CreateUserDto | undefined {
  return sampleUsers.find(user => user.email === email);
}

/**
 * Get sample users by role
 */
export function getSampleUsersByRole(role: UserRole): CreateUserDto[] {
  return sampleUsers.filter(user => user.role === role);
}

/**
 * Get admin users only
 */
export function getSampleAdminUsers(): CreateUserDto[] {
  return getSampleUsersByRole(UserRole.ADMIN);
}

/**
 * Get regular users only
 */
export function getSampleRegularUsers(): CreateUserDto[] {
  return getSampleUsersByRole(UserRole.USER);
}
