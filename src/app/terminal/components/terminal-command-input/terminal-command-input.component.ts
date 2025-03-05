import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';
import { TerminalCommandsHistoryService } from '../../services/terminal-commands-history.service';
import { VirtualFileSystemService } from '../../../virtual-file-system/services/virtual-file-system.service';

@Component({
  selector: 'app-terminal-command-input',
  templateUrl: './terminal-command-input-component.html',
  styleUrl: './terminal-command-input.component.scss',
})
export class TerminalCommandInputComponent implements AfterViewInit {
  @ViewChild('input') input!: ElementRef;
  @Output() command = new EventEmitter<string>();

  constructor(
    private readonly commandsHistory: TerminalCommandsHistoryService,
    private readonly virtualFileSystem: VirtualFileSystemService,
  ) {}

  get workingDirectory(): string[] {
    return this.virtualFileSystem.currentWorkingDirectory;
  }

  public onKeyDown($event: Event): void {
    const { code, ctrlKey } = $event as KeyboardEvent;
    const srcElement = $event.srcElement! as HTMLInputElement;
    switch (code) {
      case 'Enter':
        this.submitInput(srcElement);
        break;

      case 'Tab':
        $event.preventDefault();
        break;

      case 'ArrowUp':
        srcElement.value = this.commandsHistory.previous();
        break;
      case 'ArrowDown':
        srcElement.value = this.commandsHistory.next();
        break;
      case 'KeyL':
        if (ctrlKey) {
          $event.preventDefault();
          this.command.emit('clear');
        }
        break;

      default:
        break;
    }
  }

  @HostListener('document:click', ['$event'])
  public ngAfterViewInit(): void {
    this.input.nativeElement.focus();
  }

  private submitInput(element: HTMLInputElement): void {
    if (!element.value) {
      return;
    }
    this.commandsHistory.save(element.value);
    this.command.emit(element.value);
    this.clearInput(element);
  }

  private clearInput(element: HTMLInputElement): void {
    element.value = '';
  }
}
