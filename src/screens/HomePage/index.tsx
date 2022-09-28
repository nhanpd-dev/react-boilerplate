import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'components/NavBar';
import { Features } from './Features';
import { PageWrapper } from 'components/PageWrapper';

export const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <Features />
      </PageWrapper>
    </>
  );
};
