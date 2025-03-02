async function loadMagic() {
    const magicName = sessionStorage.getItem("selectedMagic");
    if (!magicName) {
        document.body.innerHTML = "<h2>魔法が選択されていません</h2>";
        return;
    }

    try {
        const response = await fetch("magic.json");
        const magicData = await response.json();

        if (magicData[magicName]) {
            document.getElementById("magic-title").textContent = magicData[magicName].name;
            document.getElementById("magic-description").textContent = magicData[magicName].description;
            document.getElementById("magic-cost").textContent = "コスト: " + magicData[magicName].cost;
            sessionStorage.setItem("magicPassword", magicData[magicName].password);
            sessionStorage.setItem("magicDetails", magicData[magicName].details);
        } else {
            document.body.innerHTML = "<h2>魔法のデータが見つかりません</h2>";
        }
    } catch (error) {
        console.error("エラー:", error);
        document.body.innerHTML = "<h2>データの取得に失敗しました</h2>";
    }
}

function checkPassword() {
    const inputPassword = document.getElementById("magic-password").value.trim();
    const correctPassword = sessionStorage.getItem("magicPassword");
    const detailSection = document.getElementById("magic-details");
    const errorMessage = document.getElementById("password-error");

    if (inputPassword === correctPassword) {
        detailSection.innerHTML = `<p>${sessionStorage.getItem("magicDetails")}</p>`;
    } else {
        errorMessage.textContent = "パスワードが違います。";
    }
}

// ページ読み込み時に魔法情報を表示
window.onload = loadMagic;
