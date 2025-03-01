async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("users.json");
        if (!response.ok) {
            throw new Error("ユーザーデータを取得できませんでした");
        }

        const data = await response.json();

        if (data.users[username] === password) {
            alert("ログイン成功！");
            // ここでリダイレクトやログイン後の処理を実装
        } else {
            alert("パスワードが違います");
        }
    } catch (error) {
        console.error("エラー:", error);
        alert("ログイン処理中にエラーが発生しました");
    }
}
