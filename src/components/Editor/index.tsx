/* import { useEffect, useState } from 'react'; */
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import { useEffect, useState } from 'react';

function App() {
  const [editor, setEditor] = useState<EditorJS | null>(null);

  useEffect(() => {
    const editorJs = new EditorJS({
      holder: 'editor',
      tools: {
        header: Header,
      },
    });

    setEditor(editorJs);

    return () => {
      editor && editor.destroy();
    };
  }, []);

  return <div id="editor"></div>;
}

export default App;
