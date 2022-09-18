import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output
} from '@angular/core';
import {SelectOption} from '../generic-select.component';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {Model} from 'src/app/models/model';
import {AbstractComponent} from 'src/app/models/abstract-component';

export interface SelectModalOptions<T extends Model> {
  options: SelectOption<T>[];
  modalTitle: string;
}

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectModalComponent<T extends Model> extends AbstractComponent implements OnDestroy {
  @Output() public newSelection = new EventEmitter<SelectOption<T>[]>();

  constructor(
    private dialogRef: DialogRef<SelectModalComponent<T>>,
    @Inject(DIALOG_DATA) public data: SelectModalOptions<T>,
    private cdr: ChangeDetectorRef,
  ) {
    super();
  }

  public check(option: SelectOption<T>): void {
    option.selected = !option.selected;
    this.cdr.detectChanges();
  }

  public validSelection(): void {
    const selection = this.data.options.filter(o => o.selected);
    this.newSelection.emit(selection);
    this.dialogRef.close();
  }

  public cancel(): void {
    this.dialogRef.close();
  }



  public ngOnDestroy(): void {
    this.triggerDestroy$();
  }


}
