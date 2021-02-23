import React from 'react';
import 'jest-styled-components'
import HeaderFour from './HeaderFour';
import renderer from 'react-test-renderer'

describe('<HeaderFour> component', () => {
  it('should have render', () => {
    const wrapper = renderer.create(<HeaderFour />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
