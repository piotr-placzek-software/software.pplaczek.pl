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
        $event.preventDefault();
        srcElement.value = this.commandsHistory.previous();
        this.moveCursorAtEnd(srcElement);
        break;

      case 'ArrowDown':
        srcElement.value = this.commandsHistory.next();
        break;

      case 'KeyA':
        if (ctrlKey) {
          $event.preventDefault();
          this.moveCursorAtStart(srcElement);
        }

        break;

      case 'KeyK':
        if (ctrlKey && srcElement.selectionStart === 0) {
          $event.preventDefault();
          this.clearInput(srcElement);
        }
        break;

      case 'KeyL':
        if (ctrlKey) {
          $event.preventDefault();
          this.command.emit('clear');
        }
        break;

      case 'KeyW':
        if (ctrlKey) {
          $event.preventDefault();
          this.removeWordBeforeCursor(srcElement);
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
    element.value = element.value.trim();
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

  private moveCursorAtStart(element: HTMLInputElement): void {
    element.setSelectionRange(0, 0);
  }

  private moveCursorAtEnd(element: HTMLInputElement): void {
    element.setSelectionRange(element.value.length, element.value.length);
  }

  private removeWordBeforeCursor(element: HTMLInputElement): void {
    const cursorPosition = element.selectionStart!;
    const beforeCursor = element.value.trim().substring(0, cursorPosition);
    const separators = /[\s\/\\.,;:_-]+/;

    let lastSeparatorIndex = -1;
    for (let i = cursorPosition - 1; i > -1; i--) {
      if (separators.test(beforeCursor[i])) {
        lastSeparatorIndex = i;
        break;
      }
    }

    element.value =
      element.value.substring(0, lastSeparatorIndex + 1) +
      element.value.substring(cursorPosition);
    element.setSelectionRange(lastSeparatorIndex + 1, lastSeparatorIndex + 1);
  }
}
