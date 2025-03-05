import { Injectable } from '@angular/core';
import {
  Command,
  CommandArguments,
  CommandHandlerFn,
  SimpleCommandOutput,
} from '../terminal.types';
import { TerminalCommand } from './terminal-command';
import { VirtualFileSystemService } from '../../virtual-file-system/services/virtual-file-system.service';

@Injectable()
export class CdTerminalCommandService implements TerminalCommand {
  public readonly command: Command = {
    name: 'cd',
    desc: 'Changes working directory',
    func: this.commandHandler(),
  };

  constructor(private readonly fileSystemService: VirtualFileSystemService) {}

  private commandHandler(): CommandHandlerFn {
    return (argv: CommandArguments) => {
      try {
        this.fileSystemService.navigateToDirectory(argv[0]);
        return new SimpleCommandOutput(
          {
            cmd: this.command.name,
            argv: argv,
          },
          '',
        );
      } catch (error: any) {
        return new SimpleCommandOutput(
          {
            cmd: this.command.name,
            argv: argv,
          },
          error.message,
        );
      }
    };
  }
}
