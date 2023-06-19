import Alert from 'react-bootstrap/Alert';

function CustomAlert({ alertType, alertMessage }) {
    return (
        <>
            <Alert data-testid='alert-type-test-1' key={alertType} variant={alertType}>
                <span data-testid='alert-message-test-1'>{alertMessage}!</span>
            </Alert>
        </>
    )
}

export default CustomAlert;