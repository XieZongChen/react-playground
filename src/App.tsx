import { transform } from '@babel/standalone';
import type { PluginObj } from '@babel/core';

function App() {
  const code1 = `
    function add(a, b) {
        return a + b;
    }
    export { add };
    `;

  /**
   * import 的 url 可以用 blob url
   * 所以这里通过 Bob 和 URL.createObjectURL 的方式把 import 的文件内容变为一个 blob url
   */
  const url = URL.createObjectURL(
    new Blob([code1], { type: 'application/javascript' })
  );

  const transformImportSourcePlugin: PluginObj = {
    visitor: {
      ImportDeclaration(path) {
        // 在 Ast 时，将 import 的路径换成生成的 blob url
        path.node.source.value = url;
      },
    },
  };

  const code = `import { add } from './add.ts'; console.log(add(2, 3));`;

  function onClick() {
    const res = transform(code, {
      presets: ['react', 'typescript'],
      filename: 'test.ts',
      plugins: [transformImportSourcePlugin],
    });
    console.log(res.code);
  }

  return (
    <div>
      <button onClick={onClick}>编译</button>
    </div>
  );
}

export default App;
