import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Canvas from "../atoms/Canvas";
import ToolsLeft from "../molecules/ToolsLeft";
import IconRedo from "../../assets/img/Redo.png";
import IconUndo from "../../assets/img/Undo.png";
import IconPlus from "../../assets/img/iconPlus.svg";
import "../../assets/styles/workArea.css";
const endpoint = "http://localhost:4000/api/upload";

function FlexWorkProjects({ projectName }) {
  const [canvas, setCanvas] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentLineWidth, setCurrentLineWidth] = useState(2); // Initial line width
  const [currentFontFamily, setCurrentFontFamily] = useState("Arial");
  const [currentFontSize, setCurrentFontSize] = useState(18);
  const [currentTextAlign, setCurrentTextAlign] = useState("left");

  //rama yahirpro
  const [canvasData, setCanvasData] = useState("");

  useEffect(() => {
    const savedCanvasData = localStorage.getItem(projectName);
    if (savedCanvasData) {
      setCanvasData(savedCanvasData);
    }
  }, []);
  ///

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    if (file) {
      axios({
        method: "POST",
        url: endpoint,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (response) {
          console.log(response);
        });
      const imageURL = URL.createObjectURL(file);
      handleAddImage(imageURL);
    }
  };

  const handleGenerateImage = () => {
    const dataURL = canvas.toDataURL("image/jpg");
    const a = document.createElement("a");
    a.download = "TarjeaCumple.jpg";
    a.href = dataURL;
    a.click();
  };

  const handleSaveChanges = () => {
    const objects = canvas.getObjects();

    try {
      toast.success("Guardado exitosamente");
      const canvasData = JSON.stringify(objects);
      setCanvasData(canvasData);
      localStorage.setItem(projectName, canvasData);
    } catch (error) {
      toast.error("UPSS algo salio mal");
    }
  };

  const handleLoad = () => {
    if (canvasData) {
      const objects = JSON.parse(canvasData);
      canvas.loadFromJSON({ objects: objects }, canvas.renderAll.bind(canvas));
    }
  };

  return (
    <div className="flex-work_area">
      <ToolsLeft
        onAddShape={handleAddShape}
        onAddText={handleAddText}
        onToggleDraw={handleToggleDraw}
        onSetColor={handleSetColor}
        onSetLineWidth={handleSetLineWidth} // Pass the function
        currentColor={currentColor}
        currentLineWidth={currentLineWidth} // Pass the currentLineWidth state
        currentFontFamily={currentFontFamily}
        onSetFontFamily={setCurrentFontFamily}
        currentFontSize={currentFontSize}
        onSetFontSize={setCurrentFontSize}
        currentTextAlign={currentTextAlign}
        onSetTextAlign={setCurrentTextAlign}
        canvas={canvas}
      />

      <Canvas onCanvasReady={handleCanvasReady} onAddImage={handleAddImage} />

      <div className="tools-right">
        <div className="redo-undo">
          <button onClick={handleUndo}>
            <img src={IconUndo} alt="" />
          </button>
          <button onClick={handleRedo} disabled={redoStack.length < 0}>
            <img src={IconRedo} alt="" />
          </button>
        </div>
        
        <div className="upload-image">
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <label htmlFor="image-upload" className="upload-label">
            <img src={IconPlus} alt="" /> Agregar Imagen
          </label>
        </div>

        <div className="buttons-right">
          <Toaster />
          <button className="btn-restore" onClick={handleLoad}>
            Cargar cambios
          </button>
          <button className="btn-save" onClick={handleSaveChanges}>
            Guardar cambios
          </button>
          <button className="btn-export" onClick={handleGenerateImage}>
            Exportar a JPG
          </button>
          <button className="btn-cancel" onClick={handleClearCanvas}>
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlexWorkProjects;
