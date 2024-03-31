import { GoChevronRight, GoChevronLeft } from 'react-icons/go';

import './style.css';

const handleOpenMenu = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
) => {
  const el = event.currentTarget as HTMLButtonElement;
  el?.classList.add('desactive');
  document.getElementById('menu')?.classList.add('active');
};

const handleCloseMenu = () => {
  const btnOpenMenu = document.querySelector('.btn-open-menu');
  btnOpenMenu?.classList.remove('desactive');
  document.getElementById('menu')?.classList.remove('active');
};

export default function SideMenu() {
  return (
    <>
      <button className="btn-open-menu" onClick={handleOpenMenu}>
        menu
        <GoChevronRight />
      </button>
      <div id="menu">
        <header>
          <h1>Minhas páginas</h1>
          <button className="btn-close-menu" onClick={handleCloseMenu}>
            <GoChevronLeft />
            menu
          </button>
        </header>
        <div className="users-pages"></div>
      </div>
    </>
  );
}
