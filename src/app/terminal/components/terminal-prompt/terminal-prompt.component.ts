import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-terminal-prompt',
  templateUrl: './terminal-prompt.component.html',
  styleUrl: './terminal-prompt.component.scss',
})
export class TerminalPromptComponent {
  @Input() username = 'guest';
  @Input() hostname = 'software.pplaczek.pl';
  @Input() workingDirectory = ['~'];

  public staticValue = '';
}
