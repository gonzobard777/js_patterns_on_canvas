import {IPoint, Point} from "@do-while-for-each/math";
import {getAggControlPoints} from "./agg-control-points";

/**
 * AGG bezier interpolation для полигона.
 *  https://web.archive.org/web/20130308104133/http://www.antigrain.com/research/bezier_interpolation/index.html
 *
 * @param data - массив точек => Полигон
 * @param tension - коэффициент сглаженности
 * @return path в виде строки
 */
export function aggPolygonBezierInterpolation(data: IPoint[], tension?: number): string {

  if (
    data.length < 3 ||                             // полигоном должен быть
    !Point.isEqual(data[0], data[data.length - 1]) // замкнут явно должен быть
  ) {
    return '';
  }

  data = data.slice(0, -1); // копия без последней точки
  const lastIndex = data.length - 1;

  const first = data[0];
  let path = "M" + first[0] + "," + first[1];

  for (let i = 0; i < data.length; i++) {

    const point0 = i === 0 ? data[lastIndex] : data[i - 1];
    const x0 = point0[0];
    const y0 = point0[1];

    const point1 = data[i];
    const x1 = point1[0];
    const y1 = point1[1];

    const point2 = i === lastIndex ? data[0] : data[i + 1];
    const x2 = point2[0];
    const y2 = point2[1];

    let point3 = data[i + 2];
    if (i === lastIndex - 1) {
      point3 = data[0];
    } else if (i === lastIndex) {
      point3 = data[1];
    }
    const x3 = point3[0];
    const y3 = point3[1];


    // вычислить контрольные точки
    const agg = getAggControlPoints(x0, y0, x1, y1, x2, y2, x3, y3, tension);


    path += "C" +
      agg.cp1x + "," + agg.cp1y + "," +
      agg.cp2x + "," + agg.cp2y + "," +
      x2 + "," + y2;
  }

  return path;
}
