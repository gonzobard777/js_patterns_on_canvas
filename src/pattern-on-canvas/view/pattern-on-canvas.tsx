import {useEffect, useRef, useState} from 'react'
import {PatternOnCanvasController} from "../controller/pattern-on-canvas.controller";
import {height, width} from "../../app-common/constant";

export function PatternOnCanvas() {
  const canvasRef = useRef(null);

  const [controller] = useState(() => new PatternOnCanvasController());

  useEffect(() => {
    controller.setElement(canvasRef.current!);
    return () => controller.dispose();
  }, []);

  return (
    <canvas width={width}
            height={height}
            ref={canvasRef}/>
  );
}
