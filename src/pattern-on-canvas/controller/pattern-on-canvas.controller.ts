import * as pathProps from 'svg-path-properties';
import {drawAsBezierInterpolation, getPathAsBezierInterpolation} from "../../app-common/bezier-interpolation";
import {drawPatternAlongStroke} from "../../app-common/pattern/draw-pattern-along-stroke";
import {PointBasedPattern} from "../../app-common/pattern/point-based.pattern";
import {LineBasedPattern} from "../../app-common/pattern/line-based.pattern";
import {ArcBasedPattern} from "../../app-common/pattern/arc-based.pattern";
import {points} from "../../app-common/constant";

export class PatternOnCanvasController {

  context: CanvasRenderingContext2D;

  setElement(element: HTMLCanvasElement) {
    this.context = element.getContext('2d')!;
    this.render();
  }

  render() {
    drawAsBezierInterpolation(this.context, points);
    const svgProps = pathProps.svgPathProperties(getPathAsBezierInterpolation(points));

    const lineBasedPattern = new LineBasedPattern(
      {points: [[-10, 0], [0, -10], [10, 0], [-10, 0]], strokeStyle: 'black', fillStyle: 'magenta'},
      this.context
    );
    drawPatternAlongStroke(lineBasedPattern, 20, 35, svgProps);

    const arcBasedPattern = new ArcBasedPattern(
      {center: [0, 0], radius: 6, startAngle: Math.PI, endAngle: 2 * Math.PI, strokeStyle: 'black'},
      this.context
    );
    drawPatternAlongStroke(arcBasedPattern, 20, 35, svgProps);

    const pointBasedPattern = new PointBasedPattern(
      {points, radius: 3, lineWidth: 2, strokeStyle: 'green', fillStyle: 'white'},
      this.context
    );
    pointBasedPattern.draw();
  }

  dispose() {

  }

}


