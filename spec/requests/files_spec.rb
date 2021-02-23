require 'rails_helper'

RSpec.describe "Files", type: :request do
  describe "GET /files" do
    let(:task) { Task.create }

    it "response 200 and had array of files" do
      task.files.attach(
        io: File.open(Rails.root.join('spec/fixtures/logo.png')),
        filename: 'logo.png',
        content_type: 'image/png'
      )
      files = task.files.map do |file|
        blob = file.blob
        {
          id: file.id,
          mimeType: blob.content_type,
          byteSize: blob.byte_size
        }
      end
      get files_path
      expect(response).to have_http_status(200)
      expect(response.body).to eq(files.to_json)
    end
  end
end
