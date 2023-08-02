
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { LoggerService } from './logger.service';

export const authGuard = (next: ActivatedRouteSnapshot) => {
  let value = inject(LoggerService).isLoggedin;
  return value ? true : createUrlTreeFromSnapshot(next, ['/', 'login']);
};
