/* eslint-disable import/no-extraneous-dependencies */
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-font/dist/css/bpmn-embedded.css";
import BpmnColorPickerModule from "bpmn-js-color-picker/colors";
import React from "react";
import { Button } from "@mui/material";
import { INITIAL_XML } from "../const";
import "bpmn-js-color-picker/colors/color-picker.css";
import "diagram-js-minimap/assets/diagram-js-minimap.css";
import "@bpmn-io/properties-panel/assets/properties-panel.css";
import { createDiagramm, fetchDiagramm } from "../http/diagrammApi";
import DataTables from "../pages/DataTables";
import { ADMIN_ROUTE, LOGIN_ROUTE } from "../utils/constr";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from "bpmn-js-properties-panel";
import minimapModule from "diagram-js-minimap";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import StorageIcon from "@mui/icons-material/Storage";
import ImageIcon from "@mui/icons-material/Image";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const BpmnEditor: FC = observer(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  // подтягивать схему из глобального хранилища
  // const { diagramm } = useContext(Context);

  const [bpmnDiagram, setDiagramBpmn] = useState("");

  const { user } = useContext(Context);
  const navigate = useNavigate();
  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    navigate(LOGIN_ROUTE);
  };

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
        parent: "#properties",
      },
      additionalModules: [
        BpmnColorPickerModule,
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        minimapModule,
      ],
      // moddleExtensions: {
      //   magic: MagicModdleDescriptor,
      // },
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

  const handleFileInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    []
  );

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

  const addModelToDb = useCallback(async () => {
    let xml = "";
    await bpmn.saveXML({ format: false }).then((result) => {
      if (result.xml) {
        xml = result.xml;
      }
    });
    createDiagramm({
      model: xml,
      // name: добавлять имя из диалога
      // как сделаешь в таблицу выводить Имя
    }).then((data) => {});
  }, [bpmn]);

  const getModelById = useCallback(async (id: number) => {
    await fetchDiagramm(id).then((data) => {
      setDiagramBpmn(data.model);
    });
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          background: "grey",
        }}
      >
        {user.isAuth ? (
          <>
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: 5 }}
              onClick={() => navigate(ADMIN_ROUTE)}
            >
              Admin
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: 5 }}
              onClick={() => logOut()}
            >
              Exit
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: 5 }}
            onClick={() => navigate(LOGIN_ROUTE)}
          >
            Authorization
          </Button>
        )}
      </div>
      <Button variant="contained" style={{ margin: 20 }}>
        <label htmlFor="file">
          <FolderOpenIcon />
          Open
        </label>
      </Button>
      <input
        id="file"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />
      <Button variant="contained" style={{ margin: 5 }} onClick={saveBpmn}>
        <SaveAltIcon /> Save
      </Button>
      <Button variant="contained" style={{ margin: 5 }} onClick={addModelToDb}>
        <StorageIcon />
        Save to DB
      </Button>
      <Button variant="contained" style={{ margin: 20 }} onClick={saveSvg}>
        <ImageIcon />
        Save svg
      </Button>
      <Button
        variant="outlined"
        style={{ margin: 5 }}
        onClick={() => {
          bpmn.importXML(INITIAL_XML);
          // setDiagramBpmn("");
        }}
      >
        <DeleteOutlineIcon />
        Clear
      </Button>
      <div
        style={{
          width: "100%",
          height: 800,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{ width: "100%", height: 800, display: "flex" }}
          ref={containerRef}
          className="bpmn-editor"
        />
        <div id="properties" />
      </div>
      <DataTables getModelById={getModelById} />
    </>
  );
});

export default BpmnEditor;
