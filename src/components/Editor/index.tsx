/* import { useEffect, useState } from 'react'; */
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

function App() {
  new EditorJS({
    holder: 'editor',
    tools: {
      header: Header,
    },
  });

  return <div id="editor"></div>;
}

export default App;
