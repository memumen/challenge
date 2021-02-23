import React from 'react';
import 'jest-styled-components'
import Title from './Title';
import renderer from 'react-test-renderer'

describe('<Title> component', () => {
  it('should have render', () => {
    const wrapper = renderer.create(<Title />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
