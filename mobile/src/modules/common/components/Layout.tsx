import React from 'react';
import { Root } from 'native-base';
import { Container } from 'native-base';
import Navigation from '../../../navigation';

export const Layout = () => {
  return (
    <Root>
      <Container>
        <Navigation />
      </Container>
    </Root>
  );
};
