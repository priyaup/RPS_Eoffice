Rails.application.routes.draw do
  get 'admin/index'

  get 'member/:id', to: 'members#show', as: 'member'

  namespace :admin do
    resources :users, only: [:index]
  end
  
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords',
  }

  root 'home#index'

   resources :tracks
   resources :employees
   resources :departments
   resources :certificates

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
