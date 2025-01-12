import MonacoEditor, { OnMount } from '@monaco-editor/react';

export default function Editor() {
  const code = `export default function App() {
    return <div>xxx</div>
}
    `;

  /**
   * 编辑器挂载后的回调函数
   */
  const handleEditorMount: OnMount = (editor, monaco) => {
    // 绑定编辑器的快捷键
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      // cmd + j 格式化代码
      editor.getAction('editor.action.formatDocument')?.run();
    });

    // 设置编辑器的语法配置
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      /**
       * 解决无法识别 jsx 语法的问题，
       * 这里设置 jsx 为 preserve，也就是输入 <div> 输出 <div>，保留原样，
       * 如果设置为 react 会输出 React.createElement("div")
       */
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true, // 解决默认导入和命名空间导入之间的一致性问题
    });
  };

  return (
    <MonacoEditor
      height='100%'
      path={'test.tsx'}
      language={'typescript'}
      onMount={handleEditorMount}
      value={code}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false, // 到最后一行之后是否依然可以滚动一屏
        minimap: {
          enabled: false, // 关闭缩略图
        },
        scrollbar: {
          // 滚动条设置
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
      }}
    />
  );
}
