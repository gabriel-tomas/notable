import { Dispatch } from 'react';
import { GoChevronRight, GoChevronLeft } from 'react-icons/go';
import { UnknownAction } from 'redux';

export interface BtnNavProtocol {
  className: string;
  textInside?: string;
  handleFunc: () => void;
  ArrowComponent: typeof GoChevronRight | typeof GoChevronLeft;
}

export interface DispatcherProtocol {
  dispatcher: Dispatch<UnknownAction>;
}
