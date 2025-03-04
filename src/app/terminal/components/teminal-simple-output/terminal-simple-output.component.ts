import { Component, Input } from '@angular/core';
import { CommandSimpleOutputDataType } from '../../terminal.types';

@Component({
  templateUrl: './terminal-simple-output.component.html',
  styleUrl: './terminal-simple-output.component.scss',
})
export class TerminalSimpleOutputComponent {
  @Input() data: CommandSimpleOutputDataType = '';
}
