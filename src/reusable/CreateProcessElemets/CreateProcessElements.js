import "./createElements.scss";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const CreateElementDesc = ({ fun, title }) => {
  return (
    <div className="desc_input_element">
      <textarea
        type="text"
        placeholder={title}
        onChange={(e) => fun(e.target.value)}
      />
    </div>
  );
};

const CreateElementDate = ({ date, fun }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker value={date} onChange={fun} />
    </MuiPickersUtilsProvider>
  );
};

const CreateElementTitle = ({ fun, title }) => {
  return (
    <div className="title_input_element">
      <input
        type="text"
        placeholder={title}
        onChange={(e) => fun(e.target.value)}
      />
    </div>
  );
};

const CreateElementTeamInput = ({ data, fun }) => {
  return (
    <Autocomplete
      multiple
      id="tags-standard"
      options={data}
      onChange={(item, value) => {
        fun(value);
      }}
      getOptionLabel={(option) => option.first_name}
      defaultValue={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label=""
          placeholder="Members"
        />
      )}
    />
  );
};

const CreateElementProjectLeadInput = ({ data, fun }) => {
  return (
    <Autocomplete
      multiple
      id="tags-standard"
      options={data}
      onChange={(item, value) => {
        fun(value);
      }}
      getOptionLabel={(option) => option.first_name}
      defaultValue={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label=""
          placeholder="Project Lead"
        />
      )}
    />
  );
};

export {
  CreateElementTitle,
  CreateElementDesc,
  CreateElementTeamInput,
  CreateElementProjectLeadInput,
  CreateElementDate,
};
