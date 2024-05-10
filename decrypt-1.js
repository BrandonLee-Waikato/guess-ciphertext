const cipherNumbers = ['28', '58', '20', '48', '36', '56', '54', '46', '42', '34', '24', '44', '30', '26', '22', '50', '32', '68', '60', '62', '40', '64', '70', '38', '52', '66'];
const initialReplacements = {};
cipherNumbers.forEach(num => {
    initialReplacements[num] = localStorage.getItem(num) || '';
});
let replacements = {...initialReplacements};
const cipherText = "your cipher text here, replace this with actual cipher text";  // 你可以替换这里的文本为实际密文

function populateTable() {
    const table = document.getElementById('cipherTable');
    cipherNumbers.forEach(num => {
        const row = table.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = num;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = replacements[num];
        input.setAttribute('maxlength', '1');
        input.oninput = function () { updateReplacements(num, input.value); };
        input.onclick = function () { input.select(); };
        cell2.appendChild(input);
    });
}

function updateReplacements(num, newLetter) {
    replacements[num] = newLetter.toUpperCase();
    localStorage.setItem(num, newLetter.toUpperCase());
    decryptText();
}

function decryptText() {
    let decryptedText = cipherText.split(' ').map(num => {
        return replacements[num] || num;
    }).join(' ');
    document.getElementById('decryptedText').textContent = decryptedText;
}

function clearStorage() {
    cipherNumbers.forEach(num => {
        localStorage.removeItem(num);
        document.querySelector(`input[value="${replacements[num]}"]`).value = ''; // 清除输入框
        replacements[num] = ''; // 清空内存中的替换映射
    });
    decryptText(); // 更新解密文本
}

document.getElementById('clearStorage').addEventListener('click', clearStorage);

populateTable();
decryptText();
