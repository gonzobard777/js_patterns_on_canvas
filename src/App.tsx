import {getPathAsBezierInterpolation} from "./app-common/bezier-interpolation";
import {PatternOnCanvas} from "./pattern-on-canvas/view/pattern-on-canvas";
import {figureType, height, points, tension, width} from "./app-common/constant";
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
                d={getPathAsBezierInterpolation(figureType, points, tension)}/>
        </svg>
      </div>
    </>

  );
}
