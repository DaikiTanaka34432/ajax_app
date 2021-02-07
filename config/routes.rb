Rails.application.routes.draw do
  root to: "posts#index"
  post "posts", to: "posts#create"
  # 既読機能のエンドポイントをpathパラメーターで記述↓
  get "posts/:id", to: "posts#checked"
end


  # ルーティング設定
  # HTTPメソッド "URIパターン", to: "コントローラー名#アクション名"
