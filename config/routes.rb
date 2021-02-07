Rails.application.routes.draw do
  root to: "posts#index"
  post "posts", to: "posts#create"
  get "posts/:id", to: "posts#checked"
end


  # ルーティング設定
  # HTTPメソッド "URIパターン", to: "コントローラー名#アクション名"
