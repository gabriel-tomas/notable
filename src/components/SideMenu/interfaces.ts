import { Dispatch, UnknownAction } from 'redux';
import { GoChevronRight, GoChevronLeft } from 'react-icons/go';

export interface BtnNavProtocol {
  className: string;
  textInside?: string;
  handleFunc: () => void;
  ArrowComponent: typeof GoChevronRight | typeof GoChevronLeft;
}

export interface DispatcherProtocol {
  dispatcher: Dispatch<UnknownAction>;
}
