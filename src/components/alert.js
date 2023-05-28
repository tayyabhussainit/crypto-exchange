import Alert from 'react-bootstrap/Alert';

function CustomAlert({ alertType, alertMessage }) {
    return (
        <>
            <Alert key={alertType} variant={alertType}>
                {alertMessage}!
            </Alert>
        </>
    )
}

export default CustomAlert;