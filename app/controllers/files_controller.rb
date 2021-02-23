# frozen_string_literal: true

class FilesController < ApplicationController
  ERROR_STR = 'Something went wrong'

  def index
    files = ActiveStorage::Attachment.distinct.includes(:blob)
    render json: files.map { |file| metadata(file) }
  end

  def create
    render json: create_blob
  end

  def attachment_create
    task = Task.find_or_create_by({})
    if task.files.attach(params[:blob_id])
      render json: metadata(task.files.last)
    else
      render json: { errors: [ERROR_STR] }, status: :unprocessable_entity
    end
  end

  def destroy
    record = ActiveStorage::Attachment.find(params[:id])
    if record.present? && record.purge
      render json: { id: record.id }
    else
      render json: { errors: record.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def metadata(file)
    blob = file.blob
    {
      id: file.id,
      mimeType: blob.content_type,
      byteSize: blob.byte_size
    }
  end

  def create_blob
    ActiveStorage::Current.host = 'http://localhost:3000'
    blob = ActiveStorage::Blob.create_before_direct_upload!(
      **create_params.to_h.symbolize_keys
    )
    {
      url: blob.service_url_for_direct_upload,
      headers: blob.service_headers_for_direct_upload,
      blob_id: blob.id,
      signed_blob_id: blob.signed_id
    }
  end

  def create_params
    params.require(:file).permit(:byte_size, :checksum, :content_type, :filename)
  end
end
