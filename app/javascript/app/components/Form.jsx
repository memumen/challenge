import React, { useState } from 'react';

import { directUpload, Provider, useDispatch } from '../helpers';
import {
  Section, Label, Input, InputHelper, InvalidHelper, Button, Title
} from '../elements';

const initialValues = { file: [] };
const allowedExtensions =  /(jpg|jpeg|png|gif)$/i;

const Form = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(initialValues);
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleFile = (event) => {
    event.persist();
    const { target, target: { files, name } } = event;
    target.setCustomValidity('');
    setIsValid(true);
    setInputs(inputs => ({ ...inputs, [name]: [...files] }));
  };

  const uploadFile = async (file) => {
    try {
      const result = await directUpload(file.name, file, dispatch);
      dispatch({ type: 'addFile', file: result });
      dispatch({ type: 'successMessage', message: 'File has been successfully uploaded.' });
    } catch (error) {
      dispatch({ type: 'errorMessage', message: error.join('. ') });
    }
  };

  const uploadFiles = async (files) => {
    setLoading(true);
    await[...inputs.file].forEach((file) => {
      uploadFile(file)
    });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const { target, target: { elements: { fileInput } } } = event;
    const validateImages = [...inputs.file].every(file => allowedExtensions.test(file.type));
    if (!validateImages) {
      setIsValid(false);
      fileInput.setCustomValidity('error');
    } else {
      uploadFiles(inputs.file);
      setInputs(inputs => (initialValues));
      setLoading(false);
      fileInput.value = "";
    }
    target.classList.add('was-validated');
  };

  return (
    <Section>
      <form onSubmit={handleSubmit} autoComplete="off" noValidate>
        <div>
          <Label htmlFor="fileInput">Select image</Label>
          <Input type="file" id="fileInput" name="file" onChange={handleFile} />
          {!isValid && <InvalidHelper>Please choose a valid file.</InvalidHelper>}
          <InputHelper>Allowed formats: (gif, jpeg, tiff)</InputHelper>
          <Button type="submit" disabled={loading || inputs.file.length === 0}>Upload</Button>
        </div>
      </form>
    </Section>
  )
};

export default Form;
