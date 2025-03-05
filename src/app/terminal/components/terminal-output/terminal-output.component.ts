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
    switch (data.type) {
      case 'clear':
        this.clear();
        break;

      case 'reset':
        this.clear();
        this.container.createComponent(TerminalWelcomeMessageComponent);
        break;

      default:
        this.service.createComponent(this.container, data);
        break;
    }
  }

  public clear(): void {
    this.container.clear();
  }
}
