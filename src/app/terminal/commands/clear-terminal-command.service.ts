import { Injectable } from '@angular/core';
import { ClearCommandOutput, Command } from '../terminal.types';
import { TerminalCommand } from './terminal-command';

@Injectable()
export class ClearTerminalCommandService implements TerminalCommand {
  public readonly command: Command = {
    name: 'clear',
    desc: 'Clears screen',
    func: () => new ClearCommandOutput(),
  };
}
