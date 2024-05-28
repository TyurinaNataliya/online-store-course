import { makeAutoObservable } from "mobx";

export default class DiagrammStore {
  private _diagramms: { id: number; model: string }[];
  private _selectedDiagramm: any;

  constructor() {
    this._diagramms = [];
    this._selectedDiagramm = {};

    makeAutoObservable(this);
  }

  setDiagramms(diagramms: any[]) {
    this._diagramms = diagramms;
  }

  setSelectedDiagramm(selectedDiagramm: any) {
    this._selectedDiagramm = selectedDiagramm;
  }
  get diagramms() {
    return this._diagramms;
  }
}
