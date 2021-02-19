import { Box } from "@material-ui/core";
import styled from "styled-components";

const Bold = styled(Box).attrs((props) => ({
  component: "span",
  fontWeight: props.weight || 500,
}))``;

export default Bold;
