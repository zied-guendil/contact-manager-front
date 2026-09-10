import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it('should login with valid credentials', () => {
    const result = service.login('admin', 'admin');

    expect(result).toBeTrue();
    expect(localStorage.getItem('loggedIn')).toBe('true');
  });

  it('should reject invalid credentials', () => {
    const result = service.login('user', 'wrong');

    expect(result).toBeFalse();
    expect(localStorage.getItem('loggedIn')).toBeNull();
  });

  it('should logout', () => {
    localStorage.setItem('loggedIn', 'true');

    service.logout();

    expect(localStorage.getItem('loggedIn')).toBeNull();
  });

  it('should return true when user is logged in', () => {
    localStorage.setItem('loggedIn', 'true');

    expect(service.isLoggedIn()).toBeTrue();
  });
});