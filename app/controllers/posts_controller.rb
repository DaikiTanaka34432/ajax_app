class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end

end

# コントローラーの生成
# rails g controller コントローラー名

# アクションの設定
# インスタンスをメソッドで定義するだけ