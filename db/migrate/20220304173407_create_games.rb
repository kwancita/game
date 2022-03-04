class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :name
      t.string :image
      t.string :desc
      t.integer :rate

      t.timestamps
    end
  end
end
