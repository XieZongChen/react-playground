import { setupTypeAcquisition } from '@typescript/ata';
import typescript from 'typescript';

/**
 * 传入源码，自动分析出需要的 ts 类型包，然后自动下载
 */
export function createATA(
  onDownloadFile: (code: string, path: string) => void // 下载完成后的回调函数
) {
  const ata = setupTypeAcquisition({
    projectName: 'my-ata',
    typescript: typescript,
    logger: console,
    delegate: {
      receivedFile: (code, path) => {
        console.log('自动下载的包', path);
        onDownloadFile(code, path);
      },
    },
  });

  return ata;
}
