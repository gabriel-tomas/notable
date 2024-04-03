import { Dispatch } from 'react';
import { GoChevronRight, GoChevronLeft } from 'react-icons/go';
import { UnknownAction } from 'redux';

export interface BtnMenuProtocol {
  className: string;
  handleFunc: (dispatch: BtnDispatcher) => void;
  ArrowComponent: typeof GoChevronRight | typeof GoChevronLeft;
}

export interface BtnNavProtocol {
  className: string;
  textInside: string;
  handleFunc: () => void;
}

export interface DispatcherProtocol {
  dispatcher: Dispatch<UnknownAction>;
}

export type BtnDispatcher = Dispatch<UnknownAction>;
