import {Injectable, Type} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog,
  ) { }

  public open<T, K>(modal: Type<T>, params?: K) {
    return this.dialog.open(modal, {
      width: '400px',
      data: params,
    });
  }
}
