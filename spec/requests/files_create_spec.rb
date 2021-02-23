require 'rails_helper'

RSpec.describe "FilesCreate", type: :request do
  let(:task) { Task.find_or_create_by({}) }
  let(:params) do
    {
      file: {
        byte_size: 1024,
        checksum: '00000',
        content_type: 'image/png',
        filename: 'test_file.png'
      }
    }
  end

  describe "POST /files" do
    it "responce signed_blob_id" do
      post files_path, params: params, headers: headers
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body).keys).to match_array(["blob_id", "headers", "signed_blob_id", "url"])
    end
  end
end
