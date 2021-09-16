import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Trans } from "@lingui/macro";

const StateFilter = ({ activeState, filterByState, stateOptions }) => (
  <FormControl variant="filled" style={{ maxWidth: "100%" }}>
    <InputLabel id="stateFilter">Location</InputLabel>
    <Select
      labelId="stateFilter"
      value={activeState}
      onChange={filterByState}
      autoWidth={true}
    >
      <MenuItem value={"all"}>
        <Trans>All states</Trans>
      </MenuItem>
      {stateOptions.map((state) => (
        <MenuItem key={state.name} value={state.name} disabled={state.disabled}>
          <Trans id={state.label.id} />
        </MenuItem>
      ))}
    </Select>
    <FormHelperText>
      <Trans>Filter by one of the 16 German states</Trans>
    </FormHelperText>
  </FormControl>
);

export default StateFilter;
