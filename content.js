(function () {
    // 创建并插入模态框的 HTML
    const modal = document.createElement('div');
    modal.style.position = 'absolute';
    modal.style.backgroundColor = '#fff';
    modal.style.border = '1px solid #ccc';
    modal.style.padding = '10px';
    modal.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    modal.style.display = 'none';
    modal.style.zIndex = '1000';
    document.body.appendChild(modal);



    // 监听鼠标抬起事件
    document.addEventListener('mouseup', function (event) {
        const selectedText = window.getSelection().toString().trim();
        if (selectedText) {

            if (selectedText === null || selectedText === undefined || selectedText === "" || selectedText.length>500) {
                return
            }

            const range = window.getSelection().getRangeAt(0);
            const rect = range.getBoundingClientRect();

            // 更新模态框内容
            modal.innerHTML = `<strong>${selectedText}</strong>: 正在加载数据...`;

            // 计算模态框位置
            const top = rect.bottom +  window.scrollY + 5;
            const left = window.scrollX + rect.left;

            // 确保模态框在视口内
            const maxWidth = window.innerWidth - modal.offsetWidth;
            const maxHeight = window.innerHeight - modal.offsetHeight;

            // modal.style.top = `${Math.min(top, maxHeight)}px`;
            modal.style.top = `${top}px`;
            modal.style.left = `${Math.min(left, maxWidth)}px`;

            modal.style.display = 'block';

            // 模拟异步数据加载
            fetchAPIData(selectedText).then(data => {
                modal.innerHTML = `原文：${selectedText}<br>译文：<strong>${data}</strong>`;
            }).catch(error => {
                console.error('API error:', error);
                modal.innerHTML = `<strong>${selectedText}</strong>: 加载数据出错`;
            });
        } else {
            modal.style.display = 'none';
        }
    });

    // 监听滚动事件
    window.addEventListener('scroll', function () {
        if (modal.style.display === 'block' && lastRect) {
            updateModalPosition();
        }
    });

    function getSyncStorageData(keys) {
        return new Promise((resolve, reject) => {
          chrome.storage.sync.get(keys, (items) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve(items);
            }
          });
        });
    }

    async function fetchAPIData(word) {

        const data = await getSyncStorageData(['apiKey', 'prompt']);

        let apiKey = data.apiKey
        let prompt = data.prompt.replace('${word}', word)

        const url = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

        const requestBody = {
            model: "glm-4-flash",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        };

        return fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // 根据 API 返回的数据结构进行解析
                // 假设返回的数据格式为 { result: "..." }
                return data.choices[0].message.content || 'No result found';
            })
            .catch(error => {
                console.error('Fetch API error:', error);
                return 'Error fetching data';
            });
    }

})();