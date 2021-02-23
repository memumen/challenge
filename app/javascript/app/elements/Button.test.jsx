import React from 'react';
import 'jest-styled-components'
import Button from './Button';
import renderer from 'react-test-renderer'

describe('<Button> component', () => {
  it('should have render', () => {
    const wrapper = renderer.create(<Button />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
