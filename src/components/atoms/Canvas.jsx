import { FabricJSCanvas } from "fabricjs-react";

function Canvas({ onCanvasReady, onAddImage }) {

  return (
    <div className="container-canvas">
      <FabricJSCanvas  className="sample-canvas"  onReady={onCanvasReady} />
    </div>
  );
}

export default Canvas;
