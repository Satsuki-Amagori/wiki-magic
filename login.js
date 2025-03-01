document.getElementById("loginButton").addEventListener("click", login);

async function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        console.log("Fetching users.json...");
        const response = await fetch("users.json");
        if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);

        const usersData = await response.json();
        console.log("取得したユーザーデータ:", usersData);

        // ユーザー認証
        const user = usersData.users.find(user => user.username === username && user.password === password);
        if (!user) {
            alert("ユーザー名またはパスワードが間違っています");
            return;
        }

        console.log(`ログイン成功: ${username}`);
        displayMagic(username);

    } catch (error) {
        console.error("エラー:", error);
        alert("ログイン処理中にエラーが発生しました");
    }
}

async function displayMagic(username) {
    try {
        console.log("Fetching magic.json...");
        const response = await fetch("magic.json");
        if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);

        const magicData = await response.json();
        console.log("取得した魔法データ:", magicData);

        const magicList = document.getElementById("magic-list");
        magicList.innerHTML = ""; // 既存のリストをクリア

        let hasMagic = false;

        magicData.magic.forEach(magic => {
            if (magic.users.includes(username)) {
                hasMagic = true;
                const magicItem = document.createElement("div");
                magicItem.innerHTML = `<strong>${magic.name}</strong>: ${magic.effect} (コスト: ${magic.cost})`;
                magicList.appendChild(magicItem);
            }
        });

        if (!hasMagic) {
            magicList.innerHTML = "<p>閲覧可能な魔法はありません</p>";
        }

        console.log("魔法を表示しました");

    } catch (error) {
        console.error("エラー:", error);
        alert("魔法の取得中にエラーが発生しました");
    }
}
