require 'rails_helper'

RSpec.describe "FilesAttachmentCreates", type: :request do
  let(:task) {Task.find_or_create_by({}) }
  let(:blob) do
    task.files.attach(
      io: File.open(Rails.root.join('spec/fixtures/logo.png')),
      filename: 'logo.png',
      content_type: 'image/png'
    )
    task.files.last.blob
  end

  let(:params) { { blob_id: blob.signed_id } }

  describe "POST /files/attachment_create" do
    it "render" do
      post attachment_create_files_path, params: params
      expect(response).to have_http_status(200)
    end

    it "change attachment by 1" do
      expect {
        post attachment_create_files_path, params: params
      }.to change { task.files.count }.by(1)
    end
  end
end
