class User < ApplicationRecord
  has_many :certificates ,dependent: :destroy
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable ,:trackable


         validates :name , :address,:pincode ,:email ,:phone_number,presence:true
end
