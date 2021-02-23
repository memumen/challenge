# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'home#index'

  resources :files, only: %i[index create destroy] do
    post :attachment_create, on: :collection
  end
end
