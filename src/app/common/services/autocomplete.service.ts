import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutocopleteService {
  private commands: string[] = [];
  private fsTree: string[] = [];

  public setCommandsNames(commands: string[]): void {
    console.debug(commands);
    this.commands = commands;
  }

  public setFileSystemTree(paths: string[]): void {
    console.debug(paths);
    this.fsTree = paths;
  }

  public autocomplete(input: string, currentPath: string): string {
    const command = input.split(' ')[0];
    const path = input.split(' ')[1] || '';
    if (path.length) {
      return [command, this.autocompletePath(path, currentPath)].join(' ');
    }
    return this.autocompleteCommand(command);
  }

  private autocompletePath(pathPart: string, currentPath: string): string {
    function resolvePath(pathPart: string, currentPath: string): string {
      if (pathPart.startsWith('/')) return pathPart;
      const stack = currentPath.split('/').filter(Boolean);
      for (const part of pathPart.split('/')) {
        if (part === '.' || part === '') continue;
        if (part === '..') stack.pop();
        else stack.push(part);
      }
      return '/' + stack.join('/');
    }

    const resolvedPath = resolvePath(pathPart, currentPath);
    const matches = this.fsTree.filter((entry) =>
      entry.startsWith(resolvedPath),
    );

    if (matches.length === 0) return pathPart;
    if (matches.length === 1) return matches[0];

    const isDirectory = (path: string) =>
      this.fsTree.some(
        (entry: string) => entry.startsWith(path + '/') || entry === path,
      );

    if (isDirectory(resolvedPath)) return resolvedPath;

    const commonPrefix = matches.reduce((prefix, entry) => {
      let i = 0;
      while (i < prefix.length && i < entry.length && prefix[i] === entry[i]) {
        i++;
      }
      return prefix.slice(0, i);
    }, matches[0]);

    return commonPrefix;
  }

  private autocompleteCommand(commandPart: string): string {
    const availableCommands = this.commands.filter((command: string): boolean =>
      command.startsWith(commandPart),
    );
    return availableCommands.length === 1 ? availableCommands[0] : commandPart;
  }
}
