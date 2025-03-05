export type VFSNode = Readonly<VFSNodeDir> | Readonly<VFSNodeFile>;

type VFSNodeBase = {
  root: string;
  name: string;
  size?: string;
  content?: string;
};

export type VFSNodeDir = VFSNodeBase & {
  type: 'dir';
};

export type VFSNodeFile = VFSNodeBase & {
  type: 'file';
  format: 'plain' | 'markdown';
  content: string;
};
