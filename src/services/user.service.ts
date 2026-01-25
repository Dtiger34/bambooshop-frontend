import { API_ENDPOINTS } from '@/lib/constants';
import { CreateUserDto, UpdateUserDto, User, UserResponse, UsersListResponse } from '@/types/user';

export class UserService {
  /**
   * Create a new user
   */
  static async createUser(userData: CreateUserDto): Promise<UserResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.USERS.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to create user',
        };
      }

      return {
        success: true,
        data: data.user,
        message: 'User created successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  /**
   * Get all users
   */
  static async getAllUsers(): Promise<UsersListResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.USERS.GET_ALL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to fetch users',
        };
      }

      return {
        success: true,
        data: data.users,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  /**
   * Get user by ID
   */
  static async getUserById(id: string): Promise<UserResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.USERS.GET_BY_ID(id), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to fetch user',
        };
      }

      return {
        success: true,
        data: data.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  /**
   * Update user
   */
  static async updateUser(id: string, userData: UpdateUserDto): Promise<UserResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.USERS.UPDATE(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to update user',
        };
      }

      return {
        success: true,
        data: data.user,
        message: 'User updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  /**
   * Delete user
   */
  static async deleteUser(id: string): Promise<UserResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.USERS.DELETE(id), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to delete user',
        };
      }

      return {
        success: true,
        message: 'User deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }
}
