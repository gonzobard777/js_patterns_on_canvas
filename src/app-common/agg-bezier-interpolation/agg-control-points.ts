/**
 * Вычисление контрольных точек кубической кривой Безье.
 * По алгоритму создателя проекта AGG (Anti-Grain-Geometry):
 *   https://web.archive.org/web/20130308104133/http://www.antigrain.com/research/bezier_interpolation/index.html
 */
export function getAggControlPoints(
  x0: number, y0: number,
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number,
  tension = 1
) {

  const xc1 = (x0 + x1) / 2;
  const yc1 = (y0 + y1) / 2;
  const xc2 = (x1 + x2) / 2;
  const yc2 = (y1 + y2) / 2;
  const xc3 = (x2 + x3) / 2;
  const yc3 = (y2 + y3) / 2;

  const len1 = Math.hypot(x1 - x0, y1 - y0);
  const len2 = Math.hypot(x2 - x1, y2 - y1);
  const len3 = Math.hypot(x3 - x2, y3 - y2);

  let k1 = len1 / (len1 + len2);
  let k2 = len2 / (len2 + len3);

  k1 = Number.isNaN(k1) ? 0 : k1;
  k2 = Number.isNaN(k2) ? 0 : k2;

  const xm1 = (xc2 - xc1) * k1 + xc1;
  const ym1 = (yc2 - yc1) * k1 + yc1;

  const xm2 = (xc3 - xc2) * k2 + xc2;
  const ym2 = (yc3 - yc2) * k2 + yc2;

  // Resulting control points. Here smooth_value(tension) is mentioned
  // above coefficient K whose value should be in range [0...1].
  const cp1x = xm1 + (xc2 - xm1) * tension + x1 - xm1;
  const cp1y = ym1 + (yc2 - ym1) * tension + y1 - ym1;

  const cp2x = xm2 + (xc2 - xm2) * tension + x2 - xm2;
  const cp2y = ym2 + (yc2 - ym2) * tension + y2 - ym2;

  return {cp1x, cp1y, cp2x, cp2y};
}
