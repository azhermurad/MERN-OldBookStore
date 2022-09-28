import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Message = ({variant, text}) =>  <Alert variant={variant}>{text}</Alert>

Message.propTypes = {
    variant: PropTypes.string.isRequired ,
    // propBool: PropTypes.bool.isRequired,
    // propFunc: PropTypes.func,
    // propNumber: PropTypes.number,
    // propString: PropTypes.string,
}
Message.defaultProps = {
    variant: 'danger',
};
export default Message;
