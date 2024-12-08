import { jest } from '@jest/globals';
import { register, login, logout } from '../auth_controller.js';
import User from "../../models/user_model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../../libs/jwt.js";

// Datos mock centralizados
const mockUserData = {
  _id: 'mockId123',
  username: 'testuser',
  email: 'test@test.com',
  password: 'hashedPassword123',
  createdAt: new Date(),
  updatedAt: new Date()
};

// Mock correcto del modelo User
const mockSave = jest.fn().mockResolvedValue(mockUserData);
const MockUserClass = jest.fn().mockImplementation(() => ({
  save: mockSave
}));

jest.mock('../../models/user_model.js', () => ({
  __esModule: true,
  default: MockUserClass,
  findOne: jest.fn().mockResolvedValue(mockUserData)
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword123'),
  compare: jest.fn().mockResolvedValue(true)
}));

jest.mock('../../libs/jwt.js', () => ({
  createAccessToken: jest.fn().mockResolvedValue('mockToken123')
}));

describe('Auth Controller Tests', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.clearAllMocks();
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      cookie: jest.fn()
    };
  });

  describe('register', () => {
    test('should successfully register a new user', async () => {
      req = {
        body: {
          username: 'testuser',
          email: 'test@test.com',
          password: 'password123'
        }
      };

      await register(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(res.cookie).toHaveBeenCalledWith('token', 'mockToken123');
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    test('should successfully login a user', async () => {
      req = {
        body: {
          email: 'test@test.com',
          password: 'password123'
        }
      };

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@test.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');
      expect(res.cookie).toHaveBeenCalledWith('token', 'mockToken123');
      expect(res.json).toHaveBeenCalled();
    });

    test('should return error if user not found', async () => {
      req = {
        body: {
          email: 'nonexistent@test.com',
          password: 'password123'
        }
      };

      User.findOne.mockResolvedValueOnce(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    test('should return error if password is incorrect', async () => {
      req = {
        body: {
          email: 'test@test.com',
          password: 'wrongpassword'
        }
      };

      bcrypt.compare.mockResolvedValueOnce(false);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Incorrect password" });
    });
  });

  describe('logout', () => {
    test('should clear token cookie and return success', () => {
      logout(req, res);

      expect(res.cookie).toHaveBeenCalledWith('token', '', {
        expires: expect.any(Date)
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ redirectTo: '/inicio' });
    });
  });
});
