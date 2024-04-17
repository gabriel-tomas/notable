import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoLogoGithub } from 'react-icons/io5';

import { AboutModalProtocol } from './interfaces';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'min(380px, 90vw)',
  bgcolor: 'var(--primary4)',
  borderRadius: '.7rem',
  boxShadow: 24,
  p: 4,
  color: 'var(--white-text)',
  fontSize: '.9rem',
  span: {
    display: 'flex',
    fontSize: 'inherit',
    gap: '.5rem',
    a: {
      display: 'flex',
      alignItems: 'center',
      gap: '.15rem',
    },
  },
  '.container-about': {
    marginTop: '1rem',
    p: {
      lineHeight: '1.5rem',
      fontSize: 'inherit',
    },
    'p + p': {
      marginTop: '1rem',
    },
  },
};

export default function AboutModal(props: AboutModalProtocol) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <span>
            Feito por{' '}
            <a href="https://github.com/gabriel-tomas" target="_blank">
              <IoLogoGithub /> Gabriel Tomás
            </a>
          </span>
          <div className="container-about">
            <p>
              App de notas com gerenciamento de páginas (criar, deletar páginas)
              e salvamento automático.
            </p>
            <p>
              Projeto desenvolvido com TypeScript, ReactJs, Redux e Redux
              Persist.
            </p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
