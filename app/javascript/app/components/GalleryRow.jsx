import React from 'react';

import { useDispatch, sendDeleteRequest } from '../helpers';
import { deletePath } from '../constants/api';

import { FlexContainer, FlexElement, ButtonDanger } from '../elements';

const GalleryRow = ({ id, byteSize, mimeType }) => {
  const dispatch = useDispatch();

  const handleOnClick = async () => {
    try {
      const response = await sendDeleteRequest({ url: deletePath(id) });
      if (response.errors) throw response.errors.join('. ');
      dispatch({ type: 'successMessage', message: 'File has been successfully deleted' });
      dispatch({ type: 'removeFile', file: response });
    } catch (error) {
      dispatch({ type: 'errorMessage', message: error });
    }
  };

  return (
    <FlexContainer>
      <FlexElement>{mimeType}</FlexElement>
      <FlexElement>{(byteSize / 1024).toFixed(2)}Kb</FlexElement>
      <FlexElement>
        <ButtonDanger type="button" onClick={handleOnClick}>X</ButtonDanger>
      </FlexElement>
    </FlexContainer>
  )
};

export default GalleryRow;
