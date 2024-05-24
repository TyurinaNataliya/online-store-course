/* eslint-disable import/no-extraneous-dependencies */
import { FC, useCallback, useEffect, useRef, useState } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-font/dist/css/bpmn-embedded.css";
import BpmnColorPickerModule from "bpmn-js-color-picker/colors";
import React from "react";
import { Button } from "@mui/material";
import { INITIAL_XML } from "../const"; 
// import {BpmnPropertiesPanelModule} from "bpmn-js-properties-panel";
// import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";



const BpmnEditor: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [bpmnDiagram, setDiagramBpmn] = useState("");
 

  // создаем фиктивный моделлер
  const [bpmn, setBpmn] = useState<BpmnModeler>(() => new BpmnModeler());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const bpmnModeler = new BpmnModeler({
      container: container,
      propertiesPanel: {
        parent: "#properties-panel",
      },
      additionalModules: [BpmnColorPickerModule],
    });

    // Load BPMN XML or create a new diagram
    bpmnModeler.importXML(bpmnDiagram || INITIAL_XML);

    // записываем в фиктивный наш инициализированный
    setBpmn(bpmnModeler);
    // Clean up on unmount
    return () => {
      bpmnModeler.destroy();
    };
  }, [bpmnDiagram]);

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          const content = event.target.result as string;
          setDiagramBpmn(content);
        }
      };
      reader.readAsText(file);
    }
  };

  // функция сохранения диаграммы
  const saveBpmn = useCallback(async () => {
    // можно попробовать пердать в app но пусть будет тут пока
    const element = document.createElement("a");
    await bpmn.saveXML({ format: true }).then((result) => {
      if (result.xml) {
        const file = new Blob([result.xml], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "mytextfile.bpmn";
        document.body.appendChild(element);
        element.click();
      }
    });
  }, [bpmn]);

  // функция сохранения диаграммы
  const saveSvg = useCallback(async () => {
    // можно попробовать пердать в app но пусть будет тут пока
    const element = document.createElement("a");
    await bpmn.saveSVG().then((result) => {
      if (result.svg) {
        const file = new Blob([result.svg]);
        element.href = URL.createObjectURL(file);
        element.download = "myfile.svg";
        document.body.appendChild(element);
        element.click();
      }
    });
  }, [bpmn]);

  return (
    <>
      <div
        ref={containerRef}
        style={{ width: "100%", height: 800 }}
        className="bpmn-editor"
      />

      <Button
        variant="contained"
        style={{ margin: 20 }}
      >
        <label htmlFor="file">Открыть файл</label>
      </Button>
      <input
        id="file"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />

      <Button variant="contained" style={{ margin: 5 }} onClick={saveBpmn}>
        Сохранить BPMN
      </Button>
      <Button variant="contained" style={{ margin: 20 }} onClick={saveSvg}>
        Сохранить SVG
      </Button>
      <Button
        variant="outlined"
        style={{ margin: 5 }}
        onClick={() => {
          bpmn.importXML(INITIAL_XML);
          // setDiagramBpmn("");
        }}
      >
        Очистить
      </Button>
    </>
  );
};

export default BpmnEditor;
