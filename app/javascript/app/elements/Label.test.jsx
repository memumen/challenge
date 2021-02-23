import React from 'react';
import 'jest-styled-components'
import Label from './Label';
import renderer from 'react-test-renderer'

describe('<Label> component', () => {
  it('should have render', () => {
    const wrapper = renderer.create(<Label />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
