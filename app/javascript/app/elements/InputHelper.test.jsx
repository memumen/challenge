import React from 'react';
import 'jest-styled-components'
import InputHelper from './InputHelper';
import renderer from 'react-test-renderer'

describe('<InputHelper> component', () => {
  it('should have render', () => {
    const wrapper = renderer.create(<InputHelper />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
