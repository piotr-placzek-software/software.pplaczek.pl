function dtoa(value: string): string {
  const r = (v: string): string => v.split('').reverse().join('');
  return r(atob(r(value)));
}

export const contactVirtualFileContent = `|-------|---------------------|
| form  | value               |
|-------|---------------------|
| NIP   | ${dtoa('==gN0EjM1AjM2QjM')}          |
| phone | ${dtoa('=gyK0gTK1czM4MzM4QTO')}      |
| email | ${dtoa('==wav5GdhtGdABHcsF2Y6V2auAHb')} |
|-------|---------------------|
`;
