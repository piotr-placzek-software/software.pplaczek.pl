import { VFSNode } from './virtual-file-system.types';

export function resolvePath(
  path: string,
  currWorkDir: string,
  rootDirPath: string,
): string {
  let targetPath = currWorkDir;

  if (path.startsWith('~')) {
    targetPath = path.replace('~', rootDirPath);
  }

  if (path.includes('..')) {
    targetPath = resolveDottedPath(path, currWorkDir);
  } else if (path.length && path !== '.') {
    targetPath = `${currWorkDir}/${path}`;
  }

  return trimTrailingSlashes(targetPath);
}

export function resolveDottedPath(path: string, currWorkDir: string): string {
  const resolvedPathSegments = currWorkDir.split('/');
  const pathSegments = path
    .split('/')
    .filter((pathSegment: string): number => pathSegment.length);

  for (let segment of pathSegments) {
    if (segment === '..') {
      resolvedPathSegments.pop();
      if (!resolvedPathSegments.length) {
        resolvedPathSegments.push('');
      }
    } else if (segment !== '.') {
      resolvedPathSegments.push(segment);
    }
  }

  return resolvedPathSegments.join('/');
}

export function calculateSize(node: VFSNode): VFSNode {
  const MB = 1048576;
  const K = 1024;
  let size = '';
  if (node.type === 'dir') {
    size = '-';
  } else if (node.content.length > MB) {
    size = `${Math.round((node.content.length / MB) * 10) / 10}M`;
  } else if (node.content.length > K) {
    size = `${Math.round((node.content.length / K) * 10) / 10}k`;
  } else {
    size = `${Math.round(node.content.length * 10) / 10}B`;
  }

  return {
    ...node,
    size,
  };
}

export function trimTrailingSlashes(path: string): string {
  return path.replace(/\/+$/, '');
}

export function removeContent(node: VFSNode): Omit<VFSNode, 'content'> {
  const { content, ...data } = node;
  return data;
}

export function prependDotsDirectories(
  path: string,
  nodes: Omit<VFSNode, 'content'>[],
): Omit<VFSNode, 'content'>[] {
  const dotsDirectories: Omit<VFSNode, 'content'>[] = [
    { type: 'dir', name: '.', root: '.' },
  ];

  if (path.split('/').length > 1) {
    dotsDirectories.push({ type: 'dir', name: '..', root: '.' });
  }

  return dotsDirectories.concat(nodes);
}

export function throwAccesDeniedError(): void {
  throw new Error("You don't have permissions to list this directory.");
}

export function throwNoSuchFileOrDirectoryError(path: string): void {
  throw new Error(`"${path}" No such file or directory (os error 2)`);
}
