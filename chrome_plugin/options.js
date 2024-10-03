document.addEventListener('DOMContentLoaded', function() {
    const promptInput = document.getElementById('prompt');
    const apiKeyInput = document.getElementById('apiKey');
    const saveButton = document.getElementById('save');

    // 加载保存的设置
    chrome.storage.sync.get(['apiKey', 'prompt'], function(items) {
        if (items.apiKey) {
            apiKeyInput.value = items.apiKey;
        }
        if (items.prompt) {
            promptInput.value = items.prompt;
        }
    });

    // 保存设置
    saveButton.addEventListener('click', function() {
        const prompt = promptInput.value;
        const apiKey = apiKeyInput.value;
        chrome.storage.sync.set({ prompt: prompt , apiKey: apiKey}, function() {
            alert('设置已保存');
        });
    });
});