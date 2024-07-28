class CreateCertificates < ActiveRecord::Migration[7.0]
  def change
    create_table :certificates do |t|
      t.string :child_name
      t.string :father_name
      t.string :mother_name
      t.string :gender
      t.time :time
      t.date :Dob
      t.string :place_of_birth
      t.timestamps
    end
  end
end
