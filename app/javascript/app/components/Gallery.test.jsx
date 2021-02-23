import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './Gallery';
import { Provider } from '../helpers';
import renderer from 'react-test-renderer';

describe('<GalleryRow> component', () => {
  it('should have render', () => {
    const wrapper = renderer.create(
      <Provider>
        <Gallery />
      </Provider>
    ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
