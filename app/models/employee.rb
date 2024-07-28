class Employee < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  belongs_to :department
  
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :position, presence: true
end
