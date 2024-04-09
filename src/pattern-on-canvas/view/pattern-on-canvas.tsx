import {useEffect, useRef, useState} from 'react'
import {PatternOnCanvasController} from "../controller/pattern-on-canvas.controller";
import {height, width} from "../../app-common/constant";
import s from './pattern-on-canvas.module.css'

export function PatternOnCanvas() {
  const canvasRef = useRef(null);

  const [controller] = useState(() => new PatternOnCanvasController());

  useEffect(() => {
    controller.setElement(canvasRef.current!);
    return () => controller.dispose();
  }, []);

  return (
    <canvas className={s.canvas}
      width={width}
            height={height}
            ref={canvasRef}/>
  );
}
