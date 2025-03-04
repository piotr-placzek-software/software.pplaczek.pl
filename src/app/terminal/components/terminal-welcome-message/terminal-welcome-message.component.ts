import { Component } from '@angular/core';

@Component({
  templateUrl: './terminal-welcome-message.component.html',
  styleUrl: './terminal-welcome-message.component.scss',
})
export class TerminalWelcomeMessageComponent {
  //  public readonly splash = `
  //  ___  _ ____ ___ ____    ___  _    ____ ____ ___  ____ _  _
  //|__] | |  |  |  |__/    |__] |    |__| |      /  |___ |_/
  // |    | |__|  |  |  \\    |    |___ |  | |___  /__ |___ | \\_
  //
  //____ ____ ____ ___ _ _ _ ____ ____ ____
  //[__  |  | |___  |  | | | |__| |__/ |___
  //___] |__| |     |  |_|_| |  | |  \\ |___
  //
  //    `;

  public readonly adnotations = [
    "Type 'help' to see list fo available commands",
  ];
}
