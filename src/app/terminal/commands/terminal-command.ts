import { Injectable } from '@angular/core';
import { Command } from '../terminal.types';
import { DateTerminalCommandService } from './date-terminal-command.service';
import { ClearTerminalCommandService } from './clear-terminal-command.service';

export abstract class TerminalCommand {
  public abstract readonly command: Command;
}

export const providers = [
  ClearTerminalCommandService,
  DateTerminalCommandService,
];

@Injectable()
export class SupportedTerminalCommandsService {
  constructor(
    private readonly clear: ClearTerminalCommandService,
    private readonly date: DateTerminalCommandService,
  ) {}

  get commands(): Command[] {
    return [this.clear.command, this.date.command];
  }
}
