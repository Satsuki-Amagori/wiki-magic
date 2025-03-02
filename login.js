async function searchMagic() {
    const magicName = document.getElementById("magic-name").value.trim();
    const errorMessage = document.getElementById("error-message");

    if (!magicName) {
        errorMessage.textContent = "魔法名を入力してください。";
        return;
    }

    try {
        // magic.json に魔法名があるか確認
        const response = await fetch("magic.json");
        if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);
        
        const magicData = await response.json();
        const magicExists = magicData.some(magic => magic.name === magicName);

        if (magicExists) {
            window.location.href = `${magicName}.html`; // ページに移動
        } else {
            errorMessage.textContent = "その名前の魔法は存在しません。";
        }
    } catch (error) {
        console.error("エラー:", error);
        errorMessage.textContent = "データの取得に失敗しました。";
    }
}

// 追加パスワード認証処理
async function checkPassword() {
    const password = document.getElementById("magic-password").value.trim();
    const magicName = document.body.dataset.magic; // HTMLのdata-magic属性に魔法名を格納
    const detailSection = document.getElementById("magic-details");
    const errorMessage = document.getElementById("password-error");

    try {
        const response = await fetch("magic.json");
        if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);

        const magicData = await response.json();
        const magicItem = magicData.find(magic => magic.name === magicName);

        if (magicItem && magicItem.password === password) {
            detailSection.innerHTML = `<p>${magicItem.details}</p>`; // 詳細を表示
        } else {
            errorMessage.textContent = "パスワードが違います。";
        }
    } catch (error) {
        console.error("エラー:", error);
        errorMessage.textContent = "詳細情報の取得に失敗しました。";
    }
}
