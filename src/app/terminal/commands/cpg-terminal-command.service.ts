import { Injectable } from '@angular/core';
import { TerminalCommand } from './terminal-command';
import {
  Command,
  CommandArguments,
  CommandHandlerFn,
  CommandOutput,
  CommandSrc,
  SimpleCommandOutput,
  TableCommandOutput,
} from '../terminal.types';

@Injectable()
export class CpgTerminalCommandService implements TerminalCommand {
  public readonly command: Command = {
    name: 'cpg',
    desc: 'Crack parssword game',
    func: this.commandHandler(),
  };

  private target: string = '';
  private inProggress: boolean = false;

  private commandHandler(): CommandHandlerFn {
    return (argv: CommandArguments): CommandOutput => {
      const cmd: CommandSrc = {
        cmd: this.command.name,
        argv,
      };

      if (argv.includes('-h') || argv.includes('--help')) {
        return this.help(cmd);
      }

      switch (argv[0]) {
        case 'start':
          const length = +argv[argv.indexOf('-l') + 1] || 12;
          const dificulty = +argv[argv.indexOf('-d') + 1] || 6;
          this.generateNewPhrase(length, dificulty - 1);
          this.inProggress = true;
          return new SimpleCommandOutput(cmd, 'Game ready. Good luck!');

        case 'try':
          if (!this.inProggress) {
            return new SimpleCommandOutput(
              cmd,
              `Use ${this.command.name} -h to see instructions`,
            );
          }
          if (argv[1] === this.target) {
            this.inProggress = false;
            return new SimpleCommandOutput(cmd, 'Done. Congratulations!');
          }
          return new SimpleCommandOutput(cmd, this.comparePhrase(argv[1]));

        case 'giveup':
          this.inProggress = false;
          return new SimpleCommandOutput(
            cmd,
            `Too bad, parssword is ${this.target}`,
          );

        default:
          return new SimpleCommandOutput(
            cmd,
            `Use ${this.command.name} -h to see instructions`,
          );
      }
    };
  }

  private help(cmd: CommandSrc): TableCommandOutput {
    return new TableCommandOutput(cmd, [
      ['Usage:', 'cpg <option> [param?]'],
      ['Example:', 'cpg start -l 12 -d 6'],
      ['OPTIONS:', ''],
      ['start', 'Starts new game'],
      ['try <parssword>', 'Try to guess parssword'],
      ['giveup', 'Reveal current parssword'],
      ['PARAMS:', ''],
      ['-l <number>', 'start: set password length (default is 12)'],
      ['-d <number>', 'start: set dificulty (default is 6)'],
      ['DIFICULTY LEVEL:', ''],
      ['1', 'Only numbers'],
      ['2', 'Only lowercase characters'],
      ['3', 'Numbers and lowercase characters'],
      ['4', 'Lowercase and uppercase characters'],
      ['5', 'Numbers and lowercase and uppercase characters'],
      ['6', 'Numbers and lowercase and uppercase and special characters'],
      ['MATCHING TIP MEANING:', ''],
      ['0', 'Password includes given character but at other position'],
      ['1', 'Password includes given character at this same position'],
      ['-', 'Password does not include given character'],
      ['?', 'Missing character (target is longer than tested password)'],
    ]);
  }

  private generateNewPhrase(length: number, dificulty: number): void {
    const charsets = [
      '1234567890',
      'abcdefghijklmnopqrstuvwxyz',
      'abcdefghijklmnopqrstuvwxyz0123456789',
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?',
    ];

    let phrase = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(
        Math.random() * charsets[dificulty].length,
      );
      phrase += `${charsets[dificulty][randomIndex]}`;
    }

    this.target = phrase;
  }

  private comparePhrase(phrase: string): string {
    let match: string[] = new Array(phrase.length);
    for (let i = 0; i < phrase.length; ++i) {
      if (!this.target.includes(phrase[i])) {
        match[i] = '-';
        continue;
      }

      if (this.target.indexOf(phrase[i]) === i) {
        match[i] = '1';
      } else {
        match[i] = '0';
      }
    }

    for (let i = phrase.length; i < this.target.length; ++i) {
      match.push('?');
    }

    return match.join('');
  }
}
