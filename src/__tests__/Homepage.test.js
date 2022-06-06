import { render, fireEvent, screen } from "@testing-library/react";
import Homepage from '../pages/Homepage'

test("Search" , () => {
    render(<Homepage />)

    // const search = screen.getByTestId('search');
    const filter = screen.getByTestId('filter');
    const order = screen.getByTestId('order');

    fireEvent.click(order);

    // expect(counter).toHaveTextContent("");
});