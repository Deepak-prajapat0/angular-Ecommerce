
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { LoggerService } from './logger.service';

export const authGuard = (next: ActivatedRouteSnapshot,state:RouterStateSnapshot) => {
  let value = inject(LoggerService).isLoggedin;
  // console.log(state.url);
  
  return value ? true : createUrlTreeFromSnapshot(next, ['/', 'login']);
};
