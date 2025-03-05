import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './terminal-complex-output.component.html',
  styleUrl: './terminal-complex-output.component.scss',
})
export class TerminalComplexOutputComponent {
  @Input() data: {
    content: string;
    rich: boolean;
    format: string;
  } = {
    content: '',
    rich: false,
    format: 'plain',
  };
}
