import { VFSNode } from './virtual-file-system.types';
import { aboutMeVirtualFileContent } from './virtual-files/aboutme.md';

export const vfs: ReadonlyArray<VFSNode> = [
  {
    root: '/home/guest',
    type: 'file',
    name: 'aboutme.md',
    content: aboutMeVirtualFileContent,
  },
  {
    root: '/home/guest',
    type: 'dir',
    name: 'projects',
  },
  {
    root: '/home/guest/projects',
    type: 'file',
    name: 'fpv-calc.md',
    content: '# FPV Calc',
  },
  {
    root: '/home/guest/projects',
    type: 'file',
    name: 'fenix.md',
    content: '# Fenix',
  },
  {
    root: '/home/guest/projects',
    type: 'file',
    name: 'platforma.md',
    content: '# Plaforma',
  },
  {
    root: '/home/guest/projects',
    type: 'file',
    name: 'chessgrow.md',
    content: '# ChessGrow',
  },
  {
    root: '/home/guest/projects',
    type: 'file',
    name: 'smartflow.md',
    content: '# SmartFlow',
  },
  {
    root: '/home/guest/projects',
    type: 'file',
    name: 'ekm3.md',
    content: '# EKM (3) Smart',
  },
];
