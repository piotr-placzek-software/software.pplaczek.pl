import { Injectable } from '@angular/core';

@Injectable()
export class TerminalCommandsHistoryService {
  private commands: string[] = [];
  private iterator = 0;

  public save(command: string) {
    this.commands.push(command);
    this.iterator = this.commands.length;
  }

  public first(): string {
    return this.commands.at(0) || '';
  }

  public current(): string {
    return this.commands.at(this.iterator) || '';
  }

  public previous(): string {
    if (this.iterator) {
      this.iterator -= 1;
      return this.current();
    }
    return this.first();
  }

  public next(): string {
    if (this.iterator < this.commands.length - 1) {
      this.iterator += 1;
      return this.current();
    }
    return '';
  }
}
