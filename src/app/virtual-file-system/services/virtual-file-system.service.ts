import { Injectable } from '@angular/core';
import { vfs } from '../virtual-file-system';
import { VFSNode } from '../virtual-file-system.types';
import {
  calculateSize,
  prependDotsDirectories,
  removeContent,
  resolvePath,
  throwAccessDeniedError,
  throwCdNoSuchFileOrDirectoryError,
  throwCdNotADirectoryError,
  throwNoSuchFileOrDirectoryError,
  transformHomeDirectoryPathIntoTilde,
} from '../virtual-file-system.utils';

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

  public getDirectoryContentList(
    path: string = '',
  ): Omit<VFSNode, 'content'>[] {
    const targetPath = resolvePath(
      path,
      this.currWorkDir.join('/'),
      this.homeDirPath,
    );

    if (!targetPath.startsWith(this.homeDirPath)) {
      throwAccessDeniedError();
    }

    const list = this.listDirectory(targetPath)
      .map(calculateSize)
      .map(removeContent);

    if (!list.length) {
      throwNoSuchFileOrDirectoryError(path);
    }

    if (list.length === 1 && list[0].type === 'file') {
      return list;
    }

    return prependDotsDirectories(targetPath, list);
  }

  public navigateToDirectory(path: string = '~'): void {
    const targetPath = resolvePath(
      path,
      this.currWorkDir.join('/'),
      this.homeDirPath,
    );

    if (!targetPath.startsWith(this.homeDirPath)) {
      throwAccessDeniedError();
    }

    const list = this.listDirectory(targetPath)
      .map(calculateSize)
      .map(removeContent);

    if (!list.length) {
      throwCdNoSuchFileOrDirectoryError(path);
    }

    if (list.length === 1 && list[0].type === 'file') {
      throwCdNotADirectoryError(path);
    }

    this.setCurrentWorkingDirectory(targetPath);
    console.log(targetPath);
  }

  private listDirectory(path: string): VFSNode[] {
    console.log('listing directory', path);
    return vfs.filter(
      (node: VFSNode): boolean =>
        node.root === path ||
        (node.type === 'file' && `${node.root}/${node.name}` === path),
    );
  }

  private setCurrentWorkingDirectory(path: string): void {
    this.currWorkDir = path.split('/');
    console.log(this.currWorkDir);
  }
}
