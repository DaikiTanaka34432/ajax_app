class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end

  #checkedアクションの編集、既読の操作を行った時に実行される 
  def checked
  # ルーティングで設定したURLパラメーターから、既読したメモのidが渡されるように設定→メモのidを使用して該当するレコードを取得
    post = Post.find(params[:id])
    # 既読か否かを判定する
    if post.checked
      # 既読であれば「既読を解除するためにfalseへ変更」
      post.update(checked: false)
    else
      # 既読でなければ「既読にするためtrueへ変更」
      post.update(checked: true)
    end
# クリックしたメモのレコードをitemにて取得
    item =Post.find(params[:id])
    # JSON形式でデータを返却
    render json: {post: item}
    # 既読に更新されたレコード（item)がJSにレスポンスとして返される
  end
end

# コントローラーの生成
# rails g controller コントローラー名

# アクションの設定
# インスタンスをメソッドで定義するだけ