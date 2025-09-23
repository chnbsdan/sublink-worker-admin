export const generateStyles = () => `
  :root { --primary-color: #00A0FF; --primary-hover: #007ACC; --primary-gradient-start: #00C6FF; --primary-gradient-end: #0072FF; --secondary-color: #8c939d; --light-bg: #1A1C20; --content-bg: rgba(37, 40, 46, 0.7); --border-color: rgba(64, 68, 76, 0.8); --text-color: #E0E0E0; --text-light: #B0B0B0; --success-color: #30A46C; --danger-color: #DA3633; --warning-color: #DBAB0A; --border-radius-md: 12px; --border-radius-sm: 8px; --font-family-sans: 'Inter', 'Noto Sans SC', sans-serif; --font-family-mono: 'Roboto Mono', monospace; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { font-size: 16px; }
  body { font-family: var(--font-family-sans); background-color: var(--light-bg); color: var(--text-color); line-height: 1.65; overflow-x: hidden; padding: 0; position:relative; transition: background-color 0.5s ease; background-size: cover; background-position: center; background-attachment: fixed; }
  #background-canvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; display: none; }
  .app-container { max-width: 960px; margin: 0 auto; padding: 0 1rem; position: relative; z-index: 1; }
  .external-link { position: fixed; bottom: 20px; right: 20px; z-index: 1000; font-size: 2rem; color: var(--text-color); transition: color 0.3s ease; }
  .external-link:hover { color: var(--primary-color); }
  header { text-align: center; margin-top: 2rem; margin-bottom: 2rem; }
  header h1 { white-space: pre-wrap; font-size: 2.5em; color: var(--primary-color); font-weight: 700; text-shadow: 0 0 10px rgba(var(--primary-color-rgb, 0, 160, 255), 0.3); }
  .card { background-color: var(--content-bg); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-radius: var(--border-radius-md); box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25); padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid var(--border-color); }
  .form-section { padding: 1rem 0; }
  .form-section-title { font-size: 1.25em; font-weight: 600; margin-bottom: 1.25rem; color: var(--text-color); }
  .form-control, .form-select { width: 100%; background-color: rgba(26, 28, 32, 0.7); border: 1px solid var(--border-color); border-radius: var(--border-radius-sm); color: var(--text-color); font-family: var(--font-family-sans); padding: 0.8em 1em; transition: border-color 0.2s, box-shadow 0.2s; backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); }
  textarea.form-control { min-height: 120px; }
  .form-control::placeholder { color: var(--text-light); opacity: 0.7; }
  .form-control:focus, .form-select:focus { border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb, 0, 160, 255), 0.3); outline: none; background-color: rgba(37, 40, 46, 0.8); }
  .form-select { appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23B0B0B0' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1em; }
  .button-container { display: grid; grid-template-columns: 1fr auto; gap: 1rem; margin-top: 1.5rem; }
  .btn { display: inline-flex; align-items: center; justify-content: center; font-weight: 600; text-align: center; cursor: pointer; user-select: none; background: linear-gradient(145deg, var(--primary-gradient-start), var(--primary-gradient-end)); border: 1px solid transparent; color: #fff; padding: 0.8em 1.5em; font-size: 1em; border-radius: var(--border-radius-sm); transition: all 0.2s ease-in-out; text-shadow: 0 1px 2px rgba(0,0,0,0.2); }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(var(--primary-color-rgb, 0, 160, 255), 0.3); }
  .btn-outline { background: rgba(255, 255, 255, 0.05); color: var(--text-light); border: 1px solid var(--border-color); backdrop-filter: blur(2px); text-shadow: none; }
  .btn-outline:hover { background-color: var(--content-bg); border-color: var(--text-color); color: var(--text-color); }
  .input-group { position: relative; display: flex; flex-wrap: wrap; align-items: stretch; width: 100%; margin-bottom: 1rem; }
  .input-group .form-control { position: relative; flex: 1 1 auto; width: 1%; min-width: 0; border-top-right-radius: 0; border-bottom-right-radius: 0; }
  .input-group .btn { border-radius: 0; margin-left: -1px; }
  .input-group .btn:last-child { border-top-right-radius: var(--border-radius-sm); border-bottom-right-radius: var(--border-radius-sm); }
  #subscribeLinksContainer { display: none; }
  #subscribeLinksContainer.show { display: block; animation: fadeIn 0.5s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  #advancedOptions { max-height: 0; overflow: hidden; transition: max-height 0.5s ease-out; }
  #advancedOptions.show { max-height: 2000px; }
  .form-check-input { height: 1.5em; width: 3em; background-color: var(--border-color); border-color: transparent; }
  .form-check-input:checked { background-color: var(--primary-color); border-color: var(--primary-color); }
  .modal { display: none; position: fixed; z-index: 10000; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.6); justify-content: center; align-items: center; backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); }
  .modal-content { background-color: var(--content-bg); padding: 2rem; border: 1px solid var(--border-color); border-radius: var(--border-radius-md); width: 95%; max-width: 500px; max-height: 90vh; overflow-y: auto; box-shadow: 0 5px 15px rgba(0,0,0,0.3); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
  .modal-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 1rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); }
  .modal-header h3 { margin: 0; font-size: 1.4em; color: var(--primary-color); }
  .modal-close-btn { font-size: 1.8rem; font-weight: bold; line-height: 1; color: var(--text-light); cursor: pointer; background: none; border: none; padding: 0; }
  .qr-modal-content { max-width: 300px; background: white; padding: 1rem; text-align: center; }
  #qrCodeImg { max-width: 100%; }
  .tooltip-notification { position: fixed; top: 20px; right: 20px; padding: 12px 20px; border-radius: var(--border-radius-md); color: #fff; font-size: 0.95em; z-index: 10002; box-shadow: 0 6px 15px rgba(0, 0, 0, 0.35); opacity: 0; transform: translateY(-20px); transition: all 0.3s ease; pointer-events: none; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }
  .tooltip-notification.show { opacity: 1; transform: translateY(0); }
  @media (max-width: 768px) { html { font-size: 15px; } .app-container { padding: 0 0.8rem; } header { margin-top: 1.5rem; margin-bottom: 1.5rem; } }
  .theme-light { --light-bg: #F0F2F5; --content-bg: rgba(255, 255, 255, 0.7); --border-color: #DCDFE6; --text-color: #303133; --text-light: #606266; }
  .theme-matrix { --primary-color: #00FF41; --primary-hover: #39FF14; --light-bg: #000000; --content-bg: #0D0208; --border-color: #00FF41; --text-color: #00FF41; --text-light: #00FF41; font-family: var(--font-family-mono); }
  .theme-matrix .card, .theme-matrix .modal-content { backdrop-filter: none; }
  .theme-matrix .btn { text-shadow: none; color: #000; }
  body.theme-modern-glass { background: linear-gradient(-45deg, #000428, #004e92, #1CB5E0, #23D5AB); background-size: 400% 400%; animation: gradientBG 15s ease infinite; }
  @keyframes gradientBG { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  .theme-aurora-glass { --primary-color: #38bdf8; --light-bg: #0c0a09; --content-bg: rgba(23, 23, 23, 0.5); --border-color: rgba(255, 255, 255, 0.15); --text-color: #f2f2f2; --text-light: #a3a3a3; }
  body.theme-aurora-glass::before { content: ''; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -2; background: radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.4) 0px, transparent 50%), radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 0.2) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(355, 98%, 76%, 0.3) 0px, transparent 50%), radial-gradient(at 10% 29%, hsla(256, 96%, 68%, 0.3) 0px, transparent 50%), radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 0.2) 0px, transparent 50%), radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 0.3) 0px, transparent 50%), radial-gradient(at 79% 53%, hsla(343, 68%, 73%, 0.2) 0px, transparent 50%); animation: auroraBG 20s ease-in-out infinite alternate; }
  @keyframes auroraBG { from { transform: scale(1); } to { transform: scale(1.5); } }
  .theme-cyberpunk-glass { --primary-color: #08fdd8; --light-bg: #010409; --content-bg: rgba(22, 27, 34, 0.6); --border-color: rgba(139, 148, 158, 0.3); --text-color: #e6edf3; --text-light: #7d8590; }
  .theme-cyberpunk-glass .card { border-image: linear-gradient(to bottom right, var(--primary-color), #7928ca) 1; box-shadow: 0 0 15px rgba(var(--primary-color-rgb, 8, 253, 216), 0.25); }
  .theme-marble-light { --primary-color: #bfa37c; --light-bg: #f7f5f2; --content-bg: rgba(255, 255, 255, 0.7); --border-color: #e0dcd5; --text-color: #3d3a36; --text-light: #6b6661; }
  body.theme-marble-light { background-image: url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23dcd6ca" fill-opacity="0.2"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E'); }
`;
