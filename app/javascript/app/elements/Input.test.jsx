import React from 'react';
import 'jest-styled-components'
import Input from './Input';
import renderer from 'react-test-renderer'

describe('<Input> component', () => {
  it('should have render', () => {
    const wrapper = renderer.create(<Input />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
