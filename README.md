<div align="center">
  <h1><b>Sublink Worker (功能增强版)</b></h1>
  <h5><i>一个功能强大、带后台管理、可API调用的 Serverless 订阅转换服务</i></h5>
  
  <p>
    <a href="https://dash.cloudflare.com/?to=/:account/workers-and-pages/create">
      <img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare Workers"/>
    </a>
  </p>
  
  <br>
  <p>本项目基于 <a href="https://github.com/7Sageer/sublink-worker">7Sageer/sublink-worker</a> 进行了深度定制与功能增强，将原有的 KV 存储升级为 D1 数据库，并增加了一个功能完善的管理后台与第三方嵌入式API。</p>

</div>

## ✨ 核心功能更新

此版本在保留原项目所有稳定订阅转换规则的基础上，增加了以下核心功能：

### 1. 强大的管理后台
通过访问 `/admin` 路径，您可以进入一个密码保护的管理后台，实现对整个服务的精细化控制：
- **服务开关**: 可独立控制**主页**和**API**的开启与关闭。
- **自定义主页关闭提示**: 当主页关闭时，可向用户显示自定义的文本或HTML页面。
- **API域名白名单**: 只有在白名单中的域名，才能通过嵌入式API使用转换服务。
- **精细化首页模块控制**: 可独立控制首页“高级选项”中四大模块的**默认值**和**可见性**：
    - **规则选择**: 设置默认规则方案 (如 `minimal`, `balanced` 或自定义组合)，并决定是否让用户在首页看到此选项。
    - **自定义规则**: 预设默认的自定义规则 (JSON格式)，并控制其在首页是否可见。
    - **基础配置**: 预设 Sing-Box 和 Clash 的默认基础配置，并控制其在首页是否可见。
    - **User-Agent**: 设置默认的UA，并控制其在首页是否可见。
- **默认链接模式**: 可设置生成的订阅链接默认为**长链接**或**短链接**。

### 2. 全新的数据存储与部署流程
- **D1 数据库**: 已将数据存储从 KV 全面迁移至更强大的 Cloudflare D1 数据库。
- **友好的部署引导**: 部署流程经过优化。如果未绑定D1数据库，项目会显示引导页面；绑定后，会自动进入管理员密码设置流程，**彻底告别部署失败**。

### 3. 第三方嵌入式 API
- **一键嵌入**: 在首页底部，您可以直接复制 `<iframe>` 代码，轻松将订阅转换器嵌入到任何您自己的网站中。
- **全新UI交互**: 嵌入式API拥有一个简洁的UI，转换后会弹出一个包含 **复制按钮** 和 **二维码** 的遮罩层，方便用户快速获取适用于各客户端的短链接。

## 🚀 部署指南

本项目已迁移至 Cloudflare D1 数据库，部署流程十分简单：

1.  **Fork 本项目** 到您自己的 GitHub 账户。

2.  在 Cloudflare 仪表板中，进入 **Workers & Pages** 并创建一个新的 **Pages** 项目。

3.  **关联您的 GitHub 仓库**，选择您刚刚 Fork 的项目。

4.  在 **构建和部署设置** 中：
    *   构建命令:
    ```bash
    npm run deploy
    ```
    *   **重要：** 这一步先不要点击“保存并部署”，进入下一步。

5.  **创建并绑定 D1 数据库**：
    *   进入 **设置 (Settings)** > **函数 (Functions)** > **D1 数据库绑定 (D1 database bindings)**。
    *   点击 **添加绑定 (Add binding)**。
    *   变量名称 (Variable name): `DB`
    *   D1 数据库 (D1 database): 点击 **创建数据库 (Create database)**，给它起一个名字（例如 `sublink-db`），然后选择它。

6.  **保存并部署**：现在，返回并点击 **保存并部署 (Save and Deploy)**。

7.  **首次运行设置**：
    *   部署成功后，第一次访问您的 Worker 域名。
    *   您将被自动引导至一个设置页面，请在此处**创建您的管理员密码**。
    *   设置成功后，您就可以通过访问 `/admin` 路径来管理您的服务了！

## ⚙️ 原始项目特性 (保留功能)

### 支持协议
- ShadowSocks
- VMess
- VLESS
- Hysteria2
- Trojan
- TUIC

### 客户端支持
- Sing-Box
- Clash
- Xray/V2Ray

### Web界面特性
- 友好的操作界面
- 多种预定义的规则集
- 支持 geo-site, geo-ip, ip-cidr, domain-suffix 的自定义策略组

## 📖 API 文档

关于核心转换API的详细文档，请参考原项目的 [APIDoc.md](/docs/APIDoc.md)。

## 🔧 项目结构

```
.
├── index.js                 # Main server logic, handles request routing
├── BaseConfigBuilder.js     # Build base configuration
├── SingboxConfigBuilder.js  # Build Sing-Box configuration
├── ClashConfigBuilder.js    # Build Clash configuration
├── ProxyParsers.js          # Parse URLs of various proxy protocols
├── utils.js                 # Provide various utility functions
├── htmlBuilder.js           # Generate Web interface
├── style.js                 # Generate CSS for Web interface
├── config.js                # Store configuration information
└── docs/
    ├── APIDoc.md            # API documentation
    ├── UpdateLogs.md        # Update logs
    ├── FAQ.md               # Frequently asked questions
    └── BaseConfig.md        # Basic configuration feature introduction
```

## ❤️ 致敬与感谢

本项目的所有核心订阅转换功能及规则，均源于原作者 **[7Sageer](https://github.com/7Sageer)** 的卓越工作。我们在此坚实的基础上进行了二次开发，增加了后台管理和API服务化功能，以满足更多样化的自托管部署需求。

向原作者 **7Sageer** 及其项目 **[sublink-worker](https://github.com/7Sageer/sublink-worker)** 致以最诚挚的敬意和感谢！

## 🤝 贡献

欢迎通过 Issues 和 Pull Requests 来改进本项目。

## 📄 许可证

本项目基于 MIT 许可证 - 详情请见 [LICENSE](LICENSE) 文件。

## ⚠️ 免责声明

本项目仅用于学习和交流目的，请勿用于非法用途。因使用本项目造成的一切后果，由使用者本人承担，与开发者无关。

## 💰 赞助

<div align="center">
  <h3>感谢以下赞助商对原项目的支持</h3>
<table border="0">
  <tr>
    <td>
      <a href="https://yxvm.com/" target="_blank" title="YXVM">
        <img src="https://image.779477.xyz/yxvm.png" alt="YXVM" height="60" hspace="20"/>
      </a>
    </td>
    <td>
      <a href="https://github.com/NodeSeekDev/NodeSupport" target="_blank" title="NodeSupport">
        <img src="https://image.779477.xyz/ns.png" alt="NodeSupport" height="60" hspace="20"/>
      </a>
    </td>
  </tr>
</table>
  <p><b>NodeSupport 赞助了原项目，感谢您的支持！</b></p>
  <p>如果您希望赞助原项目，请联系 <a href="https://github.com/7Sageer" style="text-decoration: none;">@7Sageer</a></p>
</div>

## ⭐ Star History

感谢所有为原项目点亮星星的朋友！ 🌟

<a href="https://star-history.com/#7Sageer/sublink-worker&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=7Sageer/sublink-worker&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=7Sageer/sublink-worker&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=7Sageer/sublink-worker&type=Date" />
 </picture>
</a>
