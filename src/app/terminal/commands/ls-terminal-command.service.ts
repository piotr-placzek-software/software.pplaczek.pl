import { Injectable } from '@angular/core';
import { TerminalCommand } from './terminal-command';
import {
  Command,
  CommandArguments,
  CommandHandlerFn,
  CommandOutput,
  CommandSrc,
  SimpleCommandOutput,
  TableCommandOutput,
} from '../terminal.types';
import { VirtualFileSystemService } from '../../virtual-file-system/services/virtual-file-system.service';
import { VFSNode as SrcVFSNode } from '../../virtual-file-system/virtual-file-system.types';
import {
  VFSError,
  VFSErrorType,
} from '../../virtual-file-system/virtual-file-system.errors';

type VFSNode = Omit<SrcVFSNode, 'content'>;

@Injectable()
export class LsTerminalCommandService implements TerminalCommand {
  public readonly command: Command = {
    name: 'ls',
    desc: 'Lists directory content',
    func: this.commandHandler(),
  };

  constructor(private readonly fileSystemService: VirtualFileSystemService) {}

  private commandHandler(): CommandHandlerFn {
    return (argv: CommandArguments) => {
      try {
        const nodes = this.fileSystemService.getDirectoryContentList(argv[0]);
        return new TableCommandOutput(
          {
            cmd: this.command.name,
            argv: argv,
          },
          this.createTableCommandOutputDataStructure(
            this.sortByTypeAndName(nodes),
          ),
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

  private sortByTypeAndName(nodes: VFSNode[]): VFSNode[] {
    return [
      ...nodes.filter((node) => node.type === 'dir').sort(this.sortByName),
      ...nodes.filter((node) => node.type === 'file').sort(this.sortByName),
    ];
  }

  private sortByName(a: VFSNode, b: VFSNode): number {
    return a.name.localeCompare(b.name);
  }

  private createTableCommandOutputDataStructure(data: VFSNode[]): string[][] {
    const chmod = {
      dir: 'drwxrwxr-x',
      file: '.rw-rw-r--',
    };

    return data.map((node: VFSNode) => [
      chmod[node.type],
      node.size || '-',
      node.name,
    ]);
  }

  private handleError(
    command: CommandSrc,
    { type, path }: VFSError,
  ): CommandOutput {
    const message =
      type === VFSErrorType.NOT_FOUND
        ? `"${path}" No such file or directory (os error 2)`
        : type === VFSErrorType.ACCES_DENIED
          ? 'Access denied.'
          : `Unknown error: ${type}`;
    return new SimpleCommandOutput(command, message);
  }
}
