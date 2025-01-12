import MonacoEditor from '@monaco-editor/react';

export default function Editor() {
  const code = `export default function App() {
    return <div>xxx</div>
}
    `;

  return (
    <MonacoEditor
      height='100%'
      path={'test.tsx'}
      language={'typescript'}
      value={code}
    />
  );
}
