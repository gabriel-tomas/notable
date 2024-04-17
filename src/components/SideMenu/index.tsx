import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import {
  GoChevronRight,
  GoChevronLeft,
  GoChevronUp,
  GoPlus,
  GoTrash,
} from 'react-icons/go';
import { nanoid } from 'nanoid';

import * as pagesActions from '../../store/modules/pages/actions';
import * as currentPageIDActions from '../../store/modules/currentPageID/actions';

import {
  /* handleOpenPages, */
  handleOpenNav,
  handleCloseNav,
  handleClosePages,
  handleTogglePages,
  handleToggleSearch,
} from '../../utils/eventHandlers/handlesSideMenu';

import specialCharactersChange from '../../utils/specialCharactersChange';

import { GlobalState } from '../../store/modules/interfaces';
import { DispatcherProtocol, BtnNavProtocol } from './interfaces';
import { PagePayload } from '../../store/modules/pages/interfaces';

import './styles/nav.css';
import './styles/pages.css';
import './styles/search.css';

const stopPropagation = <T extends React.SyntheticEvent>(e: T) => {
  e.stopPropagation();
};

const BtnNav = (props: BtnNavProtocol): JSX.Element => (
  <button className={props.className} onClick={props.handleFunc}>
    {props.textInside ? props.textInside : null}
    <props.ArrowComponent />
  </button>
);

const Header = () => {
  return (
    <header>
      <h1>Minhas páginas</h1>
      <BtnNav
        className="btn-close-menu"
        handleFunc={handleClosePages}
        ArrowComponent={GoChevronLeft}
      />
    </header>
  );
};

const BtnNavOpen = (props: DispatcherProtocol) => {
  return (
    <button
      className="btn-open-nav"
      onClick={() => handleOpenNav(props.dispatcher)}
    >
      <GoChevronUp />
    </button>
  );
};

const handleChangePage = (dispatcher: DispatcherProtocol, id: string) => {
  dispatcher.dispatcher(currentPageIDActions.setCurrentPageID({ id }));
  handleClosePages();
  setTimeout(() => handleCloseNav(dispatcher.dispatcher), 0);
};

const PagesBox = (props: DispatcherProtocol) => {
  const pages = useSelector((state: GlobalState) => state.pages.pages);
  const currentPageID = useSelector(
    (state: GlobalState) => state.currentPageID.currentPageID,
  );

  const handleCreateNewPage = () => {
    const id = nanoid();
    const content = {};
    props.dispatcher(pagesActions.setCreateNewPage({ id, content }));
  };

  const handleDeletePage = (id: string) => {
    props.dispatcher(pagesActions.deletePage({ id }));
    if (currentPageID === id) {
      props.dispatcher(
        currentPageIDActions.setCurrentPageID({ id: pages[0].id }),
      );
    }
  };

  return (
    <div id="pages">
      <Header />
      <div className="users-pages">
        <button className="btn-create-page" onClick={handleCreateNewPage}>
          Criar nova página <GoPlus />
        </button>
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() =>
              handleChangePage({ dispatcher: props.dispatcher }, page.id)
            }
          >
            <span className="page-name">
              {specialCharactersChange(
                get(page, 'content.blocks[0].data.text', null),
              ) || 'Untitled'}
            </span>
            <span
              onClick={(e) => {
                stopPropagation(e);
                handleDeletePage(page.id);
              }}
              className="btn-delete-page"
            >
              <GoTrash />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const SearchBox = (props: DispatcherProtocol) => {
  const pages = useSelector((state: GlobalState) => state.pages.pages);
  const navOpen = useSelector((state: GlobalState) => state.nav.navIsOpened);

  const [results, setResults] = useState<PagePayload[]>([]);

  const [inputSearchValue, setInputSearchValue] = useState('');

  useEffect(() => {
    if (!navOpen) return;
    if (results.length !== 0) {
      setResults([]);
    }
    if (inputSearchValue) {
      setInputSearchValue('');
    }
  }, [navOpen]);

  useEffect(() => {
    if (!inputSearchValue) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      const newResults: PagePayload[] = [];
      pages.forEach((page) => {
        if (
          get(page, 'content.blocks[0].data.text', 'Untitled').match(
            new RegExp(`${inputSearchValue}`, 'i'),
          )
        ) {
          newResults.push(page);
        }
      });
      setResults(newResults);
    }, 0);

    return () => clearTimeout(delayDebounceFn);
  }, [inputSearchValue]);

  const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputSearchValue(value);
  };

  return (
    <div id="search">
      <div className="results">
        {results.length > 0 ? (
          results.map((page) => (
            <button
              className="result-btn"
              key={page.id}
              onClick={() =>
                handleChangePage({ dispatcher: props.dispatcher }, page.id)
              }
            >
              <span className="page-name">
                {specialCharactersChange(
                  get(page, 'content.blocks[0].data.text', null),
                ) || 'Untitled'}
              </span>
            </button>
          ))
        ) : (
          <div className="container-not-found">
            <span className="not-found">
              Página(s) não encontrada(s). Tente buscar.
            </span>
          </div>
        )}
      </div>
      <input
        id="input-search"
        type="text"
        placeholder="Pesquisar"
        value={inputSearchValue}
        onChange={handleInputSearchChange}
      />
    </div>
  );
};

export default function SideMenu() {
  const dispatch = useDispatch();

  return (
    <>
      <BtnNavOpen dispatcher={dispatch} />
      <div
        className="main-nav"
        onMouseOver={() => handleOpenNav(dispatch)}
        onClick={() => handleOpenNav(dispatch)}
      >
        <PagesBox dispatcher={dispatch} />
        <SearchBox dispatcher={dispatch} />
        <div className="container-navs-btn">
          <BtnNav
            className="btn-nav"
            textInside="pages"
            handleFunc={handleTogglePages}
            ArrowComponent={GoChevronRight}
          />
          <BtnNav
            className="btn-nav"
            textInside="buscar"
            handleFunc={handleToggleSearch}
            ArrowComponent={GoChevronRight}
          />
          <BtnNav
            className="btn-nav"
            textInside="sobre"
            handleFunc={() => {}}
            ArrowComponent={GoChevronRight}
          />
        </div>
      </div>
    </>
  );
}
