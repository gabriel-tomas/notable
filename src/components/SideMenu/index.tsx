import { useDispatch } from 'react-redux';
import { GoChevronRight, GoChevronLeft, GoPlus } from 'react-icons/go';

import * as menuActions from '../../store/modules/menu/actions';

import {
  BtnMenuProtocol,
  BtnDispatcherProtocol,
  BtnDispatcher,
} from './interfaces';

import './style.css';

const handleOpenMenu = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  dispatch: BtnDispatcher,
) => {
  const el = event.currentTarget as HTMLButtonElement;
  el?.classList.add('desactive');
  document.getElementById('menu')?.classList.add('active');
  dispatch(menuActions.setMenuIsOpen());
};

const handleCloseMenu = (dispatch: BtnDispatcher) => {
  const btnOpenMenu = document.querySelector('.btn-open-menu');
  btnOpenMenu?.classList.remove('desactive');
  document.getElementById('menu')?.classList.remove('active');
  dispatch(menuActions.setMenuIsClosed());
};

const BtnMenu = (
  props: BtnMenuProtocol & BtnDispatcherProtocol,
): JSX.Element => (
  <button className={props.className} onClick={props.handleFunc}>
    menu
    <props.ArrowComponent />
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
      <BtnMenu
        className="btn-open-menu"
        handleFunc={(e) => handleOpenMenu(e, dispatch)}
        ArrowComponent={GoChevronRight}
        dispatchMenuState={dispatch}
      />
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
