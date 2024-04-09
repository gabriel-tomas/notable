import React from 'react';
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
  handleClosePages,
  handleTogglePages,
  handleOpenNav,
  handleCloseNav,
} from '../../utils/eventHandlers/handlesSideMenu';

import specialCharactersChange from '../../utils/specialCharactersChange';

import { GlobalState } from '../../store/modules/interfaces';
import {
  BtnMenuProtocol,
  DispatcherProtocol,
  BtnNavProtocol,
} from './interfaces';

import './style.css';

const stopPropagation = <T extends React.SyntheticEvent>(e: T) => {
  e.stopPropagation();
};

const BtnMenu = (props: BtnMenuProtocol): JSX.Element => (
  <button className={props.className} onClick={props.handleFunc}>
    menu
    <props.ArrowComponent />
  </button>
);

const BtnNav = (props: BtnNavProtocol): JSX.Element => (
  <button className={props.className} onClick={props.handleFunc}>
    {props.textInside}
    <GoChevronRight />
  </button>
);

const Header = () => {
  return (
    <header>
      <h1>Minhas páginas</h1>
      <BtnMenu
        className="btn-close-menu"
        handleFunc={handleClosePages}
        ArrowComponent={GoChevronLeft}
      />
    </header>
  );
};

const PagesModal = (props: DispatcherProtocol) => {
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

  const handleChangePage = (id: string) => {
    props.dispatcher(currentPageIDActions.setCurrentPageID({ id }));
    handleClosePages();
    setTimeout(() => handleCloseNav(), 0);
  };

  return (
    <div id="pages">
      <Header />
      <div className="users-pages">
        <button className="btn-create-page" onClick={handleCreateNewPage}>
          Criar nova página <GoPlus />
        </button>
        {pages.map((page) => (
          <button key={page.id} onClick={() => handleChangePage(page.id)}>
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

const BtnNavOpen = () => {
  return (
    <button className="btn-open-nav" onClick={handleOpenNav}>
      <GoChevronUp />
    </button>
  );
};

export default function SideMenu() {
  const dispatch = useDispatch();

  return (
    <>
      <BtnNavOpen />
      <div
        className="main-nav"
        onMouseOver={handleOpenNav}
        onClick={handleOpenNav}
      >
        <PagesModal dispatcher={dispatch} />
        <div className="container-navs-btn">
          <BtnMenu
            className="btn-nav btn-open-menu"
            handleFunc={handleTogglePages}
            ArrowComponent={GoChevronRight}
          />
          <BtnNav
            className="btn-nav"
            handleFunc={() => {}}
            textInside="buscar"
          />
          <BtnNav
            className="btn-nav"
            handleFunc={() => {}}
            textInside="sobre"
          />
        </div>
      </div>
    </>
  );
}
