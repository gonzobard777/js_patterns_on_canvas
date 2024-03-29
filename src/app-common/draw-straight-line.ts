import {IPoint} from "@do-while-for-each/math";

export function drawStraightLine(context: CanvasRenderingContext2D, points: IPoint[], color: string): void {
  context.save();
  context.lineWidth = 1;
  context.strokeStyle = color;

  const path = new Path2D();
  const lastPointIndex = points.length - 1;
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (i === 0) {
      path.moveTo(point[0], point[1]);
      continue;
    }
    // path.lineTo(point[0], point[1]);

    // if (i === lastPointIndex) {
    //   path.closePath();
    // } else {
    path.lineTo(point[0], point[1]);
    // }
  }
  // if (Point.isEqual(points[0], points[points.length - 1])) {
  //   path.closePath();
  // }

  context.stroke(path);

  context.restore();
}


export function drawLine(
  context: CanvasRenderingContext2D,
  line: IPoint[],
  {lineDash, lineWidth, strokeStyle, fillStyle}: ILineDrawOnCanvasOpt = {},
) {

  const isOptOverrides = !!lineDash || !!lineWidth || !!strokeStyle;
  if (isOptOverrides) {
    context.save();
  }

  context.beginPath();
  for (let i = 0; i < line.length; i++) {

    let point = line[i];
    if (i === 0) {
      context.moveTo(point[0], point[1]);
      continue;
    }
    context.lineTo(point[0], point[1]);
  }

  if (lineDash) {
    context.setLineDash(lineDash);
  }
  if (lineWidth) {
    context.lineWidth = lineWidth;
  }

  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fill();
  }
  if (strokeStyle) {
    context.strokeStyle = strokeStyle;
  }
  context.stroke();

  if (isOptOverrides) {
    context.restore();
  }
}

export class LineDraw {

  makeStroke = true;
  makeFill = false;

  constructor(private context: CanvasRenderingContext2D,
              {lineDash, lineWidth, fillStyle, strokeStyle, makeStroke}: ILineDrawOnCanvasOpt) {
    if (lineDash !== undefined) {
      context.setLineDash(lineDash);
    }
    if (lineWidth !== undefined) {
      context.lineWidth = lineWidth;
    }
    if (fillStyle !== undefined) {
      context.fillStyle = fillStyle;
      this.makeFill = true;
    }
    if (strokeStyle !== undefined) {
      context.strokeStyle = strokeStyle;
    }
    if (makeStroke === false) {
      this.makeStroke = false;
    }
  }

  run(points: IPoint[]) {
    this.context.beginPath();
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      if (i === 0) {
        this.context.moveTo(point[0], point[1]);
        continue;
      }
      this.context.lineTo(point[0], point[1]);
    }

    if (this.makeFill) {
      this.context.fill();
    }
    if (this.makeStroke) {
      this.context.stroke();
    }
  }


}


export interface ILineDrawOnCanvasOpt {
  lineDash?: number[]; // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
  lineWidth?: number;
  fillStyle?: string;
  strokeStyle?: string; // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle
  makeStroke?: boolean;
}
