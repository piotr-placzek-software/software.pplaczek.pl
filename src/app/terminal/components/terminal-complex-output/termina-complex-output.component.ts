import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './termina-complex-output.component.html',
  styleUrl: './termina-complex-output.component.scss',
})
export class TerminalComplexOutputComponent {
  @Input() data: string = '';
  @Input() rich: boolean = false;
  @Input() format: string = '';
}
