import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  Command,
  CommandArguments,
  CommandHandlerFn,
  CommandOutput,
  TableCommandOutput,
  SimpleCommandOutput,
} from '../terminal.types';
import { SupportedTerminalCommandsService } from '../commands/terminal-command';

@Injectable()
export class TerminalCommandsService {
  private readonly commandOutput = new Subject<CommandOutput>();
  public readonly commandOutput$ = this.commandOutput.asObservable();

  constructor(
    readonly supportedTerminalCommands: SupportedTerminalCommandsService,
  ) {
    this.commands.push(...supportedTerminalCommands.commands);
  }

  private readonly commands: Command[] = [
    {
      name: 'help',
      desc: 'Prints available commands',
      func: this.helpCommandHandler(),
    },
  ];

  public handlePromptInput(input: string): void {
    const argv = input.split(' ');
    const cmd = argv.shift();

    if (!cmd) {
      return;
    }

    const command = this.commands.find(({ name }) => name === cmd);
    if (!command) {
      return this.defaultCommandHandler(cmd, argv);
    }

    this.commandOutput.next(command.func(argv));
  }

  private defaultCommandHandler(cmd: string, argv: CommandArguments): void {
    this.commandOutput.next(
      new SimpleCommandOutput(
        { cmd, argv },
        `Command '${cmd}' not found. Type 'help' to list available commands.`,
      ),
    );
  }

  private helpCommandHandler(): CommandHandlerFn {
    const excludedCommands = ['?'];
    return (argv: CommandArguments) =>
      new TableCommandOutput(
        { cmd: 'help', argv },
        this.commands
          .filter((command) => !excludedCommands.includes(command.name))
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(({ name, desc }) => [name, desc]),
      );
  }
}
