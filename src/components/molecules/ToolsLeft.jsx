import { useState } from "react";
import ButtonTool from "../atoms/ButtonTool";
import BtnAddText from "../../assets/img/BtnText.png"
import IconAddForm from "../../assets/img/Diversity.png"
import IconDraw from "../../assets/img/Edit.png"
import IconCirculo from "../../assets/img/circulo.png"
import IconTriangulo from "../../assets/img/triangulo.png"
import IconCuadrado from "../../assets/img/cuadrado.png"

function ToolsLeft({
  onAddShape,
  onAddText,
  onToggleDraw,
  onSetColor,
  onSetLineWidth,
  currentColor,
  currentLineWidth,
  currentFontFamily,
  onSetFontFamily,
  currentFontSize,
  onSetFontSize,
  currentTextAlign,
  onSetTextAlign,
  canvas,
}) {
  const [lineWidth, setLineWidth] = useState(currentLineWidth);
  const [showShapeOptions, setShowShapeOptions] = useState(false);
  const [showTextOptions, setShowTextOptions] = useState(false);
  const [showDrawOptions, setShowDrawOptions] = useState(false);

  const handleLineWidthChange = (newWidth) => {
    setLineWidth(newWidth);
    onSetLineWidth(newWidth);
    if (canvas && canvas.isDrawingMode) {
      canvas.isDrawingMode = false;
      setTimeout(() => {
        canvas.isDrawingMode = true;
      }, 0);
    }
  };


  return (
    <div className="tools-left">
      <ButtonTool
        img={IconAddForm}
        handle={() => {
          setShowTextOptions(false)
          setShowDrawOptions(false)
          setShowShapeOptions(!showShapeOptions)
        }}
        text={"Formas"}
      />
      {showShapeOptions && (
        <div className="shapes-options">
          <button onClick={() => onAddShape("Rect")}> <img src={IconCuadrado} alt="" /> </button>
          <button onClick={() => onAddShape("Circle")}> <img src={IconCirculo} alt="" /> </button>
          <button onClick={() => onAddShape("Triangle")}> <img src={IconTriangulo} alt="" /> </button>
        </div>
      )} 

      <ButtonTool img={BtnAddText} handle={() =>{ 
        setShowShapeOptions(false)
        setShowDrawOptions(false)
        setShowTextOptions(!showTextOptions)
      }} 
      text={"Texto"} />
        {showTextOptions && (
          <div className="text-options">
            <button onClick={onAddText}> Agregar Texto</button>
            <label htmlFor="font-family">Fuente:</label>
            <select id="font-family" value={currentFontFamily} onChange={(e) => onSetFontFamily(e.target.value)} >
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
              <option value="Roboto">Roboto</option>
            </select>

            <label htmlFor="font-size">Tamaño de letra:</label>
            <input id="font-size" type="number" min="6" value={currentFontSize} onChange={(e) => onSetFontSize(parseInt(e.target.value))} />

            <label htmlFor="text-align">Alineación vertical:</label>
            <select id="text-align" value={currentTextAlign} onChange={(e) => onSetTextAlign(e.target.value)} >
              <option value="left">Izquierda</option>
              <option value="center">Centro</option>
              <option value="right">Derecha</option>
            </select>
          </div>
        )} 
      
      <ButtonTool img={IconDraw} handle={() =>{ 
        setShowShapeOptions(false)
        setShowTextOptions(false)
        setShowDrawOptions(!showDrawOptions)
      }} 
      text={"Dibujo"} />
        {showDrawOptions && (
          <div className="draw-options">
            <button onClick={onToggleDraw}>Alternar Dibujo</button>
            <label htmlFor="grosor">Grosor:</label>
            <input id="grosor" type="number" min="1" value={lineWidth} onChange={(e) => handleLineWidthChange(e.target.value)} />
          </div>
        )} 
      
      <input
        type="color"
        value={currentColor}
        onChange={(e) => onSetColor(e.target.value)}
      />
      
    </div>
   
  );
}

export default ToolsLeft;
