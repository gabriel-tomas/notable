/* import { useEffect, useState } from 'react'; */
'strict';
import { useSelector, useDispatch } from 'react-redux';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import { useEffect, useState } from 'react';

import * as pagesActions from '../../store/modules/pages/actions';

import { FirstStart } from '../../hooks/firstStart';

import { GlobalState } from '../../store/modules/interfaces';
import { ArticleDataProtocol } from '../../store/modules/pages/interfaces';

import './style.css';

function App() {
  const dispatch = useDispatch();

  const menuIsOpen = useSelector(
    (state: GlobalState) => state.menu.menuIsOpened,
  );
  const [editor, setEditor] = useState<EditorJS | null>(null);
  const [currentPageID, setCurrentPageId] = useState('');
  const [currentPageContent, setCurrentPageContent] = useState({});
  const [userIsTyping, setUserIsTyping] = useState(false);
  const [timeNotTyping, setTimeNotTyping] = useState<number | null>(null);
  const pages = useSelector((state: GlobalState) => state.pages.pages);

  FirstStart(pages, setCurrentPageId, setCurrentPageContent);

  useEffect(() => {
    if (pages.length === 1) {
      setCurrentPageId(pages[0].id);
      setCurrentPageContent(pages[0].content);
    }
  }, [pages]);

  useEffect(() => {
    if (!currentPageID) return;
    /*     console.log(editor); */
    if (!editor && Object.keys(currentPageContent).length > 0) {
      setEditor(
        new EditorJS({
          holder: 'editor',
          placeholder: 'type / for commands',
          tools: {
            header: Header,
          },
          data: currentPageContent as ArticleDataProtocol,
        }),
      );
    } else if (!editor && Object.keys(currentPageContent).length === 0) {
      setEditor(
        new EditorJS({
          holder: 'editor',
          placeholder: 'type / for commands',
          tools: {
            header: Header,
          },
        }),
      );
    }

    /* console.log(currentPageID, currentPageContent); */

    return () => {
      editor && editor.destroy();
    };
  }, [currentPageID, editor]);

  const handleSave = () => {
    if (editor) {
      editor
        .save()
        .then((outputData) => {
          if (!currentPageID) {
            console.log("there's not ID");
          }
          dispatch(
            pagesActions.setUpdatePageContent({
              id: currentPageID,
              content: outputData,
            }),
          );
        })
        .catch((error) => {
          console.log('Saving failed: ', error);
        });
    }
  };

  const doneTyping = () => {
    setUserIsTyping(false);
    setTimeNotTyping(null);
    handleSave();
  };

  const handleInputChanging = () => {
    setUserIsTyping(true);

    if (timeNotTyping) {
      clearTimeout(timeNotTyping);
    }

    setTimeNotTyping(setTimeout(doneTyping, 400));
  };

  return (
    <div
      id="editor"
      className={`main-editor ${menuIsOpen ? 'menu-opened' : ''}`}
      onInput={handleInputChanging}
    >
      {/* <button onClick={handleSave}>salvar</button> */}
    </div>
  );
}

export default App;
