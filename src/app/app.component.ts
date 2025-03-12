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
  public readonly version = 'v1.5.0';

  @ViewChild('terminal', { static: false })
  private readonly terminalElementRef!: ElementRef;

  public ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.terminalElementRef) {
      this.terminalElementRef.nativeElement.scrollTop =
        this.terminalElementRef.nativeElement.scrollHeight;
      //this.terminalElementRef.nativeElement.scrollTo({
      //  top: this.terminalElementRef.nativeElement.scrollHeight,
      //  behavior: 'smooth',
      //});
    }
  }
}
