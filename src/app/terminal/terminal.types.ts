export const SupportedCommandOutputTypes = ['clear', 'simple', 'help'] as const;

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
