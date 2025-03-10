import { Injectable } from '@angular/core';
import { TerminalCommand } from './terminal-command';
import {
  Command,
  CommandArguments,
  CommandHandlerFn,
  CommandOutput,
  CommandSrc,
  PrintFileCommandOutput,
  SimpleCommandOutput,
} from '../terminal.types';
import { VirtualFileSystemService } from '../../virtual-file-system/services/virtual-file-system.service';
import {
  VFSError,
  VFSErrorType,
} from '../../virtual-file-system/virtual-file-system.errors';

@Injectable()
export class CatTerminalCommandService implements TerminalCommand {
  public readonly command: Command = {
    name: 'cat',
    desc: 'Prints file (plain)',
    func: this.commandHandler(),
  };

  constructor(private readonly fileSystemService: VirtualFileSystemService) {}

  private commandHandler(): CommandHandlerFn {
    return (argv: CommandArguments): CommandOutput => {
      if (argv.includes('-h') || argv.includes('--help')) {
        return new SimpleCommandOutput(
          {
            cmd: this.command.name,
            argv: argv,
          },
          'Usage: cat <path-to-file>',
        );
      }
      try {
        const fileNode = this.fileSystemService.getFile(argv[0]);
        return new PrintFileCommandOutput(
          {
            cmd: this.command.name,
            argv: argv,
          },
          {
            content: fileNode.content,
            rich: false,
            format: 'plain',
          },
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
      type === VFSErrorType.NOT_A_FILE
        ? `cd: ${path}: No such file or directory`
        : type === VFSErrorType.ACCES_DENIED
          ? 'Access denied.'
          : `Unknown error: ${type}`;
    return new SimpleCommandOutput(command, message);
  }
}
