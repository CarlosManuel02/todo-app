import {CanActivateFn} from '@angular/router';

export const validarTokenGuard: CanActivateFn = (route, state) => {
  return true;
};
