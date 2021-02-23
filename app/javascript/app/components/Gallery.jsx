import React, { useEffect } from 'react';

import { useState, useDispatch, sendGetRequest } from '../helpers';
import { fecthPath } from '../constants/api';

import { Section, HeaderFour } from '../elements';
import GalleryRow from './GalleryRow';

const fetchFiles = async ({ dispatch }) => {
  try {
    const files = await sendGetRequest({ url: fecthPath() });
    dispatch({ type: 'updateFiles', files });
  } catch (error) {
    dispatch({ type: 'errorMessage', message: error });
  }
};

const Gallery = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchFiles({ dispatch });
  }, []);

  const { files } = useState();

  return (
    <Section>
      <HeaderFour>Gallery</HeaderFour>
      {files.length > 0 ?
        files.map(file => <GalleryRow key={file.id} {...file}/>)
        :
        <div>No files</div>
      }
    </Section>
  )
};

export default Gallery;
