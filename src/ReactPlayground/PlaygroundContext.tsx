import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { compress, fileName2Language, uncompress } from './utils';
import { initFiles } from './files';

export interface File {
  name: string;
  value: string;
  language: string;
}

export interface Files {
  [key: string]: File;
}

export type Theme = 'light' | 'dark';

export interface PlaygroundContext {
  files: Files; // 文件信息
  selectedFileName: string; // 当前选择的文件
  theme: Theme; // 主题
  setTheme: (theme: Theme) => void;
  setSelectedFileName: (fileName: string) => void;
  setFiles: (files: Files) => void;
  addFile: (fileName: string) => void;
  removeFile: (fileName: string) => void;
  updateFileName: (oldFieldName: string, newFieldName: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const PlaygroundContext = createContext<PlaygroundContext>({
  selectedFileName: 'App.tsx',
} as PlaygroundContext);

const getFilesFromUrl = () => {
  let files: Files | undefined;
  try {
    const hash = uncompress(window.location.hash.slice(1));
    files = JSON.parse(hash);
  } catch (error) {
    console.error(error);
  }
  return files;
};

export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [files, setFiles] = useState<Files>(getFilesFromUrl() || initFiles);
  const [selectedFileName, setSelectedFileName] = useState('App.tsx');
  const [theme, setTheme] = useState<Theme>('light');

  const addFile = (name: string) => {
    files[name] = {
      name,
      language: fileName2Language(name),
      value: '',
    };
    setFiles({ ...files });
  };

  const removeFile = (name: string) => {
    delete files[name];
    setFiles({ ...files });
  };

  const updateFileName = (oldFieldName: string, newFieldName: string) => {
    if (
      !files[oldFieldName] ||
      newFieldName === undefined ||
      newFieldName === null
    )
      return;
    const { [oldFieldName]: value, ...rest } = files;
    const newFile = {
      [newFieldName]: {
        ...value,
        language: fileName2Language(newFieldName),
        name: newFieldName,
      },
    };
    setFiles({
      ...rest,
      ...newFile,
    });
  };

  useEffect(() => {
    const hash = compress(JSON.stringify(files));
    window.location.hash = hash;
  }, [files]);

  return (
    <PlaygroundContext.Provider
      value={{
        files,
        selectedFileName,
        theme,
        setTheme,
        setSelectedFileName,
        setFiles,
        addFile,
        removeFile,
        updateFileName,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
};
