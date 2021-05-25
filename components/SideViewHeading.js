import { Trans } from "@lingui/macro";
import { Box, Button, Divider, Typography } from "@material-ui/core";
import Bold from "components/Bold";

const SideViewHeading = ({ image, title, onClose }) => (
  <>
    <Box padding={2} bgcolor="#202029" color="white">
      {onClose && (
        <Box style={{ float: "right" }}>
          <Button onClick={onClose} style={{ color: "#ffffff9c" }}>
            <Trans>Close</Trans>
          </Button>
        </Box>
      )}
      {typeof image === "string" ? (
        <img src={image} style={{ height: "100px", maxWidth: "100%" }} />
      ) : (
        image
      )}
      <Box marginTop={2}>
        <Typography variant="body1">
          <Bold fontSize="h3.fontSize">{title}</Bold>
        </Typography>
      </Box>
    </Box>
    <Divider />
  </>
);

export default SideViewHeading;
