// import '@styles/tailwind.css';
import React from 'react';
import MainLayout from '@layout/MainLayout';
import DefaultLayout from '@layout/DefaultLayout';
import { Provider } from 'react-redux';
import { wrapper, store } from '../store';

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || DefaultLayout;

  return (
    <>
      <Provider store={store}>
        <MainLayout>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MainLayout>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
