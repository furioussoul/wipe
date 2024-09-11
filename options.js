document.addEventListener('DOMContentLoaded', function() {
    const promptInput = document.getElementById('prompt');
    const saveButton = document.getElementById('save');

    // 加载保存的设置
    chrome.storage.sync.get(['prompt'], function(items) {
        if (items.prompt) {
            promptInput.value = items.prompt;
        }
    });

    // 保存设置
    saveButton.addEventListener('click', function() {
        const prompt = promptInput.value;
        chrome.storage.sync.set({ prompt: prompt }, function() {
            alert('设置已保存');
        });
    });
});