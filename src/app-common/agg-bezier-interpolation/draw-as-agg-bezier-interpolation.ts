import {IPoint} from "@do-while-for-each/math";
import {pathAsAggBezierInterpolation} from "./path-as-agg-bezier-interpolation";
import {InterpFigureType} from "../constant";

// рисование на канвасе
export function drawAsAggBezierInterpolation(
  context: CanvasRenderingContext2D,
  type: InterpFigureType,
  points: IPoint[],
  tension: number,
  strokeStyle?: string
): void {

  if (strokeStyle) {
    context.strokeStyle = strokeStyle;
  }
  const pathStr = pathAsAggBezierInterpolation(type, points, tension);
  context.stroke(new Path2D(pathStr));

}
