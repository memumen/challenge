# frozen_string_literal: true

class Task < ApplicationRecord
  has_many_attached :files
end
