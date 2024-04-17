export interface AboutModalProtocol {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen(): void;
  handleClose(): void;
}
