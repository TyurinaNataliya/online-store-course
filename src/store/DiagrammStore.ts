import { makeAutoObservable } from "mobx";

export default class DiagrammStore {
  private _diagramms: { id: number; model: string }[];

  constructor() {
    this._diagramms = [];

    makeAutoObservable(this);
  }

  setDiagramms(diagramms: any[]) {
    this._diagramms = diagramms;
  }

  get diagramms() {
    return this._diagramms;
  }
}
