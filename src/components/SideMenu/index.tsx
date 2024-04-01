import { useDispatch } from 'react-redux';
import { GoChevronRight, GoChevronLeft, GoPlus } from 'react-icons/go';

import * as menuActions from '../../store/modules/menu/actions';

import {
  BtnMenuProtocol,
  BtnDispatcherProtocol,
  BtnDispatcher,
  BtnNavProtocol,
} from './interfaces';

import './style.css';

const handleOpenMenu = (dispatch: BtnDispatcher) => {
  const nav = document.querySelector('.main-nav');
  nav?.classList.add('desactive');
  document.getElementById('menu')?.classList.add('active');
  dispatch(menuActions.setMenuIsOpen());
};

const handleCloseMenu = (dispatch: BtnDispatcher) => {
  const nav = document.querySelector('.main-nav');
  nav?.classList.remove('desactive');
  document.getElementById('menu')?.classList.remove('active');
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

const BtnMenu = (
  props: BtnMenuProtocol & BtnDispatcherProtocol,
): JSX.Element => (
  <button
    className={props.className}
    onClick={() => props.handleFunc(props.dispatchMenuState)}
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

const Header = (props: BtnDispatcherProtocol) => {
  return (
    <header>
      <h1>Minhas páginas</h1>
      <BtnMenu
        className="btn-close-menu"
        handleFunc={() => handleCloseMenu(props.dispatchMenuState)}
        ArrowComponent={GoChevronLeft}
        dispatchMenuState={props.dispatchMenuState}
      />
    </header>
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
      ></div>
      <div
        className="main-nav"
        onMouseOver={handleOpenNav}
        onMouseLeave={handleCloseNav}
      >
        <BtnMenu
          className="btn-nav btn-open-menu"
          handleFunc={() => handleOpenMenu(dispatch)}
          ArrowComponent={GoChevronRight}
          dispatchMenuState={dispatch}
        />
        <BtnNav className="btn-nav" handleFunc={() => {}} textInside="buscar" />
        <BtnNav className="btn-nav" handleFunc={() => {}} textInside="sobre" />
      </div>
      <div id="menu">
        <Header dispatchMenuState={dispatch} />
        <div className="users-pages">
          <button className="btn-create-page">
            Criar nova página <GoPlus />
          </button>
        </div>
      </div>
    </>
  );
}
