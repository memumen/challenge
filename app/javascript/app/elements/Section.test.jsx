import React from 'react';
import 'jest-styled-components'
import Section from './Section';
import renderer from 'react-test-renderer'

describe('<Section> component', () => {
  it('should have render', () => {
    const wrapper = renderer.create(<Section />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
