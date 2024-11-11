import PropTypes from "prop-types";

const Notification = ({ message, type }) => {
    if (!message) {
        return null;
    }

    return (
        <div className={type === 'error' ? 'error-notification' : 'success-notification'}>
        {message}
        </div>
    );
};

Notification.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
};

export default Notification;