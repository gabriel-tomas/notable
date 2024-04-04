import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { GoChevronRight, GoChevronLeft, GoPlus } from 'react-icons/go';
import { nanoid } from 'nanoid';

import * as menuActions from '../../store/modules/menu/actions';
import * as pagesActions from '../../store/modules/pages/actions';
import * as currentPageID from '../../store/modules/currentPageID/actions';

import specialCharactersChange from '../../utils/specialCharactersChange';

import { GlobalState } from '../../store/modules/interfaces';
import {
  BtnMenuProtocol,
  DispatcherProtocol,
  BtnDispatcher,
  BtnNavProtocol,
} from './interfaces';

import './style.css';

const handleOpenPages = (dispatch: BtnDispatcher) => {
  const nav = document.querySelector('.main-nav');
  nav?.classList.add('desactive');
  document.getElementById('pages')?.classList.add('active');
  dispatch(menuActions.setMenuIsOpen());
};

const handleClosePages = (dispatch: BtnDispatcher) => {
  const nav = document.querySelector('.main-nav');
  nav?.classList.remove('desactive');
  document.getElementById('pages')?.classList.remove('active');
  dispatch(menuActions.setMenuIsClosed());
};

const handleOpenNav = () => {
  const nav = document.querySelector('.main-nav');
  nav?.classList.add('active');
};

const handleCloseNav = () => {
  const nav = document.querySelector('.main-nav');
  nav?.classList.remove('active');
};

const BtnMenu = (props: BtnMenuProtocol & DispatcherProtocol): JSX.Element => (
  <button
    className={props.className}
    onClick={() => props.handleFunc(props.dispatcher)}
  >
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

const Header = (props: DispatcherProtocol) => {
  return (
    <header>
      <h1>Minhas páginas</h1>
      <BtnMenu
        className="btn-close-menu"
        handleFunc={() => handleClosePages(props.dispatcher)}
        ArrowComponent={GoChevronLeft}
        dispatcher={props.dispatcher}
      />
    </header>
  );
};

const PagesModal = (props: DispatcherProtocol) => {
  const pages = useSelector((state: GlobalState) => state.pages.pages);

  const handleCreateNewPage = () => {
    const id = nanoid();
    const content = {};
    props.dispatcher(pagesActions.setCreateNewPage({ id, content }));
  };

  const handleChangePage = (id: string) => {
    props.dispatcher(currentPageID.setCurrentPageID({ id }));
    handleClosePages(props.dispatcher);
  };

  return (
    <div id="pages">
      <Header dispatcher={props.dispatcher} />
      <div className="users-pages">
        <button className="btn-create-page" onClick={handleCreateNewPage}>
          Criar nova página <GoPlus />
        </button>
        {pages.map((page) => (
          <button key={page.id} onClick={() => handleChangePage(page.id)}>
            {specialCharactersChange(
              get(page, 'content.blocks[0].data.text', null),
            ) || 'Untitled'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function SideMenu() {
  const dispatch = useDispatch();

  return (
    <>
      <div
        className="main-nav-back-activator"
        onMouseOver={handleOpenNav}
        onMouseLeave={handleCloseNav}
        onClick={handleOpenNav}
      ></div>
      <div
        className="main-nav"
        onMouseOver={handleOpenNav}
        onMouseLeave={handleCloseNav}
        onClick={handleOpenNav}
      >
        <BtnMenu
          className="btn-nav btn-open-menu"
          handleFunc={() => handleOpenPages(dispatch)}
          ArrowComponent={GoChevronRight}
          dispatcher={dispatch}
        />
        <BtnNav className="btn-nav" handleFunc={() => {}} textInside="buscar" />
        <BtnNav className="btn-nav" handleFunc={() => {}} textInside="sobre" />
      </div>
      <PagesModal dispatcher={dispatch} />
    </>
  );
}
