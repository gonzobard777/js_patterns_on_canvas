import {IPoint} from "@do-while-for-each/math";
import {getPathOfAggBezierInterpolation} from "./get-path-of-agg-bezier-interpolation";
import {InterpFigureType} from "../constant";

// рисование на канвасе
export function drawOfAggBezierInterpolation(
  context: CanvasRenderingContext2D,
  type: InterpFigureType,
  points: IPoint[],
  tension: number,
  strokeStyle?: string
): void {

  if (strokeStyle) {
    context.strokeStyle = strokeStyle;
  }
  const pathStr = getPathOfAggBezierInterpolation(type, points, tension);
  context.stroke(new Path2D(pathStr));

}
