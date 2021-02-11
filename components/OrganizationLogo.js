import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import { getLogo } from "helpers/organization";

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
    font-size: ${(props) => props.styled.size / 48}rem;
    height: ${(props) => props.styled.size}px;
    width: ${(props) => props.styled.size}px;
  }
`;

const OrganizationLogo = ({ size, organization }) => {
  const { name } = organization;

  return (
    <Logo
      src={getLogo(organization)}
      styled={{ size, color: stringToColour(name) }}
    >
      {name
        .split(" ")
        .map((w) => w[0])
        .splice(0, 3)
        .join("")}
    </Logo>
  );
};

export default OrganizationLogo;
