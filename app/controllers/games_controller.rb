class GamesController < ApplicationController
    def index
        render json: current_user.games.all
    end

    def show
        game = find_game
        render json: game
    end
    
    def create
        game = current_user.games.create!(game_params)
        render json: game, status: :created
    end

    def update
        game = find_game
        game.update!(game_params)
        render json: game, status: :ok
    end

    def destroy
        game = find_game
        game.destroy
        head :no_content
    end

    private

    def find_game
        Game.find(params[:id])
    end

    def game_params
        params.permit(:name, :image, :desc, :rate)
    end
end
