import { NgModule } from '@angular/core';
import { TerminalPromptComponent } from './components/terminal-prompt/terminal-prompt.component';
import { TerminalViewComponent } from './components/terminal-view/terminal-view.component';
import { CommonModule } from '@angular/common';
import { TerminalSimpleOutputComponent } from './components/teminal-simple-output/terminal-simple-output.component';
import { TerminalCommandsHistoryService } from './services/terminal-commands-history.service';
import { TerminalCommandsService } from './services/terminal-commands.service';
import { TerminalCommandInputComponent } from './components/terminal-command-input/terminal-command-input.component';
import { TerminalOutputComponent } from './components/terminal-output/terminal-output.component';
import { TerminalOutputService } from './services/terminal-output.service';
import {
  providers as CommandsServices,
  SupportedTerminalCommandsService,
} from './commands/terminal-command';
import { TerminalWelcomeMessageComponent } from './components/terminal-welcome-message/terminal-welcome-message.component';
import { TerminalTableOutputComponent } from './components/terminal-table-output/terminal-table-output.component';
import { VirtualFileSystemModule } from '../virtual-file-system/virtual-file-system.module';
import { TerminalComplexOutputComponent } from './components/terminal-complex-output/terminal-complex-output.component';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';

@NgModule({
  declarations: [
    TerminalOutputComponent,
    TerminalPromptComponent,
    TerminalCommandInputComponent,
    TerminalViewComponent,
    TerminalWelcomeMessageComponent,
    TerminalSimpleOutputComponent,
    TerminalTableOutputComponent,
    TerminalComplexOutputComponent,
  ],
  imports: [CommonModule, VirtualFileSystemModule, MarkdownModule.forChild()],
  providers: [
    TerminalCommandsHistoryService,
    TerminalOutputService,
    TerminalCommandsService,
    SupportedTerminalCommandsService,
    ...CommandsServices,
  ],
  exports: [TerminalViewComponent],
})
export class TerminalModule {}
