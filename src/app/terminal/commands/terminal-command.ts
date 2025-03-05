import { Injectable } from '@angular/core';
import { Command } from '../terminal.types';
import { DateTerminalCommandService } from './date-terminal-command.service';
import { ClearTerminalCommandService } from './clear-terminal-command.service';
import { LsTerminalCommandService } from './ls-terminal-command.service';
import { CdTerminalCommandService } from './cd-terminal-command.service';

export abstract class TerminalCommand {
  public abstract readonly command: Command;
}

export const providers = [
  ClearTerminalCommandService,
  DateTerminalCommandService,
  LsTerminalCommandService,
  CdTerminalCommandService,
];

@Injectable()
export class SupportedTerminalCommandsService {
  constructor(
    private readonly clear: ClearTerminalCommandService,
    private readonly date: DateTerminalCommandService,
    private readonly ls: LsTerminalCommandService,
    private readonly cd: CdTerminalCommandService,
  ) {}

  get commands(): Command[] {
    return [
      this.clear.command,
      this.date.command,
      this.ls.command,
      this.cd.command,
    ];
  }
}
