import { render, screen, cleanup } from "@testing-library/react";
import Alert from "../alert";

test('renders with correct alert type', () => {
    const alertType = 'info';
    const alertMessage = 'Coin Transfered';
    render(<Alert alertType={alertType} alertMessage={alertMessage} />);

    const alertTypeElement = screen.getByTestId('alert-type-test-1');
    expect(alertTypeElement).toBeInTheDocument();
    expect(alertTypeElement).toHaveTextContent('info');
});

test('renders with correct alert message', () => {
    const alertType = 'info';
    const alertMessage = 'Coin Transfered';
    render(<Alert alertType={alertType} alertMessage={alertMessage} />);

    const alertMessageElement = screen.getByTestId('alert-message-test-1');
    expect(alertMessageElement).toBeInTheDocument();
    expect(alertMessageElement).toHaveTextContent('Coin Transfered');
});

