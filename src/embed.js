export function generateEmbedHtml(origin) {
    return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>订阅转换器</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js"></script>
        <style>
            body { background-color: transparent; }
            .converter-card { border: 1px solid #dee2e6; border-radius: 0.5rem; padding: 1.5rem; background-color: #fff; }
            #resultModal { display: none; position: fixed; z-index: 1050; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.5); }
            .modal-content { background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 80%; max-width: 500px; border-radius: 0.5rem; }
            .close-btn { color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer; }
            #qrModal { display: none; position: fixed; z-index: 1060; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); justify-content: center; align-items: center; }
            #qrModal img { max-width: 80vw; max-height: 80vh; }
        </style>
    </head>
    <body>
    <div class="container py-3">
        <div class="converter-card">
            <div class="mb-3">
                <label for="subUrl" class="form-label">订阅链接或分享链接</label>
                <textarea class="form-control" id="subUrl" rows="3" placeholder="请在此处粘贴链接..."></textarea>
            </div>
            <button id="convertBtn" class="btn btn-primary w-100">生成订阅链接</button>
        </div>
    </div>

    <div id="resultModal">
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h5 class="mb-3">复制订阅链接</h5>
            <div class="d-grid gap-2">
                <button class="btn btn-outline-primary result-btn" data-type="xray"><i class="fas fa-copy me-2"></i>Xray</button>
                <button class="btn btn-outline-primary result-btn" data-type="singbox"><i class="fas fa-copy me-2"></i>SingBox</button>
                <button class="btn btn-outline-primary result-btn" data-type="clash"><i class="fas fa-copy me-2"></i>Clash</button>
                <button class="btn btn-outline-primary result-btn" data-type="surge"><i class="fas fa-copy me-2"></i>Surge</button>
            </div>
        </div>
    </div>
    
    <div id="qrModal">
        <span class="close-btn" style="position:absolute; top: 20px; right: 35px; color: white;">&times;</span>
        <img id="qrImage" src="" alt="QR Code">
    </div>

    <script>
        const convertBtn = document.getElementById('convertBtn');
        const subUrlInput = document.getElementById('subUrl');
        const resultModal = document.getElementById('resultModal');
        const qrModal = document.getElementById('qrModal');
        const links = {};

        convertBtn.addEventListener('click', async () => {
            const input = subUrlInput.value.trim();
            if (!input) {
                alert('链接不能为空！');
                return;
            }

            convertBtn.disabled = true;
            convertBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 转换中...';

            try {
                // Step 1: Generate long links to get the query string
                const base = '${origin}';
                const longSingboxUrl = \`\${base}/singbox?config=\${encodeURIComponent(input)}\`;
                
                // Step 2: Shorten the query string
                const response = await fetch(\`/shorten-v2?url=\${encodeURIComponent(longSingboxUrl)}\`);
                if (!response.ok) throw new Error('短链接生成失败');
                const shortCode = await response.text();

                links.xray = \`\${base}/x/\${shortCode}\`;
                links.singbox = \`\${base}/b/\${shortCode}\`;
                links.clash = \`\${base}/c/\${shortCode}\`;
                links.surge = \`\${base}/s/\${shortCode}\`;

                resultModal.style.display = 'block';
            } catch (error) {
                alert(error.message);
            } finally {
                convertBtn.disabled = false;
                convertBtn.textContent = '生成订阅链接';
            }
        });

        document.querySelector('#resultModal .close-btn').onclick = () => resultModal.style.display = 'none';
        document.querySelector('#qrModal .close-btn').onclick = () => qrModal.style.display = 'none';
        window.onclick = (event) => {
            if (event.target == resultModal) resultModal.style.display = 'none';
            if (event.target == qrModal) qrModal.style.display = 'none';
        };

        document.querySelectorAll('.result-btn').forEach(button => {
            button.onclick = (e) => {
                e.stopPropagation();
                const type = button.getAttribute('data-type');
                copyToClipboard(links[type], button);
            };

            const qrIcon = document.createElement('i');
            qrIcon.className = 'fas fa-qrcode ms-auto';
            qrIcon.style.cursor = 'pointer';
            qrIcon.onclick = (e) => {
                e.stopPropagation();
                const type = button.getAttribute('data-type');
                generateQRCode(links[type]);
            };
            button.classList.add('d-flex', 'align-items-center');
            button.appendChild(qrIcon);
        });

        function copyToClipboard(text, button) {
            navigator.clipboard.writeText(text).then(() => {
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check me-2"></i>已复制!';
                button.classList.add('btn-success');
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.classList.remove('btn-success');
                }, 2000);
            }, (err) => {
                alert('复制失败: ', err);
            });
        }
        
        function generateQRCode(text) {
             try {
                const qr = qrcode(0, 'M');
                qr.addData(text);
                qr.make();
                document.getElementById('qrImage').src = qr.createDataURL(10, 2);
                qrModal.style.display = 'flex';
            } catch (e) {
                alert('生成二维码失败');
            }
        }
    </script>
    </body>
    </html>
    `;
}
