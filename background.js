chrome.runtime.onMessage.addListener(function(request, sender,sendResponse) {
    if (request.action == 'analyze') {
        chrome.storage.sync.get(['apiKey', 'prompt'], function(result) {
            const apiKey = result.apiKey;
            const prompt = result.prompt || '以下の内容についてテックリードとしてわかりやすく解説してください';

            fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {role: 'system', content: prompt},
                        {role:"user", content: request.text}
                    ]
                })
            })
            .then(response => response.json())
            .then(data => {
                const result = data.choices[0].message.content;
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {action: 'showResult', result: result});
                });
            })
            .catch(error => {
                console.error('ErrorL', error);
            });
        });
    }
});