import * as pathProps from 'svg-path-properties';
import {drawPatternAlongStroke, getPatternAlongStrokeConverter} from "../../app-common/pattern/draw-pattern-along-stroke";
import {drawOfAggBezierInterpolation, getPathOfAggBezierInterpolation} from "../../app-common/agg-bezier-interpolation";
import {PointBasedPattern} from "../../app-common/pattern/point-based.pattern";
import {LineBasedPattern} from "../../app-common/pattern/line-based.pattern";
import {interpFigureType, points, tension} from "../../app-common/constant";
import {ArcBasedPattern} from "../../app-common/pattern/arc-based.pattern";


export class PatternOnCanvasController {

  context: CanvasRenderingContext2D;

  setElement(element: HTMLCanvasElement) {
    this.context = element.getContext('2d')!;
    this.render();
  }

  render() {
    drawOfAggBezierInterpolation(this.context, interpFigureType, points, tension);
    const svgProps = pathProps.svgPathProperties(getPathOfAggBezierInterpolation(interpFigureType, points, tension));

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

  render2() {
    const svgProps = pathProps.svgPathProperties(getPathOfAggBezierInterpolation(interpFigureType, points, tension));
    const totalLen = svgProps.getTotalLength();

    const patternBaseLen = 20;
    const offset = 15;
    const segmentLen = patternBaseLen + offset * 2;
    this.context.setLineDash([segmentLen])
    drawOfAggBezierInterpolation(this.context, interpFigureType, points, tension, 'blue');
    const pattern1 = new LineBasedPattern(
      {points: [[-10, 0], [0, -10], [10, 0], [-10, 0]], strokeStyle: 'blue', fillStyle: 'blue'},
      this.context
    );
    for (let len = segmentLen / 2; len < totalLen; len += segmentLen * 2) {
      const conv = getPatternAlongStrokeConverter(len, svgProps);
      pattern1.draw(conv);
    }

    this.context.lineDashOffset = segmentLen;
    this.context.setLineDash([segmentLen])
    drawOfAggBezierInterpolation(this.context, interpFigureType, points, tension, 'red');
    const pattern2 = new LineBasedPattern(
      {points: [[-10, 0], [0, 10], [10, 0], [-10, 0]], strokeStyle: 'red', fillStyle: 'red'},
      this.context
    );
    for (let len = segmentLen * 1.5; len < totalLen; len += segmentLen * 2) {
      const conv = getPatternAlongStrokeConverter(len, svgProps);
      pattern2.draw(conv);
    }
  }


  dispose() {

  }

}


