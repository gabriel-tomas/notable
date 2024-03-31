/* import { useEffect, useState } from 'react'; */
'strict';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import { useEffect, useState } from 'react';

import './style.css';

function App() {
  const [editor, setEditor] = useState<EditorJS | null>(null);

  useEffect(() => {
    !editor &&
      setEditor(
        new EditorJS({
          holder: 'editor',
          placeholder: 'type / for commands',
          tools: {
            header: Header,
          },
        }),
      );

    return () => {
      editor && editor.destroy();
    };
  }, [editor]);

  return <div id="editor" className="main-editor"></div>;
}

export default App;
