import { Component, ViewChild } from '@angular/core';
import { TerminalCommandsService } from '../../services/terminal-commands.service';
import { CommandOutput } from '../../terminal.types';
import { TerminalOutputComponent } from '../terminal-output/terminal-output.component';

@Component({
  selector: 'app-terminal-view',
  templateUrl: './terminal-view.component.html',
  styleUrls: ['./terminal-view.component.scss'],
})
export class TerminalViewComponent {
  @ViewChild(TerminalOutputComponent)
  private readonly terminalHistory!: TerminalOutputComponent;

  constructor(private readonly commandsHandler: TerminalCommandsService) {}

  public ngAfterViewInit(): void {
    this.commandsHandler.commandOutput$.subscribe((value: CommandOutput) => {
      this.terminalHistory.add(value);
    });
  }

  public promptInputHandler(value: string): void {
    this.commandsHandler.handlePromptInput(value);
  }
}
