import { Injectable } from '@angular/core';
import { vfs } from '../virtual-file-system';
import { VFSNode, VFSNodeFile } from '../virtual-file-system.types';
import {
  calculateSize,
  prependDotsDirectories,
  removeContent,
  resolvePath,
  transformHomeDirectoryPathIntoTilde,
} from '../virtual-file-system.utils';
import {
  VFSAccesDeniedError,
  VFSNotADirectoryError,
  VFSNotAFileError,
  VFSNotFoundError,
} from '../virtual-file-system.errors';
import { AutocopleteService } from '../../common/services/autocomplete.service';

@Injectable()
export class VirtualFileSystemService {
  public readonly homeDirPath = '/home/guest';
  private currWorkDir: string[] = ['', 'home', 'guest'];
  private prevWorkDir: string[] = ['', 'home', 'guest'];

  get currentWorkingDirectory(): string[] {
    return transformHomeDirectoryPathIntoTilde(
      this.currWorkDir,
      this.homeDirPath,
    );
  }

  get workingDirectory(): string[] {
    const returnValue = [...this.prevWorkDir];
    if (this.prevWorkDir.join() !== this.currWorkDir.join()) {
      this.prevWorkDir = this.currWorkDir;
    }
    return transformHomeDirectoryPathIntoTilde(returnValue, this.homeDirPath);
  }

  constructor(readonly autocompleteService: AutocopleteService) {
    autocompleteService.setFileSystemTree(
      vfs.map((node: VFSNode): string => `${node.root}/${node.name}`),
    );
  }

  public getDirectoryContentList(
    path: string = '',
  ): Omit<VFSNode, 'content'>[] {
    const { targetPath, nodes } = this.getNodes(path);

    if (nodes.length === 1 && nodes[0].type === 'file') {
      return nodes.map(calculateSize).map(removeContent);
    }

    return prependDotsDirectories(
      targetPath,
      nodes.map(calculateSize).map(removeContent),
    );
  }

  public navigateToDirectory(path: string = '~'): void {
    const { targetPath, nodes } = this.getNodes(path);

    if (nodes.length === 1 && nodes[0].type === 'file') {
      throw new VFSNotADirectoryError(path);
    }

    this.setCurrentWorkingDirectory(targetPath);
  }

  public getFile(path: string): VFSNodeFile {
    if (!path) {
      throw new VFSNotAFileError(path);
    }

    const { nodes } = this.getNodes(path);

    if (nodes.length === 1 && nodes[0].type === 'file') {
      return nodes[0];
    }

    throw new VFSNotAFileError(path);
  }

  private getNodes(path: string): { targetPath: string; nodes: VFSNode[] } {
    const targetPath = resolvePath(
      path,
      this.currWorkDir.join('/'),
      this.homeDirPath,
    );

    if (!targetPath.startsWith(this.homeDirPath)) {
      throw new VFSAccesDeniedError();
    }

    let nodes = this.listDirectory(targetPath);

    if (!nodes.length) {
      throw new VFSNotFoundError(path);
    }

    return { targetPath, nodes };
  }

  private listDirectory(path: string): VFSNode[] {
    return vfs.filter(
      (node: VFSNode): boolean =>
        node.root === path ||
        (node.type === 'file' && `${node.root}/${node.name}` === path),
    );
  }

  private setCurrentWorkingDirectory(path: string): void {
    this.currWorkDir = path.split('/');
  }
}
