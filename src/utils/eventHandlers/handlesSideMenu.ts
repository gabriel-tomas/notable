// handles NavModal
export const handleOpenNav = () => {
  const nav = document.querySelector('.main-nav');
  nav?.classList.add('active');
  const elBtn = document.querySelector('.btn-open-nav')!;
  elBtn.classList.add('desactive');
};

export const handleCloseNav = () => {
  const elBtn = document.querySelector('.btn-open-nav')!;
  elBtn.classList.remove('desactive');
  const nav = document.querySelector('.main-nav')!;
  nav.classList.remove('active');
  handleClosePages();
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

export const handleCloseSearch = () => {
  document.getElementById('search')?.classList.remove('active');
};
