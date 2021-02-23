import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';
import { Provider } from '../helpers';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

describe('<Form> component', () => {
  it('should have render', () => {
    const wrapper = renderer.create(
      <Provider>
        <Form />
      </Provider>
    ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('handle Submit', () => {
    const { container, getByRole } = render(
      <Provider>
        <Form />
      </Provider>
    );
    const button = getByRole("button");
    fireEvent.click(button);
    expect(button.textContent).toBe("Upload");
  });
});
