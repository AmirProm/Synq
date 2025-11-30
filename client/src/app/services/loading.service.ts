import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _spinnerService = inject(NgxSpinnerService);

  loading(): void {
    this._spinnerService.show();
  }

  idle(): void {
    this._spinnerService.hide();
  }
}