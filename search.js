async function searchMagic() {
    const magicName = document.getElementById("magic-name").value.trim().toLowerCase();
    const errorMessage = document.getElementById("error-message");

    try {
        const response = await fetch("magic.json");
        const magicData = await response.json();

        if (magicData[magicName]) {
            sessionStorage.setItem("selectedMagic", magicName);
            window.location.href = "magic.html";
        } else {
            errorMessage.textContent = "その名前の魔法は存在しません。";
        }
    } catch (error) {
        console.error("エラー:", error);
        errorMessage.textContent = "データの取得に失敗しました。";
    }
}
