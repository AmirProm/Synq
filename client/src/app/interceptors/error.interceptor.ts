import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const snack = inject(MatSnackBar);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err) {
        switch (err.status) {
          case 400:  // BadRequest
            if (err.error.errors) {
              const modelStateErrors: string[] = [];
              for (const key in err.error.errors) {
                modelStateErrors.push(err.error.errors[key]);
              }
              throw modelStateErrors;
            }
            else {
              snack.open(err.error, 'Close', { horizontalPosition: 'center', verticalPosition: 'top', duration: 7000 });
            }
            break;
          case 401: // Unauthorized
            snack.open('You are unauthorized', 'Close', { horizontalPosition: 'center', verticalPosition: 'top', duration: 7000 });

            if (isPlatformBrowser(platformId)) // check platform only for SSR
              localStorage.clear();

            router.navigateByUrl('account/login')
            break;
          case 403: // Forbiden
            router.navigateByUrl('/no-access');
            break;
          case 404: // NotFound
            router.navigateByUrl('/not-found');
            break;
          case 500: // Server Erros
            const navigationExtras: NavigationExtras = { state: { error: err.error } };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default: // All other errors
            snack.open('Something unexpected went wrong.', 'Close', { horizontalPosition: 'center', verticalPosition: 'top', duration: 7000 });
            console.log(err);
            break;
        }
      }
      throw err;
    })
  );
};
