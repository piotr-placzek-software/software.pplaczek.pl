import { VFSNode } from './virtual-file-system.types';
import { aboutMeVirtualFileContent } from './virtual-files/aboutme.md';

export const vfs: ReadonlyArray<VFSNode> = [
  {
    root: '/home/guest',
    type: 'file',
    name: 'aboutme.md',
    format: 'markdown',
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
    format: 'markdown',
    content: '# FPV Calc',
  },
  {
    root: '/home/guest/projects',
    type: 'file',
    name: 'fenix.md',
    format: 'markdown',
    content: '# Fenix',
  },
  {
    root: '/home/guest/projects',
    type: 'file',
    name: 'platforma.md',
    format: 'markdown',
    content: '# Plaforma',
  },
  {
    root: '/home/guest/projects',
    type: 'file',
    name: 'chessgrow.md',
    format: 'markdown',
    content: '# ChessGrow',
  },
  {
    root: '/home/guest/projects',
    type: 'file',
    name: 'smartflow.md',
    format: 'markdown',
    content: '# SmartFlow',
  },
  {
    root: '/home/guest/projects',
    type: 'file',
    name: 'ekm3.md',
    format: 'markdown',
    content: '# EKM (3) Smart',
  },
];
