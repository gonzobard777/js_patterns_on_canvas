import {height, interpFigureType, points, tension, width} from "./app-common/constant";
import {pathAsAggBezierInterpolation} from "./app-common/agg-bezier-interpolation";
import {PatternOnCanvas} from "./pattern-on-canvas/view/pattern-on-canvas";
import s from './App.module.css';

export function App() {

  return (
    <>

      <div>
        <span>canvas</span> <br/>
        <PatternOnCanvas/>
      </div>

      <div>
        <span>svg</span> <br/>
        <svg width={width} height={height}>
          <path className={s.stroke}
                d={pathAsAggBezierInterpolation(interpFigureType, points, tension)}/>
        </svg>
      </div>
    </>

  );
}
