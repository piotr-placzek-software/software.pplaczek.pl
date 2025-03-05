import { Injectable } from '@angular/core';
import { vfs } from '../virtual-file-system';
import { VFSNode } from '../virtual-file-system.types';
import {
  calculateSize,
  prependDotsDirectories,
  removeContent,
  resolvePath,
  throwAccesDeniedError,
  throwNoSuchFileOrDirectoryError,
} from '../virtual-file-system.utils';

@Injectable()
export class VirtualFileSystemService {
  private readonly rootDirPath = '/home/guest';
  private currWorkDir: string[] = ['', 'home', 'guest'];

  public getDirectoryContentList(
    path: string = '',
  ): Omit<VFSNode, 'content'>[] {
    const targetPath = resolvePath(
      path,
      this.currWorkDir.join('/'),
      this.rootDirPath,
    );

    if (!targetPath.startsWith(this.rootDirPath)) {
      throwAccesDeniedError();
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

  private listDirectory(path: string): VFSNode[] {
    console.log('listing directory', path);
    return vfs.filter(
      (node: VFSNode): boolean =>
        node.root === path ||
        (node.type === 'file' && `${node.root}/${node.name}` === path),
    );
  }
}
