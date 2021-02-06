export interface IFieldOffice {
  id: number;
  name: string;
}

export interface ISource {
  id: number;
  name: string;
  fieldOfficeId: number;
}

