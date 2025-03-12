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
import {
  VFSError,
  VFSErrorType,
} from '../../virtual-file-system/virtual-file-system.errors';
import { VirtualFileSystemService } from '../../virtual-file-system/services/virtual-file-system.service';

@Injectable()
export class MdTerminalCommandService implements TerminalCommand {
  public readonly command: Command = {
    name: 'md',
    desc: 'Prints formated markdown file content',
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
          'Usage: md <path-to-file>',
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
            rich: true,
            format: fileNode.format,
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
        ? `md: ${path}: No such file or directory`
        : type === VFSErrorType.ACCES_DENIED
          ? 'Access denied.'
          : `Unknown error: ${type}`;
    return new SimpleCommandOutput(command, message);
  }
}
