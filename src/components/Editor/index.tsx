/* import { useEffect, useState } from 'react'; */
'strict';
import { useSelector, useDispatch } from 'react-redux';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import { useEffect, useState } from 'react';

import * as pagesActions from '../../store/modules/pages/actions';

import { FirstStart } from '../../hooks/firstStart';

import { handleCloseNav } from '../../utils/eventHandlers/handlesSideMenu';

import { GlobalState } from '../../store/modules/interfaces';
import { ArticleDataProtocol } from '../../store/modules/pages/interfaces';

import './style.css';

function App() {
  const dispatch = useDispatch();

  const [editor, setEditor] = useState<EditorJS | null>(null);
  const [currentPageContent, setCurrentPageContent] = useState<
    null | object | ArticleDataProtocol
  >(null);
  const [, /* userIsTyping */ setUserIsTyping] = useState(false);
  const [timeNotTyping, setTimeNotTyping] = useState<number | null>(null);
  const pages = useSelector((state: GlobalState) => state.pages.pages);
  const currentPageID = useSelector(
    (state: GlobalState) => state.currentPageID.currentPageID,
  );
  const [contentSeted, setContentSeted] = useState(false);
  const [contentUpdated, setContentUpdated] = useState(false);

  FirstStart(pages, setCurrentPageContent);

  const setCurrentContent = (contentUpdate?: boolean) => {
    const currentContent = pages.find(
      (page) => page.id === currentPageID,
    )?.content;

    if (currentContent) {
      setCurrentPageContent(currentContent);
      setContentSeted(true);
      contentUpdate && setContentUpdated(true);
    } else {
      setCurrentPageContent({});
      setContentSeted(true);
      contentUpdate && setContentUpdated(true);
    }
  };

  useEffect(() => {
    setCurrentContent(true);
  }, [currentPageID]);

  useEffect(() => {
    setCurrentContent();
  }, [pages]);

  /*   console.log(currentPageID, currentPageContent); */

  useEffect(() => {
    if (!currentPageID) return;
    if (!contentSeted) return;
    if (
      !editor &&
      currentPageContent &&
      Object.keys(currentPageContent).length > 0
    ) {
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
    } else if (
      !editor &&
      currentPageContent &&
      Object.keys(currentPageContent).length === 0
    ) {
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
  }, [contentSeted, currentPageID, editor]);

  useEffect(() => {
    if (
      contentUpdated &&
      currentPageContent &&
      Object.keys(currentPageContent).length > 0
    ) {
      editor?.render(currentPageContent as ArticleDataProtocol);
      setContentUpdated(false);
    } else if (
      contentUpdated &&
      currentPageContent &&
      Object.keys(currentPageContent).length === 0
    ) {
      editor?.clear();
      setContentUpdated(false);
    }
  }, [contentUpdated]);

  const handleSave = () => {
    if (editor) {
      editor
        .save()
        .then((outputData) => {
          if (!currentPageID) {
            console.log("there's not ID");
            return;
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
    currentPageID && (
      <div
        id="editor"
        className={`main-editor`}
        onInput={handleInputChanging}
        onMouseDown={handleInputChanging}
        onKeyUp={handleInputChanging}
        onFocus={handleCloseNav}
        onTouchStart={handleCloseNav}
      >
        {/* <button onClick={handleSave}>salvar</button> */}
      </div>
    )
  );
}

export default App;
