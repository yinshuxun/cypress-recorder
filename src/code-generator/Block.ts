export type Line = {
  frameId: number;
  type: string;
  value?: any;
};

export default class Block {
  _lines: Array<any> = [];
  _frameId: number;
  constructor(frameId?: number, line?: Partial<Line>) {
    this._lines = [];
    this._frameId = frameId!;

    if (line) {
      line.frameId = this._frameId;
      this._lines.push(line);
    }
  }

  addLineToTop(line: Partial<Line>) {
    line.frameId = this._frameId;
    this._lines.unshift(line);
  }

  addLine(line: Partial<Line>) {
    line.frameId = this._frameId;
    this._lines.push(line);
  }

  getLines() {
    return this._lines;
  }
}
