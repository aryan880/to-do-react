import { displayObject } from 'types/Repo';

export interface homePageTypes {
  list: displayObject[];
  updateDialogState: boolean;
  task: { field: any };
  info: { id: any; value: any };
}
