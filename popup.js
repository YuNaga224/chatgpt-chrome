document.addEventListener("DOMContentLoaded", function() {
    const apiKeyInput = document.getElementById('apiKey');
    const promptInput = document.getElementById('prompt');
    const saveButton = this.getElementById('saveButton');

    // Load saved settings
    chrome.storage.sync.get(['apiKey', 'prompt'], function(result) {
        apiKeyInput.value = result.apiKey || '';
        promptInput.value = result.prompt || '';
    });

    // save settings
    saveButton.addEventListener('click', function() {
        chrome.storage.sync.set({
            apiKey: apiKeyInput.value,
            prompt: promptInput.value
        },function() {
            alert('Settings saved!');
        });
    });
});
