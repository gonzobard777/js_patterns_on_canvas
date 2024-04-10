import {IPoint} from "@do-while-for-each/math";
import {aggPolygonBezierInterpolation} from "./agg-polygon.bezier-interpolation";
import {aggLineBezierInterpolation} from "./agg-line.bezier-interpolation";
import {InterpFigureType} from "../constant";

// отдает svg <path d="строковое значение">
export function pathAsAggBezierInterpolation(type: InterpFigureType, points: IPoint[], tension: number): string {
  switch (type) {
    case InterpFigureType.Line:
      return aggLineBezierInterpolation(points, tension);
    case InterpFigureType.Polygon:
      return aggPolygonBezierInterpolation(points, tension);
    default:
      return '';
  }
}
