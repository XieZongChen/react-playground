import { strFromU8, strToU8, unzlibSync, zlibSync } from 'fflate';

/**
 * 通过文件名获取到文件的语言类型
 */
export const fileName2Language = (name: string) => {
  const suffix = name.split('.').pop() || '';
  if (['js', 'jsx'].includes(suffix)) return 'javascript';
  if (['ts', 'tsx'].includes(suffix)) return 'typescript';
  if (['json'].includes(suffix)) return 'json';
  if (['css'].includes(suffix)) return 'css';
  return 'javascript';
};

export function compress(data: string): string {
  const buffer = strToU8(data);
  const zipped = zlibSync(buffer, { level: 9 });
  const str = strFromU8(zipped, true);
  // 将 ASC 码转换为 base64
  return btoa(str);
}

export function uncompress(base64: string): string {
  // 将 base64 转换为 ASC 码
  const binary = atob(base64);

  const buffer = strToU8(binary, true);
  const unzipped = unzlibSync(buffer);
  return strFromU8(unzipped);
}
