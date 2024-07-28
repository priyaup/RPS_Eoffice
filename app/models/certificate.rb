class Certificate < ApplicationRecord
  belongs_to :user
  validates :child_name, presence: true
  validates :father_name, presence: true
  validates :mother_name, presence: true
  validates :Dob, presence: true
  validates :time, presence: true
  validates :gender, presence: true
  validates :place_of_birth, presence: true
end
