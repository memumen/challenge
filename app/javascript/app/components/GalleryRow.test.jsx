import React from 'react';
import GalleryRow from './GalleryRow';
import { Provider } from '../helpers';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

const item = {
  id: 1,
  byteSize: 1024,
  mimeType: 'image/png'
};

describe('<GalleryRow> component', () => {
  it('should have render', () => {
    const wrapper = renderer.create(
      <Provider>
        <GalleryRow {...item} />
      </Provider>
    ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('handle onClick', () => {
    const { container, getByText } = render(
      <Provider>
        <GalleryRow {...item} />
      </Provider>
    );
    const button = getByText("X");
    fireEvent.click(button);
    expect(button.textContent).toBe("X");
  });
});
