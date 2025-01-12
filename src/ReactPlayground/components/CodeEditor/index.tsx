import Editor from './Editor';
import FileNameList from './FileNameList';

export default function CodeEditor() {
  const file = {
    name: 'test.tsx',
    value: 'import lodash from "lodash";\n\nconst a = <div>test</div>',
    language: 'typescript',
  };

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
