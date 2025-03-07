import { Injectable } from '@angular/core';
import {
  Command,
  CommandArguments,
  CommandHandlerFn,
  CommandOutput,
  CommandSrc,
  SimpleCommandOutput,
} from '../terminal.types';
import { TerminalCommand } from './terminal-command';
import { VirtualFileSystemService } from '../../virtual-file-system/services/virtual-file-system.service';
import {
  VFSError,
  VFSErrorType,
} from '../../virtual-file-system/virtual-file-system.errors';

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
        return this.handleError(
          {
            cmd: this.command.name,
            argv: argv,
          },
          error,
        );
      }
    };
  }

  private handleError(
    command: CommandSrc,
    { type, path }: VFSError,
  ): CommandOutput {
    const message =
      type === VFSErrorType.NOT_FOUND
        ? `cd: ${path}: No such file or directory`
        : type === VFSErrorType.NOT_A_DIRECTORY
          ? `cd: ${path}: Not a directory`
          : type === VFSErrorType.ACCES_DENIED
            ? 'Access denied.'
            : `Unknown error: ${type}`;
    return new SimpleCommandOutput(command, message);
  }
}
