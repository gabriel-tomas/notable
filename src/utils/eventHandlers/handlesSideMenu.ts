export const handleOpenPages = () => {
  document.getElementById('pages')?.classList.add('active');
};

export const handleClosePages = () => {
  document.getElementById('pages')?.classList.remove('active');
};

export const handleTogglePages = () => {
  document.getElementById('pages')?.classList.toggle('active');
};

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
