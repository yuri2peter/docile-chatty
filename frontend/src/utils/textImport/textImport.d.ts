// textImport.d.ts

export function importString(cb: (str: string) => void);
export function exportString(str: string, fileName = 'data.txt');
