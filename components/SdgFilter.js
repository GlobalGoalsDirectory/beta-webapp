import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Trans } from "@lingui/macro";

const SdgFilter = ({ activeSdg, filterBySdg, sdgOptions }) => (
  <FormControl variant="filled" style={{ maxWidth: "100%" }}>
    <InputLabel id="sdgFilter">
      <Trans>Focus</Trans>
    </InputLabel>
    <Select
      labelId="sdgFilter"
      value={activeSdg}
      onChange={filterBySdg}
      autoWidth={true}
    >
      <MenuItem value={"all"}>
        <Trans>All SDGs</Trans>
      </MenuItem>
      {sdgOptions.map((sdg) => (
        <MenuItem key={sdg.number} value={sdg.number} disabled={sdg.disabled}>
          <Trans>SDG {sdg.number}:</Trans> <Trans id={sdg.label.id} />
        </MenuItem>
      ))}
    </Select>
    <FormHelperText>
      <Trans>Filter by one of the 17 Sustainable Development Goals</Trans>
    </FormHelperText>
  </FormControl>
);

export default SdgFilter;
