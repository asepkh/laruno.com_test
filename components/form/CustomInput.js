import PropTypes from "prop-types";
import { Input, FormFeedback, FormGroup, FormText } from "reactstrap";

const CustomInput = (props) => {
  const { feedback, tooltip, note } = props;
  return (
    <FormGroup>
      <Input {...props} />
      {feedback && <FormFeedback tooltip={tooltip}>{feedback}</FormFeedback>}
      {note && <FormText>{note}</FormText>}
    </FormGroup>
  );
};

CustomInput.propTypes = {
  tooltip: PropTypes.bool,
  note: PropTypes.string,
  feedback: PropTypes.string,
};

CustomInput.defaultProps = {
  tooltip: false,
  note: null,
  feedback: null,
};

export default CustomInput;
