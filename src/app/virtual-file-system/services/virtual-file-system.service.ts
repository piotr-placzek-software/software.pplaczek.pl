import { Injectable } from '@angular/core';
import { vfs } from '../virtual-file-system';
import { VFSNode, VFSNodeFile } from '../virtual-file-system.types';
import {
  calculateSize,
  prependDotsDirectories,
  removeContent,
  resolvePath,
  throwAccessDeniedError,
  throwCatNotAFileError,
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
    const { targetPath, nodes } = this.getNodes(path, {
      accesDenied: throwAccessDeniedError,
      notFound: throwNoSuchFileOrDirectoryError,
    });

    if (nodes.length === 1 && nodes[0].type === 'file') {
      return nodes.map(calculateSize).map(removeContent);
    }

    return prependDotsDirectories(
      targetPath,
      nodes.map(calculateSize).map(removeContent),
    );
  }

  public navigateToDirectory(path: string = '~'): void {
    const { targetPath, nodes } = this.getNodes(path, {
      accesDenied: throwAccessDeniedError,
      notFound: throwCdNoSuchFileOrDirectoryError,
    });

    if (nodes.length === 1 && nodes[0].type === 'file') {
      throwCdNotADirectoryError(path);
    }

    this.setCurrentWorkingDirectory(targetPath);
  }

  public getFile(path: string): VFSNodeFile {
    if (!path) {
      // TODO support for '-h' switch
      throw new Error('');
    }

    const { nodes } = this.getNodes(path, {
      accesDenied: throwAccessDeniedError,
      notFound: throwCdNoSuchFileOrDirectoryError,
    });

    if (nodes.length === 1 && nodes[0].type === 'file') {
      return nodes[0];
    }

    throwCatNotAFileError(path);
    // INFO return is unreachable in case of throwing an error above;
    // TODO improve error handling
    return { name: '', root: '', type: 'file', format: 'plain', content: '' };
  }

  private getNodes(
    path: string,
    throwError: { accesDenied: () => void; notFound: (path: string) => void },
  ): { targetPath: string; nodes: VFSNode[] } {
    const targetPath = resolvePath(
      path,
      this.currWorkDir.join('/'),
      this.homeDirPath,
    );

    if (!targetPath.startsWith(this.homeDirPath)) {
      throwError.accesDenied();
    }

    let nodes = this.listDirectory(targetPath);

    if (!nodes.length) {
      throwError.notFound(path);
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
