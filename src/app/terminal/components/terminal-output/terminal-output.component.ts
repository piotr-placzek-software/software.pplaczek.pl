import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommandOutput } from '../../terminal.types';
import { TerminalOutputService } from '../../services/terminal-output.service';
import { TerminalWelcomeMessageComponent } from '../terminal-welcome-message/terminal-welcome-message.component';

@Component({
  selector: 'app-terminal-output',
  templateUrl: './terminal-output.component.html',
  styleUrl: './terminal-output.component.scss',
})
export class TerminalOutputComponent implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  private readonly container!: ViewContainerRef;

  constructor(private readonly service: TerminalOutputService) {}

  public ngAfterViewInit(): void {
    this.container.createComponent(TerminalWelcomeMessageComponent);
  }

  public add(data: CommandOutput): void {
    if (data.type === 'clear') {
      this.clear();
    } else {
      this.service.createComponent(this.container, data);
    }
  }

  public clear(): void {
    this.container.clear();
  }
}
