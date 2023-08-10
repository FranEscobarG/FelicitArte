// ToolsLeft.jsx
import { useState } from "react";

function ToolsLeft({
  onAddShape,
  onAddText,
  onToggleDraw,
  onClearCanvas,
  onUndo,
  onRedo,
  onSetColor,
  onSetLineWidth,
  redoEnabled,
  currentColor,
  currentLineWidth,
  currentFontFamily,
  onSetFontFamily,
  currentFontSize,
  onSetFontSize,
  currentTextAlign,
  onSetTextAlign,
  onAddImage,
}) {
  const [lineWidth, setLineWidth] = useState(currentLineWidth);

  const handleLineWidthChange = (newWidth) => {
    setLineWidth(newWidth);
    onSetLineWidth(newWidth); // Apply the new width to the canvas
    if (canvas && canvas.isDrawingMode) {
      // Re-enable drawing mode with the new line width
      canvas.isDrawingMode = false;
      setTimeout(() => {
        canvas.isDrawingMode = true;
      }, 0);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      onAddImage(imageURL);
    }
  };

  return (
    <div className="tools-left">
      <button onClick={() => onAddShape("Rect")}>Agregar Cuadrado</button>
      <button onClick={() => onAddShape("Circle")}>Agregar Círculo</button>
      <button onClick={() => onAddShape("Triangle")}>Agregar Triángulo</button>
      <button onClick={onAddText}>Agregar Texto</button>
      <label htmlFor="font-family">Fuente:</label>
      <select
        id="font-family"
        value={currentFontFamily}
        onChange={(e) => onSetFontFamily(e.target.value)}
      >
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Comic Sans MS">Comic Sans MS</option>
        <option value="Roboto">Roboto</option>
      </select>

      <label htmlFor="font-size">Tamaño de letra:</label>
      <input
        id="font-size"
        type="number"
        min="6"
        value={currentFontSize}
        onChange={(e) => onSetFontSize(parseInt(e.target.value))}
      />

      <label htmlFor="text-align">Alineación vertical:</label>
      <select
        id="text-align"
        value={currentTextAlign}
        onChange={(e) => onSetTextAlign(e.target.value)}
      >
        <option value="left">Izquierda</option>
        <option value="center">Centro</option>
        <option value="right">Derecha</option>
      </select>
      <button onClick={onToggleDraw}>Alternar Dibujo</button>
      <label htmlFor="grosor">Grosor:</label>
      <input
        id="grosor"
        type="number"
        min="1"
        value={lineWidth}
        onChange={(e) => handleLineWidthChange(e.target.value)} // Use the custom handler
      />
      <button onClick={onClearCanvas}>Limpiar</button>
      <button onClick={onUndo}>Deshacer</button>
      <button onClick={onRedo} disabled={!redoEnabled}>
        Rehacer
      </button>
      <input
        type="color"
        value={currentColor}
        onChange={(e) => onSetColor(e.target.value)}
      />
      <label htmlFor="image-upload">Agregar Imagen:</label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default ToolsLeft;
