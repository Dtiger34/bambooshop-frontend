import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { CreateUserDto, User as FrontendUser } from '@/types/user';
import { mapUserDocumentToFrontend } from '@/lib/mappers';

export class AuthService {
  /**
   * Register a new user
   */
  static async register(userData: CreateUserDto): Promise<{
    success: boolean;
    user?: FrontendUser;
    message?: string;
  }> {
    try {
      await connectDB();

      const { email, name, password, role } = userData;

      // Validation
      if (!email || !password) {
        return {
          success: false,
          message: 'Email and password are required',
        };
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return {
          success: false,
          message: 'Invalid email format',
        };
      }

      // Password validation
      if (password.length < 6) {
        return {
          success: false,
          message: 'Password must be at least 6 characters',
        };
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return {
          success: false,
          message: 'User with this email already exists',
        };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const newUser = await User.create({
        email,
        name,
        password: hashedPassword,
        role: role || 'USER',
      });

      // Convert to frontend type
      const frontendUser = mapUserDocumentToFrontend(newUser);

      return {
        success: true,
        user: frontendUser,
        message: 'User registered successfully',
      };
    } catch (error) {
      console.error('Error in register:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to register user',
      };
    }
  }

  /**
   * Login user
   */
  static async login(email: string, password: string): Promise<{
    success: boolean;
    user?: FrontendUser;
    message?: string;
  }> {
    try {
      await connectDB();

      // Validation
      if (!email || !password) {
        return {
          success: false,
          message: 'Email and password are required',
        };
      }

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return {
          success: false,
          message: 'Invalid credentials',
        };
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Invalid credentials',
        };
      }

      // Convert to frontend type
      const frontendUser = mapUserDocumentToFrontend(user);

      return {
        success: true,
        user: frontendUser,
        message: 'Login successful',
      };
    } catch (error) {
      console.error('Error in login:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to login',
      };
    }
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: string): Promise<{
    success: boolean;
    user?: FrontendUser;
    message?: string;
  }> {
    try {
      await connectDB();

      const user = await User.findById(userId).select('-password');
      
      if (!user) {
        return {
          success: false,
          message: 'User not found',
        };
      }

      // Convert to frontend type
      const frontendUser = mapUserDocumentToFrontend(user);

      return {
        success: true,
        user: frontendUser,
      };
    } catch (error) {
      console.error('Error in getUserById:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to get user',
      };
    }
  }

  /**
   * Verify user credentials
   */
  static async verifyCredentials(email: string, password: string): Promise<boolean> {
    try {
      await connectDB();
      
      const user = await User.findOne({ email });
      if (!user) {
        return false;
      }

      return await bcrypt.compare(password, user.password);
    } catch (error) {
      console.error('Error in verifyCredentials:', error);
      return false;
    }
  }
}
