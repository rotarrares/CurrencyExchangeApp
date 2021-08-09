import {render} from "@testing-library/react";
import React from "react";
import ReactDOM from 'react-dom'
import {Header} from "./Header";

test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Header/>, div)
    ReactDOM.unmountComponentAtNode(div)

});

test('renders header correctly', () => {
    const { getByText,getByTestId } = render(
        <Header/>
    );
    expect(getByTestId("Header"))
    expect(getByText("Currency Exchange")).toBeInTheDocument();
})
