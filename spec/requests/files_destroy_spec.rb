require 'rails_helper'

RSpec.describe "FilesDestroy", type: :request do
  let(:task) {Task.find_or_create_by({}) }
  before(:each) do
    task.files.attach(
      io: File.open(Rails.root.join('spec/fixtures/logo.png')),
      filename: 'logo.png',
      content_type: 'image/png'
    )
    @file = task.files.last
  end

  describe "DELETE /files" do
    it "render" do
      delete file_path(@file.id)
      expect(response).to have_http_status(200)
    end
  end

  it "change attachment by 1" do
    expect {
      delete file_path(@file.id)
    }.to change { task.files.count }.by(-1)
  end
end
