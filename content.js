let selectedText = '';

document.addEventListener('mouseup', function() {
    selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        showIcon();
    }else {
        hideIcon();
    }
});

function showIcon() {
    const icon = document.createElement('div');
    icon.id = 'chatgpt-icon';
    icon.innerHTML = '🤖';
    icon.style.cssText = `
    position: fixed;
    top: ${window.event.clientY}px;
    left: ${window.event.clientX}px;
    background-color: #4CF50;
    color: white;
    padding: 5px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10000;
    `;
    document.body.appendChild(icon);

    icon.addEventListener('click', function() {
        chrome.runtime.sendMessage({action: 'analyze', text: selectedText});
        hideIcon();
    });
}

function hideIcon() {
    const icon = document.getElementById('chatgpt-icon');
    if (icon) {
        icon.remove();
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == 'showResult') {
    
    }
})