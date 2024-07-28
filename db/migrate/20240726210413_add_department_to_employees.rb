class AddDepartmentToEmployees < ActiveRecord::Migration[6.0]
  def change
    add_reference :employees, :department, foreign_key: true
  end
end

