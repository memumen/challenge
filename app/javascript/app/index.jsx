import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';

import { Provider } from './helpers/context';
import { Layout, Form, Gallery } from './components';
import { Title } from './elements';

import 'react-toastify/dist/ReactToastify.css';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider>
      <ToastContainer />
      <Layout>
        <Title>Test task with image uploading and deleting</Title>
        <Form />
        <Gallery />
      </Layout>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
  )
});
