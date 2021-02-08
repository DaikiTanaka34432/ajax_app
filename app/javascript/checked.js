// checkという関数名を付けてあげる。
function check() {
  // htmlのpostセレクタを持つ全要素を取得、定数postsで定義
  const posts = document.querySelectorAll(".post");
  // 各要素を１つずつ(post)引数に入れて以下の処理をする
  posts.forEach(function (post){ 
    // 要素に"data-load"が追加されていないか？
    if (post.getAttribute("data-load") != null){
    //２回目以降は空ではない、とtrueになりnullが返り処理が止まる
      return null;  
    }
    // data-load"が追加されてなかったら、("属性名data-load", "属性値true")を設定し
    post.setAttribute("data-load", "true");
    // 要素がクリックされたら以下の処理を行う
    post.addEventListener("click", () => {
      // カスタムデータ"data-id"を持つ要素を取得しpostIdと定義する
      const postId = post.getAttribute("data-id");
      // エンドポイントを呼び出すためのXMLHttpRequestのオブジェクトを新しく生成する、XHRと定義
      const XHR = new XMLHttpRequest();
      // リクエストの再指定（data-idを持つ要素の非同期通信ONですよ）
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンス形式はjsonですよ
      XHR.responseType = "json";
      // リクエストの送信
      XHR.send();
      // レスポンスなどの受信が成功したら以下の処理を行う
      // （コントローラーからのrender jsonで値が返された時）
      XHR.onload =() =>{
        // レスポンスがエラー（ステータスコードが200以外）だったら
        if (XHR.status != 200){
          // エラーが生じたオブジェクトに含まれるerror messageを表示
          alert(`Error ${XHR.status}: ${XHR.statusText}`)
          // エラーが起きたら処理から抜け出して以降の処理をしない
          return null;
        }
        // レスポンスされたデータ{post: item}を変数itemに代入している
        const item =XHR.response.post;
        // もし返されたデータが既読であれば
        if(item.checked === true){
          // data-checkの属性値にtrueをセット
          post.setAttribute("data-check", "true");
         // もし返されたデータが未読なら
        }else if(item.checked === false){
          // "data-check"ごと削除
          post.removeAttribute("data-check");
        }
      };
    });
  }); 
}
setInterval(check, 1000);