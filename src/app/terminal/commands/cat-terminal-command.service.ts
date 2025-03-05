import { Injectable } from '@angular/core';
import { TerminalCommand } from './terminal-command';
import {
  Command,
  CommandArguments,
  CommandHandlerFn,
  CommandOutput,
  PrintFileCommandOutput,
  SimpleCommandOutput,
} from '../terminal.types';
import { VirtualFileSystemService } from '../../virtual-file-system/services/virtual-file-system.service';

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
