class AddUserIdToCertificates < ActiveRecord::Migration[7.0]
  def change
    add_column :certificates, :user_id, :integer
  end
end
