import { Injectable } from '@angular/core';
import { TerminalCommand } from './terminal-command';
import { Command, CommandOutput, TableCommandOutput } from '../terminal.types';

@Injectable()
export class KeybindingsTerminalCommandService implements TerminalCommand {
  public readonly command: Command = {
    name: 'keybindings',
    desc: 'Prints available terminal shortcuts',
    func: (): CommandOutput => {
      return new TableCommandOutput(
        {
          cmd: 'keybindings',
          argv: [],
        },
        [
          ['Ctrl+a', 'Move cursor at start of input'],
          ['Ctrl+k', 'Clear input if cursor is at the start of input'],
          [
            'Ctrl+w',
            'Clear word backward from cursor (be careful it may close your browser)',
          ],
          ['Ctrl+l', 'Clear terminal output history'],
          ['Tab', 'Autocomplete input'],
          ['Arrow Up/Down', 'Navigate through input history'],
          ['?', "Alias for 'help' command"],
        ],
      );
    },
  };
}
