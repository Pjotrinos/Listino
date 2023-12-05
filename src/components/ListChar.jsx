import React from "react";

import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from "recharts";
import { Button, Tooltip } from "@nextui-org/react";
import { mdiChartDonut } from "@mdi/js";
import Icon from "@mdi/react";

function ListChar({ data }) {
  const result = Object.groupBy(data, ({ isDone }) => isDone);

  console.log(result);
  const AAA = [
    { name: "Done", value: result["true"]?.length ?? 0 },
    { name: "Undone", value: result["false"]?.length ?? 0 },
  ];

  const COLORS = ["#18c964", "#f31260"];

  return (
    <Tooltip
      placement={"bottom"}
      showArrow
      content={
        <ResponsiveContainer width={300} height={300}>
          <PieChart>
            <Pie
              label
              data={AAA}
              cx="50%"
              cy="50%"
              labelLine={true}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              isAnimationActive={false}
              fill="#8884d8"
              dataKey="value"
            >
              {AAA.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      }
      closeDelay={500}
    >
      <Button
        variant="flat"
        isDisabled={result["false"] === undefined && result["true"] === undefined ? true : false}
        isIconOnly
        color={
          result["true"]?.length > result["false"]?.length || result["false"] === undefined
            ? result["false"] === undefined && result["true"] === undefined ? "default" :"success"
            : "danger"
        }
        className="capitalize"
      >
        <Icon path={mdiChartDonut} size={1} />
      </Button>
    </Tooltip>
  );
}

export default ListChar;
