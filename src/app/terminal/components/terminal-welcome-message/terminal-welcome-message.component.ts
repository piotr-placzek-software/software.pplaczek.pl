import { Component } from '@angular/core';

@Component({
  templateUrl: './terminal-welcome-message.component.html',
  styleUrl: './terminal-welcome-message.component.scss',
})
export class TerminalWelcomeMessageComponent {
  public readonly adnotations = [
    'Welcome to Piotr Płaczek Software SP website!',
    '',
    "My name is Piotr and I'm fullstack software engineer.",
    'What can I do for you today?',
    '',
    "Type 'help' to see list of available commands",
    '(or press Shift+/).',
  ];
}
