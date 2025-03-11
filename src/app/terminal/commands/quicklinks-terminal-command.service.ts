import { Injectable } from '@angular/core';
import { TerminalCommand } from './terminal-command';
import {
  Command,
  CommandArguments,
  CommandOutput,
  SimpleCommandOutput,
  TableCommandOutput,
} from '../terminal.types';

@Injectable()
export class QuicklinksTerminalCommandService implements TerminalCommand {
  public readonly command: Command = {
    name: 'open',
    desc: 'Quicklinks: open quick link in new window',
    func: (argv: CommandArguments): CommandOutput => {
      const cmd = { cmd: this.command.name, argv };
      if (argv.includes('-h') || argv.includes('--help')) {
        return new TableCommandOutput(cmd, [
          ['Usage:', 'open <option>'],
          ['OPTIONS:', ''],
          ['fpvcalc', 'Open fpv-construction-helper app'],
          [
            'github',
            "Open GitHub repositories page (use '-p' for for non-organization repositories)",
          ],
          ['linkedin', 'Open LinkedIn profile'],
        ]);
      }

      let url = '';

      switch (argv[0]) {
        case 'fpvcalc':
          url =
            'https://piotr-placzek-software.github.io/fpv-construction-helper/';
          break;
        case 'github':
          url =
            argv[1] === '-p'
              ? 'https://github.com/piotr-placzek?tab=repositories'
              : 'https://github.com/orgs/piotr-placzek-software/repositories';
          break;
        case 'linkedin':
          url = 'https://www.linkedin.com/in/piotrplaczek/';
          break;

        default:
          return new SimpleCommandOutput(
            cmd,
            "open: Use '-h' switch for getting available options",
          );
      }
      window.open(url, '_blank');
      return new SimpleCommandOutput(cmd, `Opening ${url}`);
    },
  };
}
