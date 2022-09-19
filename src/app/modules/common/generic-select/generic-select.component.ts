import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {Dialog} from '@angular/cdk/dialog';
import { SelectModalComponent, SelectModalOptions } from './select-modal/select-modal.component';
import { Model } from '../../../models/model';
import { takeUntil, tap } from 'rxjs';
import { AbstractComponent } from '../../../models/abstract-component';


const MODAL_WIDTH = '300px';
const MODAL_HEIGHT = '600px';
export interface SelectOption<T extends Model> {
  data: T;
  label: string;
  selected: boolean;
}

@Component({
  selector: 'app-generic-select',
  templateUrl: './generic-select.component.html',
  styleUrls: ['./generic-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericSelectComponent<T extends Model> extends AbstractComponent implements OnInit, OnDestroy {
  @Input() public options: SelectOption<T>[] = [];
  @Input() public modalTitle: string = '';
  @Input() public inputTitle: string = '';
  @Input() public placeholder: string = '';
  @Output() public newSelection = new EventEmitter<T[]>();

  public get selection(): SelectOption<T>[] {
    return this.options.filter(o => o.selected);
  }

  constructor(private dialog: Dialog, private cdr: ChangeDetectorRef) {
    super();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open<string>(SelectModalComponent, {
      width: MODAL_WIDTH,
      height: MODAL_HEIGHT,
      data: {options: this.options, modalTitle: this.modalTitle} as SelectModalOptions<T>,
    });

    (dialogRef.componentInstance as SelectModalComponent<T>).newSelection.pipe(
      takeUntil(this.destroy$),
      tap((newSelection: SelectOption<T>[]) => {
        newSelection.forEach(selectedOption => {
          const currentOption = this.options.find(o => o.data.token === selectedOption.data.token);
          if (currentOption) {
            currentOption.selected = true;
          }
        });
        this.cdr.detectChanges();
        this.newSelection.emit(newSelection.map(o => o.data));
      }),
    ).subscribe();
  }

  public ngOnInit(): void {
    this.cdr.detectChanges();
  }

  public remove(option: SelectOption<T>): void {

    const o = this.options.find(o => o.data.token === option.data.token);
    if (o) {
      o.selected = false;
      this.cdr.detectChanges();
      this.newSelection.emit(this.selection.map(o => o.data));
    }
  }

  public ngOnDestroy(): void {
    this.triggerDestroy$();
  }



}
