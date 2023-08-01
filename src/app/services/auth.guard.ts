
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = (next: ActivatedRouteSnapshot) => {
  let value = inject(AuthService).isLoggedIn();
  return value ? true : createUrlTreeFromSnapshot(next, ['/', 'login']);
};
