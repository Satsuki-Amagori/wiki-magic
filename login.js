async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("users.json");
        if (!response.ok) {
            throw new Error("ユーザーデータを取得できませんでした");
        }
        const users = await response.json();

        if (users.users[username] === password) {
            alert("ログイン成功！");
            localStorage.setItem("loggedInUser", username); // ログイン情報を保存
            displayMagic(username); // 魔法の表示を更新
        } else {
            alert("パスワードが違います");
        }
    } catch (error) {
        console.error("エラー:", error);
        alert("ログイン処理中にエラーが発生しました");
    }
}

// ユーザーに対応する魔法を表示
async function displayMagic(username) {
    try {
        const response = await fetch("magic.json");
        if (!response.ok) {
            throw new Error("魔法データを取得できませんでした");
        }
        const magicData = await response.json();

        const magicList = document.getElementById("magic-list");
        magicList.innerHTML = ""; // 一旦クリア

        magicData.magic.forEach(magic => {
            if (magic.users.includes(username)) {
                const magicItem = document.createElement("div");
                magicItem.innerHTML = `<strong>${magic.name}</strong>: ${magic.effect} (コスト: ${magic.cost})`;
                magicList.appendChild(magicItem);
            }
        });
    } catch (error) {
        console.error("エラー:", error);
        alert("魔法の取得中にエラーが発生しました");
    }
}

// ページ読み込み時にログイン情報があれば魔法を表示
window.onload = function() {
    const username = localStorage.getItem("loggedInUser");
    if (username) {
        displayMagic(username);
    }
};

