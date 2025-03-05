export const SupportedCommandOutputTypes = [
  'clear',
  'simple',
  'print-file',
  'help',
  'reset',
] as const;

export type CommandOutputType = (typeof SupportedCommandOutputTypes)[number];

export type CommandOutput<T = any> = {
  type: CommandOutputType;
  command: CommandSrc;
  data: T;
};

type CommandSrc = {
  cmd: string;
  argv: CommandArguments;
};

export type CommandArguments = string[];

export interface Command {
  name: string;
  desc: string;
  func: CommandHandlerFn;
}

export type CommandHandlerFn = (argv: CommandArguments) => CommandOutput;

export class ClearCommandOutput implements CommandOutput<undefined> {
  public readonly type = 'clear';
  public readonly data = undefined;
  public readonly command = { cmd: 'clear', argv: [] };
}

export type CommandSimpleOutputDataType = string;
export class SimpleCommandOutput
  implements CommandOutput<CommandSimpleOutputDataType>
{
  public readonly type = 'simple';
  constructor(
    public readonly command: CommandSrc,
    public readonly data: CommandSimpleOutputDataType,
  ) {}
}

export type CommandTableOutputDataType = string[][];
export class TableCommandOutput
  implements CommandOutput<CommandTableOutputDataType>
{
  public readonly type = 'help';
  constructor(
    public readonly command: CommandSrc,
    public readonly data: CommandTableOutputDataType,
  ) {}
}

export class ResetCommandOutput implements CommandOutput<undefined> {
  public readonly type = 'reset';
  public readonly data = undefined;
  public readonly command = { cmd: 'reset', argv: [] };
}

export type PrintFileCommandOutputDataType = {
  content: string;
  format: 'plain' | 'markdown';
  rich: boolean;
};
export class PrintFileCommandOutput
  implements CommandOutput<PrintFileCommandOutputDataType>
{
  public readonly type = 'print-file';
  constructor(
    public readonly command: CommandSrc,
    public readonly data: PrintFileCommandOutputDataType,
  ) {}
}
