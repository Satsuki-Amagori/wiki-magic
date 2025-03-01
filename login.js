async function displayMagic(username) {
    try {
        console.log("Fetching magic.json...");
        const response = await fetch("magic.json");
        
        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status}`);
        }

        const magicData = await response.json();
        console.log("取得した魔法データ:", magicData);

        const magicList = document.getElementById("magic-list");
        magicList.innerHTML = ""; // 🔴 これがないと前のデータが消えない！

        let hasMagic = false; // 🔵 表示すべき魔法があるか判定

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
