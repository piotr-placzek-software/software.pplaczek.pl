import { Injectable } from '@angular/core';
import { TerminalCommand } from './terminal-command';
import { Command, ResetCommandOutput } from '../terminal.types';

@Injectable()
export class ResetTerminalCommandService implements TerminalCommand {
  public readonly command: Command = {
    name: 'reset',
    desc: 'Resets terminal output view',
    func: () => new ResetCommandOutput(),
  };
}
