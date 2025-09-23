import { generateStyles } from './style.js';

export function generateAdminLoginPage(message = '') {
    return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>管理员登录</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container d-flex justify-content-center align-items-center vh-100">
            <div class="card" style="width: 25rem;">
                <div class="card-body">
                    <h3 class="card-title text-center mb-4">管理员登录</h3>
                    ${message ? `<div class="alert alert-danger">${message}</div>` : ''}
                    <form action="/admin/login" method="POST">
                        <div class="mb-3">
                            <label for="password" class="form-label">密码</label>
                            <input type="password" class="form-control" id="password" name="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">登录</button>
                    </form>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
}

export function generateSetupPage() {
    return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>初始化设置</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container d-flex justify-content-center align-items-center vh-100">
            <div class="card" style="width: 25rem;">
                <div class="card-body">
                    <h3 class="card-title text-center mb-4">首次使用 - 设置管理员密码</h3>
                    <form action="/setup" method="POST">
                        <div class="mb-3">
                            <label for="password" class="form-label">新密码</label>
                            <input type="password" class="form-control" id="password" name="password" required>
                        </div>
                        <div class="mb-3">
                            <label for="confirm_password" class="form-label">确认密码</label>
                            <input type="password" class="form-control" id="confirm_password" name="confirm_password" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">设置密码</button>
                    </form>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
}

export function generateD1BindingGuidePage() {
    return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>需要配置 D1 数据库</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container mt-5">
            <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">部署未完成：需要绑定 D1 数据库！</h4>
                <p>项目检测到您尚未绑定 Cloudflare D1 数据库。请按照以下步骤操作：</p>
                <hr>
                <ol>
                    <li>在您的 Cloudflare 账户仪表板中，转到 "Workers & Pages" > "D1"。</li>
                    <li>点击 "创建数据库"，为您的项目创建一个新的 D1 数据库 (例如，命名为 "sublink-db")。</li>
                    <li>创建后，返回您的 Worker 项目设置页面。</li>
                    <li>在 "设置" > "变量" 选项卡下，找到 "D1 数据库绑定"。</li>
                    <li>点击 "添加绑定"，变量名称填写 <code>DB</code>，选择您刚刚创建的数据库。</li>
                    <li>保存并重新部署您的 Worker。</li>
                </ol>
                <p class="mb-0">完成以上步骤后，刷新此页面即可开始初始化设置。</p>
            </div>
        </div>
    </body>
    </html>
    `;
}


export function generateAdminPanel(settings, domains) {
    const domainsHtml = domains.map(d => `<li>${d} <button class="btn btn-sm btn-danger" onclick="removeDomain('${d}')">删除</button></li>`).join('');

    return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>管理后台</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
        <style>
          body { background-color: #f8f9fa; }
          .container { max-width: 960px; }
          .card { margin-bottom: 1.5rem; }
          .list-unstyled li { background-color: #fff; padding: 0.5rem 1rem; border: 1px solid #dee2e6; border-radius: 0.25rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center; }
        </style>
    </head>
    <body>
    <div class="container py-5">
        <h2 class="mb-4">Sublink Worker 管理后台</h2>
        <form id="settingsForm">
            <div class="card">
                <div class="card-header">服务开关</div>
                <div class="card-body">
                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="homepage_enabled" name="homepage_enabled" ${settings.homepage_enabled === 'true' ? 'checked' : ''}>
                        <label class="form-check-label" for="homepage_enabled">开启首页使用权 (关闭后首页可见但无法转换)</label>
                    </div>
                    <hr>
                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="api_enabled" name="api_enabled" ${settings.api_enabled === 'true' ? 'checked' : ''}>
                        <label class="form-check-label" for="api_enabled">开启嵌入式API使用权</label>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">订阅源域名白名单</div>
                <div class="card-body">
                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="whitelist_enabled" name="whitelist_enabled" ${settings.whitelist_enabled === 'true' ? 'checked' : ''}>
                        <label class="form-check-label" for="whitelist_enabled">启用订阅源白名单模式 (推荐)</label>
                    </div>
                    <hr>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="example.com" id="newDomainInput">
                        <button class="btn btn-primary" type="button" onclick="addDomain()">添加</button>
                    </div>
                    <h6>已授权域名:</h6>
                    <ul class="list-unstyled" id="domainList">${domainsHtml}</ul>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">首页通用与主题设置</div>
                <div class="card-body">
                     <div class="mb-3">
                        <label for="theme_config_theme" class="form-label">默认主题</label>
                        <select class="form-select" id="theme_config_theme" name="theme_config.theme">
                            <option value="theme-aurora-glass">极光-玻璃质感</option>
                            <option value="theme-particles-glass">粒子-玻璃质感</option>
                            <option value="theme-modern-glass">现代-玻璃质感</option>
                            <option value="theme-cyberpunk-glass">赛博朋克-玻璃质感</option>
                            <option value="theme-light">亮色-简约</option>
                            <option value="theme-marble-light">简约大理石-亮色</option>
                            <option value="theme-matrix">矩阵-代码雨</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="theme_config_texts_title" class="form-label">页面主标题</label>
                        <input type="text" class="form-control" id="theme_config_texts_title" name="theme_config.texts.title" value="${settings.theme_config.texts.title}">
                    </div>
                    <div class="mb-3 row">
                        <div class="col">
                            <label for="theme_config_primaryColor" class="form-label">主题强调色</label>
                            <input type="color" class="form-control form-control-color" id="theme_config_primaryColor" name="theme_config.primaryColor" value="${settings.theme_config.primaryColor}">
                        </div>
                        <div class="col">
                            <label for="theme_config_particleColor" class="form-label">背景粒子色</label>
                            <input type="color" class="form-control form-control-color" id="theme_config_particleColor" name="theme_config.particleColor" value="${settings.theme_config.particleColor}">
                        </div>
                    </div>
                     <hr>
                     <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="shorten_button_enabled" name="shorten_button_enabled" ${settings.shorten_button_enabled === 'true' ? 'checked' : ''}>
                        <label class="form-check-label" for="shorten_button_enabled">首页显示短链接按钮</label>
                    </div>
                    <div class="mb-3">
                        <label for="default_link_mode" class="form-label">默认链接模式</label>
                        <select class="form-select" id="default_link_mode" name="default_link_mode">
                            <option value="long" ${settings.default_link_mode === 'long' ? 'selected' : ''}>长链接</option>
                            <option value="short" ${settings.default_link_mode === 'short' ? 'selected' : ''}>短链接</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">规则选择设置</div>
                <div class="card-body">
                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="ruleset_visible" name="ruleset_visible" ${settings.ruleset_visible === 'true' ? 'checked' : ''}>
                        <label class="form-check-label" for="ruleset_visible">首页显示此模块</label>
                    </div>
                    <div class="mb-3">
                        <label for="default_ruleset_select" class="form-label">默认规则方案</label>
                        <select class="form-select" id="default_ruleset_select">
                            <option value="minimal">Minimal</option>
                            <option value="balanced">Balanced</option>
                            <option value="comprehensive">Comprehensive</option>
                            <option value="custom">自定义 (见下方)</option>
                        </select>
                    </div>
                     <div class="mb-3">
                        <label for="default_ruleset_custom" class="form-label">自定义规则JSON数组 (例如 ["Ad Block", "Google"])</label>
                        <textarea class="form-control" id="default_ruleset_custom" rows="3"></textarea>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">自定义规则设置</div>
                <div class="card-body">
                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="custom_rules_visible" name="custom_rules_visible" ${settings.custom_rules_visible === 'true' ? 'checked' : ''}>
                        <label class="form-check-label" for="custom_rules_visible">首页显示此模块</label>
                    </div>
                    <div class="mb-3">
                        <label for="default_custom_rules" class="form-label">默认自定义规则 (JSON格式)</label>
                        <textarea class="form-control" id="default_custom_rules" name="default_custom_rules" rows="5">${settings.default_custom_rules}</textarea>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">基础配置设置</div>
                <div class="card-body">
                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="base_config_visible" name="base_config_visible" ${settings.base_config_visible === 'true' ? 'checked' : ''}>
                        <label class="form-check-label" for="base_config_visible">首页显示此模块</label>
                    </div>
                    <div class="mb-3">
                        <label for="default_base_config_singbox" class="form-label">默认Sing-Box基础配置 (JSON)</label>
                        <textarea class="form-control" id="default_base_config_singbox" name="default_base_config_singbox" rows="5">${settings.default_base_config_singbox}</textarea>
                    </div>
                    <div class="mb-3">
                        <label for="default_base_config_clash" class="form-label">默认Clash基础配置 (YAML)</label>
                        <textarea class="form-control" id="default_base_config_clash" name="default_base_config_clash" rows="5">${settings.default_base_config_clash}</textarea>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">User-Agent设置</div>
                <div class="card-body">
                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="user_agent_visible" name="user_agent_visible" ${settings.user_agent_visible === 'true' ? 'checked' : ''}>
                        <label class="form-check-label" for="user_agent_visible">首页显示此模块</label>
                    </div>
                    <div class="mb-3">
                        <label for="default_user_agent" class="form-label">默认 User-Agent</label>
                        <input type="text" class="form-control" id="default_user_agent" name="default_user_agent" value="${settings.default_user_agent}">
                    </div>
                </div>
            </div>
        </form>
        <button class="btn btn-success w-100" onclick="saveAllSettings()">保存所有设置</button>
    </div>

    <script>
        const settings = ${JSON.stringify(settings)};
        
        document.addEventListener('DOMContentLoaded', function() {
            const rulesetSelect = document.getElementById('default_ruleset_select');
            const rulesetCustom = document.getElementById('default_ruleset_custom');
            try {
                const parsedRules = JSON.parse(settings.default_ruleset);
                rulesetSelect.value = 'custom';
                rulesetCustom.value = JSON.stringify(parsedRules, null, 2);
            } catch(e) {
                rulesetSelect.value = settings.default_ruleset || 'minimal';
                rulesetCustom.value = '[]';
            }
            
            document.getElementById('theme_config_theme').value = settings.theme_config.theme;
        });

        async function postData(url = '', data = {}) {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return response;
        }

        function addDomain() {
            const input = document.getElementById('newDomainInput');
            const domain = input.value.trim();
            if (!domain) return;
            postData('/api/admin/whitelist/add', { domain }).then(res => {
                if(res.ok) location.reload();
                else alert('添加失败');
            });
        }

        function removeDomain(domain) {
            if (!confirm('确定要删除 ' + domain + ' 吗?')) return;
            postData('/api/admin/whitelist/remove', { domain }).then(res => {
                if(res.ok) location.reload();
                else alert('删除失败');
            });
        }
        
        function saveAllSettings() {
            const settingsToSave = {};
            const form = document.getElementById('settingsForm');
            
            form.querySelectorAll('input[type=checkbox]').forEach(el => {
                settingsToSave[el.name] = String(el.checked);
            });
            
            form.querySelectorAll('input[type=text], textarea, select, input[type=color]').forEach(el => {
                 if (el.name.includes('.')) {
                    const keys = el.name.split('.');
                    let current = settingsToSave;
                    keys.forEach((key, index) => {
                        if (index === keys.length - 1) {
                            current[key] = el.value;
                        } else {
                            current[key] = current[key] || {};
                            current = current[key];
                        }
                    });
                } else if(el.name) {
                    settingsToSave[el.name] = el.value;
                }
            });
            
            const rulesetSelect = document.getElementById('default_ruleset_select');
            if (rulesetSelect.value === 'custom') {
                settingsToSave.default_ruleset = document.getElementById('default_ruleset_custom').value;
            } else {
                settingsToSave.default_ruleset = rulesetSelect.value;
            }
            delete settingsToSave[''];

            postData('/api/admin/settings', settingsToSave).then(res => {
                if(res.ok) {
                    alert('设置已保存！页面将刷新以应用更改。');
                    location.reload();
                } else {
                    alert('保存失败，请检查输入内容是否正确（例如JSON格式）。');
                }
            });
        }
    </script>
    </body>
    </html>
    `;
}
