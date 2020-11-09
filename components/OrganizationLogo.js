import { Avatar } from "@material-ui/core";
import styled from "styled-components";

// From: https://stackoverflow.com/a/16348977/6451879
var stringToColour = function (str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = "#";
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};

const Logo = styled(Avatar).attrs((props) => ({
  variant: "square",
  style: {
    color: props.theme.palette.getContrastText(props.styled.color),
    backgroundColor: props.styled.color,
  },
}))`
  && {
    height: 64px;
    width: 64px;
  }
`;

const OrganizationLogo = ({ children }) => {
  const name = children.toString();

  return (
    <Logo styled={{ color: stringToColour(name) }}>
      {name
        .split(" ")
        .map((w) => w[0])
        .splice(0, 3)
        .join("")}
    </Logo>
  );
};

export default OrganizationLogo;
