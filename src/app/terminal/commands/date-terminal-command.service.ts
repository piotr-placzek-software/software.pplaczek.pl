import { Injectable } from '@angular/core';
import {
  Command,
  CommandArguments,
  SimpleCommandOutput,
} from '../terminal.types';
import { TerminalCommand } from './terminal-command';

@Injectable()
export class DateTerminalCommandService implements TerminalCommand {
  public readonly command: Command = {
    name: 'date',
    desc: 'Prints current date and time',
    func: (argv: CommandArguments) =>
      new SimpleCommandOutput(
        {
          cmd: this.command.name,
          argv: argv,
        },
        new Date().toString(),
      ),
  };
}
