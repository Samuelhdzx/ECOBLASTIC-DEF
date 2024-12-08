const { register, login, logout, profile, getAllUsers } = require('../auth_controller');
const User = require('../../models/user_model');
const bcrypt = require('bcryptjs');
const { createAccessToken } = require('../../libs/jwt');

// El resto del código de prueba permanece igual...

// Mock dependencies
jest.mock('../../models/user_model');
jest.mock('bcryptjs');
jest.mock('../../libs/jwt');

describe('register', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        username: 'testuser',
        email: 'test@test.com',
        password: 'password123'
      }
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      cookie: jest.fn()
    };
  });

  test('should successfully register a new user', async () => {
    const hashedPassword = 'hashedPassword123';
    const mockUser = {
      _id: 'mockId123',
      username: 'testuser',
      email: 'test@test.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      save: jest.fn().mockResolvedValue({
        _id: 'mockId123',
        username: 'testuser',
        email: 'test@test.com',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    };

    bcrypt.hash.mockResolvedValue(hashedPassword);
    User.mockImplementation(() => mockUser);
    createAccessToken.mockResolvedValue('mockToken123');

    await register(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(res.cookie).toHaveBeenCalledWith('token', 'mockToken123');
    expect(res.json).toHaveBeenCalled();
  });
});

describe('login', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@test.com',
        password: 'password123'
      }
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      cookie: jest.fn()
    };
  });

  test('should successfully login a user', async () => {
    const mockUser = {
      _id: 'mockId123',
      username: 'testuser',
      email: 'test@test.com',
      password: 'hashedPassword123',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    createAccessToken.mockResolvedValue('mockToken123');

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@test.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');
    expect(res.cookie).toHaveBeenCalledWith('token', 'mockToken123');
    expect(res.json).toHaveBeenCalled();
  });
});

describe('logout', () => {
  test('should clear token cookie and return success', () => {
    const req = {};
    const res = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    logout(req, res);

    expect(res.cookie).toHaveBeenCalledWith('token', '', {
      expires: expect.any(Date)
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ redirectTo: '/inicio' });
  });
});
