// FlexWorkArea.jsx
import { useState, useEffect } from "react";
import Canvas from "../atoms/Canvas";
import ToolsLeft from "../molecules/ToolsLeft";
import { fabric } from "fabric";
import "../../assets/styles/workArea.css";

function FlexWorkArea() {
  const [canvas, setCanvas] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentLineWidth, setCurrentLineWidth] = useState(2); // Initial line width
  const [currentFontFamily, setCurrentFontFamily] = useState("Arial");
  const [currentFontSize, setCurrentFontSize] = useState(18);
  const [currentTextAlign, setCurrentTextAlign] = useState("left");

  useEffect(() => {
    if (canvas) {
      canvas.isDrawingMode = false;
      canvas.freeDrawingBrush.width = currentLineWidth;
    }
  }, [canvas, currentLineWidth]);

  const handleCanvasReady = (canvas) => {
    setCanvas(canvas);
  };

  const handleAddShape = (shapeType) => {
    if (canvas) {
      let shape;
      switch (shapeType) {
        case "Rect":
          shape = new fabric.Rect({
            left: 100,
            top: 100,
            width: 100,
            height: 100,
            fill: currentColor,
          });
          break;
        case "Circle":
          shape = new fabric.Circle({
            left: 100,
            top: 100,
            radius: 50,
            fill: currentColor,
          });
          break;
        case "Triangle":
          shape = new fabric.Triangle({
            left: 100,
            top: 100,
            width: 100,
            height: 100,
            fill: currentColor,
          });
          break;
        default:
          return;
      }
      canvas.add(shape);
      setUndoStack([...undoStack, shape]);
      setRedoStack([]);
    }
  };

  const handleAddText = () => {
    if (canvas) {
      const text = new fabric.Textbox("Insertar Texto", {
        left: 100,
        top: 100,
        fill: currentColor,
        fontFamily: currentFontFamily,
        fontSize: currentFontSize,
        textAlign: currentTextAlign,
      });
      canvas.add(text);
      setUndoStack([...undoStack, text]);
      setRedoStack([]);
    }
  };

  const handleToggleDraw = () => {
    if (canvas) {
      canvas.isDrawingMode = !canvas.isDrawingMode;
    }
  };

  const handleClearCanvas = () => {
    if (canvas) {
      canvas.clear();
      setUndoStack([]);
      setRedoStack([]);
    }
  };

  const handleUndo = () => {
    if (canvas && undoStack.length > 0) {
      const lastUndoObject = undoStack.pop();
      setRedoStack([...redoStack, lastUndoObject]);
      canvas.remove(lastUndoObject);
      canvas.renderAll();
    }
  };

  const handleRedo = () => {
    if (canvas && redoStack.length > 0) {
      const lastRedoObject = redoStack.pop();
      setUndoStack([...undoStack, lastRedoObject]);
      canvas.add(lastRedoObject);
      canvas.renderAll();
    }
  };

  const handleSetColor = (color) => {
    if (canvas) {
      canvas.freeDrawingBrush.color = color;
      setCurrentColor(color);
    }
  };

  const handleSetLineWidth = (width) => {
    if (canvas) {
      canvas.freeDrawingBrush.width = width;
      setCurrentLineWidth(width);
    }
  };

  const handleAddImage = (imageURL) => {
    if (canvas) {
      fabric.Image.fromURL(imageURL, (img) => {
        img.set({
          left: 100,
          top: 150,
        });
        canvas.add(img);
        setUndoStack([...undoStack, img]);
        setRedoStack([]);
      });
    }
  };

  return (
    <div className="flex-work_area">
      <ToolsLeft
        onAddShape={handleAddShape}
        onAddText={handleAddText}
        onToggleDraw={handleToggleDraw}
        onClearCanvas={handleClearCanvas}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onSetColor={handleSetColor}
        onSetLineWidth={handleSetLineWidth} // Pass the function
        redoEnabled={redoStack.length > 0}
        currentColor={currentColor}
        currentLineWidth={currentLineWidth} // Pass the currentLineWidth state
        currentFontFamily={currentFontFamily}
        onSetFontFamily={setCurrentFontFamily}
        currentFontSize={currentFontSize}
        onSetFontSize={setCurrentFontSize}
        currentTextAlign={currentTextAlign}
        onSetTextAlign={setCurrentTextAlign}
        onAddImage={handleAddImage}
      />

      <Canvas onCanvasReady={handleCanvasReady} onAddImage={handleAddImage} />

      <div className="tools-right"></div>
    </div>
  );
}

export default FlexWorkArea;
