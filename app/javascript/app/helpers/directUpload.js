import { BlobUpload } from '@rails/activestorage/src/blob_upload';
import { FileChecksum } from '@rails/activestorage/src/file_checksum';

import { attachmentCreatePath, fecthPath } from '../constants/api';

const calculateChecksum = (file) => {
  return new Promise((resolve, reject) => {
    FileChecksum.create(file, (error, checksum) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(checksum);
      return;
    });
  });
};

const getToken = () => {
  return window.document.querySelector("meta[name='csrf-token']").getAttribute("content");
};

const blobUpload = ({ url, headers, file, progress = () => {} }) => {
  const upload = new BlobUpload({ file, directUploadData: { url, headers } })
  upload.xhr.upload.onprogress = (event) => progress(event);
  return new Promise((resolve, reject) => {
    upload.create((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'X-CSRF-Token': getToken()
  }
};

const sendGetRequest = async ({ url }) => {
  const response = await fetch(url);
  return await response.json();
};

const sendDeleteRequest = async ({ url }) => {
  const response = await fetch(
    url,
    {
      method: 'DELETE',
      headers: getHeaders()
    },
  );
  return await response.json();
}

const sendPostRequest = async ({ url, body }) => {
  const response = await fetch(
    url,
    {
      method: 'POST',
      cache: 'no-cache',
      headers: getHeaders(),
      body: JSON.stringify(body)
    },
  );
  return await response.json();
};

const attachToRecord = ({ signed_blob_id, fileName }) => {
  return sendPostRequest({
    url: attachmentCreatePath(),
    body: {
      name: fileName,
      record_type: 'Task',
      blob_id: signed_blob_id
    }
  });
};

const getSignedBlob = ({ checksum, file }) => {
  return sendPostRequest({
    url: fecthPath(),
    body: {
      checksum, filename: file.name, content_type: file.type, byte_size: file.size
    }
  });
};

const directUpload = async (name, file, dispatch, progress = () => {}) => {
  try {
    const checksum = await calculateChecksum(file);
    const blob = await getSignedBlob({ checksum, file });
    if (blob.errors) {
      throw blob.errors;
      return;
    }
    const { url, headers, signed_blob_id } = blob;
    await blobUpload({ url, headers, file, progress });
    return await attachToRecord({ signed_blob_id, fileName: file.name });
  } catch (error) {
    throw error;
  }
};

export { directUpload, sendGetRequest, sendDeleteRequest };
