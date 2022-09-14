import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SelectOption } from './generic-select/generic-select.component';
import { Ingredient } from './models/ingredient';

export function uuidv4(): string {
  return (`${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`).replace(/[018]/g, (c: any) =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public options: SelectOption<Ingredient>[] = [
    {data: {token: uuidv4(), name: 'cucumber'}, label: 'cucumber', selected: true},
    {data: {token: uuidv4(), name: 'Carot'}, label: 'Carot', selected: true},
    {data: {token: uuidv4(), name: 'apple'}, label: 'apple', selected: true},
    {data: {token: uuidv4(), name: 'salt'}, label: 'salt', selected: true},
    {data: {token: uuidv4(), name: 'sugar'}, label: 'sugar', selected: true},
    {data: {token: uuidv4(), name: 'meat'}, label: 'meat', selected: true},
  ]
  public title = 'WelshAcademy';

  public selection: Ingredient[] = [];

  constructor(
  ) {}
}
