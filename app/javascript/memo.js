function memo(){
  const submit = document.getElementById("submit")
  submit.addEventListener("click", (e) =>{
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () =>{
      if (XHR.status != 200){
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      // レスポンスとして返されたメモのレコードデータをitemで取得
      const item =XHR.response.post;
      // HTMLを描画する場所を指定する際に使用する「描画する親要素」のlist要素をlistで取得
      const list =document.getElementById("list");
      // メモのフォームをformTextで取得
      // （送信後に入力フォームの文字列を削除するため）
      const formText = document.getElementById("content");
      // メモとして描画する部分のHTMLを定義（新規投稿メモ）
      const HTML = `
      <div class ="post" data-id =${item.id}>
        <div class ="post-data">
          投稿日時:${item.created_at}
        </div>
        <div class="post-content">
         ${item.content}
        </div>
      </div>`;
      // list要素に対し、insertAdjacentHTMLでlist要素の直後に上のHTMLを挿入
      list.insertAdjacentHTML("afterend", HTML);
      // メモの入力フォームに入力されたままの文字を空の文字列で上書きしてリセットする
      formText.value ="";
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);