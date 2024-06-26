import { Dispatch, UnknownAction } from 'redux';

import * as navActions from '../../store/modules/nav/actions';

// handles NavModal
export const handleOpenNav = (dispatcher: Dispatch<UnknownAction>) => {
  const nav = document.querySelector('.main-nav');
  nav?.classList.add('active');
  const elBtn = document.querySelector('.btn-open-nav')!;
  elBtn.classList.add('desactive');
  dispatcher(navActions.setNavIsOpen());
};

export const handleCloseNav = (dispatcher: Dispatch<UnknownAction>) => {
  const elBtn = document.querySelector('.btn-open-nav')!;
  elBtn.classList.remove('desactive');
  const nav = document.querySelector('.main-nav')!;
  nav.classList.remove('active');
  handleClosePages();
  handleCloseSearch();
  dispatcher(navActions.setNavIsClosed());
};

// handles PagesBox
export const handleOpenPages = () => {
  // actually not using ...
  document.getElementById('pages')?.classList.add('active');
};

export const handleClosePages = () => {
  document.getElementById('pages')?.classList.remove('active');
};

export const handleTogglePages = () => {
  const pagesBox = document.getElementById('pages') as HTMLDivElement;
  pagesBox.classList.toggle('active');
  if (pagesBox.classList.contains('active')) {
    handleCloseSearch();
  }
};

// handles SearchBox
export const handleOpenSearch = () => {
  document.getElementById('search')?.classList.add('active');
  handleClosePages();
};

export const handleToggleSearch = () => {
  const searchBox = document.getElementById('search') as HTMLDivElement;
  searchBox.classList.toggle('active');
  if (searchBox.classList.contains('active')) {
    handleClosePages();
    const input = document.querySelector('#input-search') as HTMLInputElement;
    input.focus();
  }
};

export const handleCloseSearch = () => {
  document.getElementById('search')?.classList.remove('active');
};
