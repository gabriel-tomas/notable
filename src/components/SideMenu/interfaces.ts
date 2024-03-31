import { Dispatch } from 'react';
import { GoChevronRight, GoChevronLeft } from 'react-icons/go';
import { UnknownAction } from 'redux';

export interface BtnMenuProtocol {
  className: string;
  handleFunc: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  ArrowComponent: typeof GoChevronRight | typeof GoChevronLeft;
}

export interface BtnDispatcherProtocol {
  dispatchMenuState: Dispatch<UnknownAction>;
}

export type BtnDispatcher = Dispatch<UnknownAction>;
