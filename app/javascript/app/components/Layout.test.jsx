import React from 'react';
import 'jest-styled-components'
import Layout from './Layout';
import renderer from 'react-test-renderer'

describe('<Layout> component', () => {
  it('should have render', () => {
    const wrapper = renderer.create(<Layout />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
