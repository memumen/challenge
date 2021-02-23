import React from 'react';
import 'jest-styled-components'
import ButtonDanger from './ButtonDanger';
import renderer from 'react-test-renderer'

describe('<ButtonDanger> component', () => {
  it('should have render', () => {
    const wrapper = renderer.create(<ButtonDanger />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
