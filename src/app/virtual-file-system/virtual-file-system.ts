import { VFSNode } from './virtual-file-system.types';
import { aboutMeVirtualFileContent } from './virtual-files/aboutme.md';
import { chessgrowVirtualFileContent } from './virtual-files/chessgrow.md';
import { contactVirtualFileContent } from './virtual-files/contact.md';
import { ekm3VirtualFileContent } from './virtual-files/ekm3.md';
import { fenixVirtualFileContent } from './virtual-files/fenix.md';
import { fpvCalcVirtualFileContent } from './virtual-files/fpv-calc.md';
import { platformaVirtualFileContent } from './virtual-files/platforma.md';
import { smartflowVirtualFileContent } from './virtual-files/smartflow.md';

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
    type: 'file',
    name: 'contact.md',
    format: 'markdown',
    content: contactVirtualFileContent,
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
    content: fpvCalcVirtualFileContent,
  },
  {
    root: '/home/guest/projects',
    type: 'file',
    name: 'fenix.md',
    format: 'markdown',
    content: fenixVirtualFileContent,
  },
  {
    root: '/home/guest/projects',
    type: 'file',
    name: 'platforma.md',
    format: 'markdown',
    content: platformaVirtualFileContent,
  },
  {
    root: '/home/guest/projects',
    type: 'file',
    name: 'chessgrow.md',
    format: 'markdown',
    content: chessgrowVirtualFileContent,
  },
  {
    root: '/home/guest/projects',
    type: 'file',
    name: 'smartflow.md',
    format: 'markdown',
    content: smartflowVirtualFileContent,
  },
  {
    root: '/home/guest/projects',
    type: 'file',
    name: 'ekm3.md',
    format: 'markdown',
    content: ekm3VirtualFileContent,
  },
];
