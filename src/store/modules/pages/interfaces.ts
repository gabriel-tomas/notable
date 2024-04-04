import { OutputBlockData } from '@editorjs/editorjs/types/data-formats/output-data';

export interface ActionProtocol {
  type: string;
  payload: PagePayload;
}

export interface PageIDPayload {
  id: string;
}

export interface PageContentPayload {
  content: ArticleDataProtocol | object;
}

export interface PagePayload extends PageIDPayload, PageContentPayload {}

export interface ArticleDataProtocol {
  blocks: OutputBlockData<string, unknown>[];
  time: number;
  version: string;
}

export type ArticleDataProtocolOrEmptyObject = ArticleDataProtocol | object;
