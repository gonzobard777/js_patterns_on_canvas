import {IPoint} from "@do-while-for-each/math";
import {getAggControlPoints} from "./agg-control-points";

/**
 * AGG bezier interpolation для линии.
 * Изначально было взято отсюда: https://codepen.io/osublake/pen/LGMexY
 * Но потом модифицировано:
 *   - переведено на IPoint
 *   - коррекция контрольных точек для крайних точек линии
 *
 * @param data - массив точек => Линия
 * @param tension - коэффициент сглаженности
 * @return path в виде строки
 */
export function aggLineBezierInterpolation(data: IPoint[], tension?: number): string {

  if (data.length < 2) return '';

  const first = data[0];
  let path = "M" + first[0] + "," + first[1];

  const lastIndex = data.length - 2;

  for (let i = 0; i <= lastIndex; i++) {

    // если первая точка, то предыдущей еще нет
    const point0 = i === 0 ? data[0] : data[i - 1];
    const x0 = point0[0];
    const y0 = point0[1];

    const point1 = data[i];
    const x1 = point1[0];
    const y1 = point1[1];

    const point2 = data[i + 1];
    const x2 = point2[0];
    const y2 = point2[1];

    // если последняя в цикле точка, тогда есть только следующая(point2), а вот следующая+1 уже нет
    const point3 = i === lastIndex ? point2 : data[i + 2];
    const x3 = point3[0];
    const y3 = point3[1];


    // вычислить контрольные точки
    const agg = getAggControlPoints(x0, y0, x1, y1, x2, y2, x3, y3, tension);

    // не нужна первая контрольная точка, для первой точки
    if (i === 0) {
      agg.cp1x = x1;
      agg.cp1y = y1;
    }
    // не нужна вторая контрольная точка, для последней точки
    if (i === lastIndex) {
      agg.cp2x = x2;
      agg.cp2y = y2;
    }


    path += "C" +
      agg.cp1x + "," + agg.cp1y + "," +
      agg.cp2x + "," + agg.cp2y + "," +
      x2 + "," + y2;
  }

  return path;
}
