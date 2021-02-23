import React from 'react';
import 'jest-styled-components'
import FlexElement from './FlexElement';
import renderer from 'react-test-renderer'

describe('<FlexElement> component', () => {
  it('should have render', () => {
    const wrapper = renderer.create(<FlexElement />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
