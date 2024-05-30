import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Context } from "../index";
import { Card, Row } from "react-bootstrap";

const BrandBar: FC = observer(() => {
  const { device } = useContext(Context);

  return (
    <Row md={device.brands.length} className="d-flex">
      {device.brands.map((brand: any) => (
        <Card
          style={{ cursor: "pointer", textAlign: "center" }}
          key={brand.id}
          className="p-3"
          onClick={() => {
            device.setSelectedBrand(brand);
          }}
          border={brand.id === device.selectedBrand.id ? "primary" : "light"}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  );
});

export default BrandBar;
