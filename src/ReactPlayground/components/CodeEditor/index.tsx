import { useContext } from 'react';
import { PlaygroundContext } from '@/ReactPlayground/PlaygroundContext';
import Editor from './Editor';
import FileNameList from './FileNameList';

export default function CodeEditor() {
    const { 
        files, 
        setFiles, 
        selectedFileName, 
        setSelectedFileName
    } = useContext(PlaygroundContext)
    
    const file = files[selectedFileName];

  function onEditorChange(...args: unknown[]) {
    console.log(...args);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <FileNameList />
      <Editor file={file} onChange={onEditorChange} />
    </div>
  );
}
