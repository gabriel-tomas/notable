import { OutputBlockData } from '@editorjs/editorjs/types/data-formats/output-data';

export interface ActionProtocol {
  type: string;
  payload: PagePayload;
}

export interface PagePayload {
  id: string;
  content: ArticleDataProtocol | object;
}

export interface ArticleDataProtocol {
  blocks: OutputBlockData<string, unknown>[];
  time: number;
  version: string;
}

export type ArticleDataProtocolOrEmptyObject = ArticleDataProtocol | object;
