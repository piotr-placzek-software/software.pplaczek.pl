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
          ['Ctrl+c', 'Interrupt a process'],
          ['Ctrl+k', 'Clear input from cursor to the end of input'],
          [
            'Ctrl+w',
            'Clear word backward from cursor (be careful it may close your browser)',
          ],
          ['Ctrl+l', 'Clear terminal output history'],
          ['Tab', 'Autocomplete input'],
          ['Arrow Up/Down', 'Navigate through input history'],
          ['?', 'Print help message'],
        ],
      );
    },
  };
}
