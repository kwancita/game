class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :desc, :rate
  has_one :user
end
