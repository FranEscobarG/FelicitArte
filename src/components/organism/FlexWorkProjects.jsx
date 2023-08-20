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
import { getCard } from "../../api/card";
import { updateCard } from "../../api/card";
const endpoint = "http://localhost:4000/api/upload";

function FlexWorkProjects({projectName}) {
  const [canvas, setCanvas] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentLineWidth, setCurrentLineWidth] = useState(2); // Initial line width
  const [currentFontFamily, setCurrentFontFamily] = useState("Arial");
  const [currentFontSize, setCurrentFontSize] = useState(18);
  const [currentTextAlign, setCurrentTextAlign] = useState("left");
  const [canvasBackgroundColor, setCanvasBackgroundColor] = useState("");
  
  //rama yahirpro
  const [cardList, setCardList] = useState("");
  const [miArreglo, setMiArreglo] = useState([]);


  useEffect(() => {
    console.log("Obteniendo la tarjeta")
    getCardList(); 
  }, []);


  useEffect(() => {
    console.log("Aca debio de recargar porque ya hubo un cambio")
    handleLoad();
  }, [cardList]);

  ///

  useEffect(() => {
    if (canvas) {
      canvas.isDrawingMode = false;
      canvas.freeDrawingBrush.width = currentLineWidth;
    }
  }, [canvas, currentLineWidth]);

  async function getCardList() {
    try{
      const response = await getCard(projectName);
      console.log("Imprimiendo el color de fondo de la BD");
      console.log(response.data.background);
      let imagenes = JSON.parse(response.data.images)
      setMiArreglo(imagenes);
      setCardList(response.data);
      setCanvasBackgroundColor(response.data.background);
    }catch(error){
      console.error("Error fetching cards:", error);
    }
  }

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
      setCanvasBackgroundColor(color);
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
    const fileName = file.name;

    const newFileName = `${projectName}-${fileName}`;
    const modifiedFild = new File([file], newFileName, { type: file.type });
    let formData = new FormData();  
    formData.append("image", modifiedFild);

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
      setMiArreglo([...miArreglo, newFileName]);
      handleAddImage(imageURL);
    }
  };    

  const handleGenerateImage = () => {
    const dataURL = canvas.toDataURL("image/jpeg");
    const a = document.createElement("a");
    a.download = "TarjeaCumple.jpg";
    a.href = dataURL;
    a.click();
  };


  const handleSaveChanges = async() => {
    const objects = canvas.getObjects();
    const canvasData = JSON.stringify(objects);
    console.log("Imprimiendo mi arreglo antes de guardar: ");
    console.log(miArreglo);
    const canvasColor = canvas.backgroundColor; // Obtener el color de fondo del canvas
    console.log("Color de fondo del canvas:",canvasColor); 
    try {
      toast.success("Guardado exitosamente");

      if (canvasBackgroundColor.startsWith("#")){
        console.log("Guardado cambios con color de fondo")
        let cardObject = {
          id: cardList.id,
          canvas_data: canvasData,
          images: miArreglo,
          background: canvas.backgroundColor
        }
        const response = await updateCard(cardList.id, cardObject);
      }else{
        console.log("Guardando cambios con imagen de fondo")
        let cardObject = {
          id: cardList.id,
          canvas_data: canvasData,
          images: miArreglo,
          background: canvasBackgroundColor
        }
        const response = await updateCard(cardList.id, cardObject);
      }

    } catch (error) {
      toast.error("UPSS algo salio mal");
    }
  };

  const handleLoad = () => { 
    if (cardList) {
      ///
      console.log("imprimiendo las imagenes en el handleload");
      console.log(miArreglo);
      let cards = cardList.canvas_data;
      const cardsData = JSON.parse(cards);
      

      ////////
      const orderedObjects = [...cardsData].sort((a, b) => {
        if (a.type === "image" && b.type !== "image") return -1;
        if (a.type !== "image" && b.type === "image") return 1;
        return 0;
      });

      const objectsWithImages = orderedObjects.map((obj, index) => {
        if (obj.type === "image" && miArreglo[index]) {
          return { ...obj, src: `http://localhost:4000/${miArreglo[index]}`,  crossOrigin: "anonymous"  };
        }
        return obj;
      });


     // canvas.loadFromJSON({ objects: objectsWithImages }, canvas.renderAll.bind(canvas));     
      
     if (canvasBackgroundColor.startsWith("#") || !canvasBackgroundColor) {
      console.log("Estás recibiendo un color");
      canvas.loadFromJSON({ objects: objectsWithImages }, () => {
        canvas.setBackgroundColor(canvasBackgroundColor, canvas.renderAll.bind(canvas));
        canvas.renderAll();
      }); 
    } else {
      console.log("Estás recibiendo una imagen");
      canvas.loadFromJSON({ objects: objectsWithImages }, () => {
        fabric.Image.fromURL(`http://localhost:4000/${canvasBackgroundColor}`, function (img) {
           // Configura el atributo crossorigin en "anonymous"
           img.getElement().crossOrigin = "anonymous";

           // Ajusta el tamaño de la imagen al tamaño del lienzo
           img.scaleToWidth(canvas.width);
           img.scaleToHeight(canvas.height);

           // Establece la imagen como fondo del lienzo
           canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        });
      canvas.renderAll();
    });  
    }
  }
  };

  const handleChangeCanvasBackgroundColor = (color) => {
    if (canvas) {
      canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
      setCanvasBackgroundColor(color);
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
        <div className="backgroundcolor">
          <input
            id="background"
            type="color"
            value={canvasBackgroundColor}
            onChange={(e) => handleChangeCanvasBackgroundColor(e.target.value)}
          />
          <label htmlFor="background">Cambiar color de fondo</label>
        </div>

        <div className="buttons-right">
          <Toaster />
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