export const VFSErrorType = {
  ACCES_DENIED: 'vfs-access-denied',
  NOT_FOUND: 'vfs-not-found',
  NOT_A_DIRECTORY: 'vfs-not-a-direcotry',
  NOT_A_FILE: 'vfs-not-a-file',
} as const;

export type VFSErrorMessage = (typeof VFSErrorType)[keyof typeof VFSErrorType];

export type VFSError = {
  type: VFSErrorMessage;
  path: string;
};

export class VFSAccesDeniedError implements VFSError {
  public readonly type: VFSErrorMessage = VFSErrorType.ACCES_DENIED;
  constructor(public readonly path: string = '') {}
}

export class VFSNotFoundError implements VFSError {
  public readonly type: VFSErrorMessage = VFSErrorType.NOT_FOUND;
  constructor(public readonly path: string = '') {}
}

export class VFSNotADirectoryError implements VFSError {
  public readonly type: VFSErrorMessage = VFSErrorType.NOT_A_DIRECTORY;
  constructor(public readonly path: string = '') {}
}

export class VFSNotAFileError implements VFSError {
  public readonly type: VFSErrorMessage = VFSErrorType.NOT_A_FILE;
  constructor(public readonly path: string = '') {}
}
