import { Component, Input } from '@angular/core';
import { CommandTableOutputDataType } from '../../terminal.types';

@Component({
  templateUrl: './terminal-table-output.component.html',
  styleUrl: './terminal-table-output.component.scss',
})
export class TerminalTableOutputComponent {
  @Input() data: CommandTableOutputDataType = [];
  @Input() hasHeader = false;

  get tableHeader(): string[] {
    return this.data[0];
  }

  get tableBody(): string[][] {
    if (this.hasHeader) {
      return this.data.slice(1);
    }
    return this.data;
  }
}
