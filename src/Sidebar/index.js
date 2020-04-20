import React from "react";
import { Box } from "rebass";
import * as icons from "react-icons/fa";
import { useTheme } from "emotion-theming";
import styled from "@emotion/styled";
import data from "../data2";

const ActionButton = ({ id, highlight, color, size, ...remainingProps }) => {
  const Icon = icons[id];
  return (
    <Box
      py={3}
      sx={{
        cursor: "pointer",
        ":hover": {
          background: highlight ? "highlight" : "initial"
        }
      }}
      {...remainingProps}
    >
      <Icon
        size={
          {
            big: "30"
          }[size]
        }
        color={color}
      />
    </Box>
  );
};
export const SideBar = () => {
  const { sidenav } = data.navigation;
  return (
    <Box height={"100vh"} bg={"primary"}>
      <Box p={2} />
      {sidenav.map(menu => (
        <ActionButton {...menu.icon} size={"big"} highlight={false} />
      ))}
    </Box>
  );
};
