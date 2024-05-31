import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Button,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useState } from "react";
import { Context } from "../index";
import { fetchDiagramms } from "../http/diagrammApi";
type Props = {
  getModelById?: (id: number) => void;
};

const DataTables: FC<Props> = observer(({ getModelById }) => {
  const { diagramm } = useContext(Context);
  const [dbDiagrams, setDbDiagrams] = useState<any[]>([]);
  useEffect(() => {
    fetchDiagramms().then((data) => {
      setDbDiagrams(data);
    });
  }, [diagramm]);

  return (
    <>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Наименование</TableCell>
            <TableCell>Дата Создания</TableCell>
            <TableCell>++++</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dbDiagrams.map((row) => (
            <TableRow
              key={row.id}
              // onClick={() => setSelected(row)}
              style={
                {
                  //   backgroundColor: selected?.id === row.id ? "#e9ecef" : "#fff",
                }
              }
            >
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    getModelById?.(row.id);
                  }}
                >
                  Отобразить на дигарамме
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </>
  );
});
export default DataTables;
