class CreateEmployees < ActiveRecord::Migration[7.0]
  def change
    create_table :employees do |t|
      t.string :name
      t.string :email
      t.string :position 
      t.string :password 
      t.string :password_confirmation
      t.timestamps
    end
  end
end
