import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { LoggedIn } from '../models/logged-in.model';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const plarfromId = inject(PLATFORM_ID);

  if (isPlatformBrowser(plarfromId)) {
    const loggedInUserStr: string | null = localStorage.getItem('loggedInUser');

    if (loggedInUserStr) {
      const loggedInUser: LoggedIn = JSON.parse(loggedInUserStr);

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${loggedInUser.token}`
        }
      });
    }
  }

  return next(req);
};
