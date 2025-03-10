import { useContext } from 'react';
import { debounce } from 'lodash-es';
import { PlaygroundContext } from '@/ReactPlayground/PlaygroundContext';
import Editor from './Editor';
import FileNameList from './FileNameList';

export default function CodeEditor() {
  const { theme, files, setFiles, selectedFileName } =
    useContext(PlaygroundContext);

  const file = files[selectedFileName];

  function onEditorChange(value?: string) {
    files[file.name].value = value!;
    setFiles({ ...files });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <FileNameList />
      <Editor
        file={file}
        onChange={debounce(onEditorChange, 500)}
        options={{ theme: `vs-${theme}` }}
      />
    </div>
  );
}
