import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Message = ({variant, text,close}) =>  <Alert variant={variant}  onClose={close} dismissible>{text}</Alert>

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
