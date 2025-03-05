import { Injectable, Type, ViewContainerRef } from '@angular/core';
import { CommandArguments, CommandOutput } from '../terminal.types';
import { TerminalSimpleOutputComponent } from '../components/teminal-simple-output/terminal-simple-output.component';
import { TerminalPromptComponent } from '../components/terminal-prompt/terminal-prompt.component';
import { TerminalTableOutputComponent } from '../components/terminal-table-output/terminal-table-output.component';
import { VirtualFileSystemService } from '../../virtual-file-system/services/virtual-file-system.service';
import { TerminalComplexOutputComponent } from '../components/terminal-complex-output/terminal-complex-output.component';

type TerminalOutputComponent =
  | TerminalSimpleOutputComponent
  | TerminalTableOutputComponent
  | TerminalComplexOutputComponent;

@Injectable()
export class TerminalOutputService {
  constructor(private readonly virtualFileSystem: VirtualFileSystemService) {}

  public createComponent(
    container: ViewContainerRef,
    data: CommandOutput,
  ): void {
    if (!container) return;

    this.createPromptWithStaticCommand(
      container,
      data.command.cmd,
      data.command.argv,
    );
    this.createComponentByType(container, data.type, data.data);
  }

  private createPromptWithStaticCommand(
    container: ViewContainerRef,
    cmd: string,
    argv: CommandArguments,
  ): void {
    const componentRef = container.createComponent(TerminalPromptComponent);

    Object.assign(componentRef.instance, {
      workingDirectory: this.virtualFileSystem.workingDirectory,
      staticValue: `${cmd} ${argv.join(' ')}`,
    });
  }

  private createComponentByType<T extends CommandOutput>(
    container: ViewContainerRef,
    type: T['type'],
    data: T['data'],
  ): void {
    switch (type) {
      case 'simple':
        this.createOutputComponent(
          container,
          TerminalSimpleOutputComponent,
          data,
        );
        break;

      case 'print-file':
        this.createOutputComponent(
          container,
          TerminalComplexOutputComponent,
          data,
        );
        break;

      case 'help':
        this.createOutputComponent(
          container,
          TerminalTableOutputComponent,
          data,
        );
        break;

      default:
        break;
    }
  }

  private createOutputComponent<T extends TerminalOutputComponent>(
    container: ViewContainerRef,
    component: Type<T>,
    data: T['data'],
  ): void {
    container.createComponent(component).instance.data = data;
  }
}
