import {
  AfterViewChecked,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewChecked {
  title = 'software.pplaczek.pl';

  @ViewChild('terminal', { static: false })
  private readonly terminalElementRef!: ElementRef;

  public ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.terminalElementRef) {
      this.terminalElementRef.nativeElement.scrollTop =
        this.terminalElementRef.nativeElement.scrollHeight;
    }
  }
}
