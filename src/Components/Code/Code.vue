<script lang="ts" setup>
import { CodeEditor, type EditorOptions } from 'monaco-editor-vue3';
import { ref, watch } from 'vue';
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

(self as any).MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === 'json') return new jsonWorker()
    if (label === 'css' || label === 'scss' || label === 'less') return new cssWorker()
    if (label === 'html' || label === 'handlebars' || label === 'razor') return new htmlWorker()
    if (label === 'typescript' || label === 'javascript') return new tsWorker()
    return new editorWorker()
  }
}

const code = defineModel<string>('')
const emit = defineEmits<{
  (e: 'update', value: string): void
}>()

const editorOption = ref<EditorOptions>({
  language: 'html',
  automaticLayout: true,
  suggestOnTriggerCharacters: true,
  quickSuggestions: { other: true, comments: false, strings: true }
})

const snippets = {
  blockquote: `
<blockquote style="position: relative; margin: 2em 0; padding: 2em; color: #ffffff; background-image: url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee'); background-size: cover; border-radius: 12px; overflow: hidden;">
  <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.55);"></div>
  <p style="position: relative; z-index: 1; font-size: 1.2rem; font-style: italic;">Quote content</p>
</blockquote>`,

  button: `
<button style="display: inline-block; padding: 12px 24px; background: #0d6efd; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.3s;">Button</button>`,

  card: `
<div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <h3 style="margin: 0 0 12px 0; color: #1e293b;">Card Title</h3>
  <p style="margin: 0; color: #64748b;">Card content goes here</p>
</div>`,

  badge: `<span style="display: inline-block; padding: 4px 12px; background: #0d6efd; color: white; border-radius: 20px; font-size: 12px; font-weight: 600;">Badge</span>`,

  alert: `
<div style="padding: 16px; background: #e7f1ff; border-left: 4px solid #0d6efd; border-radius: 6px; color: #084298;">
  <strong>Alert!</strong> This is an important message.
</div>`,

  table: `
<table style="width: 100%; border-collapse: collapse;">
  <thead>
    <tr style="background: #f5f7fa;">
      <th style="padding: 12px; border-bottom: 2px solid #e2e8f0; text-align: left;">Column 1</th>
      <th style="padding: 12px; border-bottom: 2px solid #e2e8f0; text-align: left;">Column 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Data 1</td>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Data 2</td>
    </tr>
  </tbody>
</table>`,

  form: `
<form style="display: flex; flex-direction: column; gap: 16px;">
  <div>
    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Input:</label>
    <input type="text" placeholder="Enter text" style="padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px; width: 100%;">
  </div>
  <button type="submit" style="padding: 12px; background: #0d6efd; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">Submit</button>
</form>`,

  hero: `
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 80px 20px; text-align: center; border-radius: 12px;">
  <h1 style="margin: 0 0 16px 0; font-size: 48px;">Welcome</h1>
  <p style="margin: 0; font-size: 18px; opacity: 0.9;">Subtitle goes here</p>
</div>`,

  image: `<img src="https://via.placeholder.com/400x300" alt="Image" style="max-width: 100%; height: auto; border-radius: 8px;">`,

  grid: `
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
  <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">Item 1</div>
  <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">Item 2</div>
  <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">Item 3</div>
</div>`,

  confirmationEmail: `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0"
            style="background:#ffffff; border-radius:8px; overflow:hidden;">

            <!-- HEADER -->
            <tr>
              <td
                style="
                  padding:22px;
                  background:#198754;
                  color:#ffffff;
                  font-size:20px;
                  font-weight:bold;
                  text-align:center;
                "
              >
                ✔️ Confirmation de votre compte
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td
                style="
                  padding:25px;
                  color:#333333;
                  font-size:14px;
                  line-height:1.6;
                "
              >
                Bonjour,<br><br>

                Merci de vous être inscrit sur notre plateforme.
                Pour activer votre compte et finaliser votre inscription,
                veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous.<br><br>

                <!-- BUTTON -->
                <div style="text-align:center; margin:25px 0;">
                  <a
                    href="{{confirmation_link}}"
                    style="
                      display:inline-block;
                      padding:12px 24px;
                      background:#198754;
                      color:#ffffff;
                      text-decoration:none;
                      border-radius:6px;
                      font-weight:bold;
                    "
                  >
                    Confirmer mon compte
                  </a>
                </div>

                Si vous n’avez pas créé de compte, vous pouvez ignorer cet email.
                Aucune action ne sera effectuée.<br><br>

                Cordialement,<br>
                L’équipe Support
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td
                style="
                  padding:18px;
                  background:#f5f7fa;
                  color:#666666;
                  font-size:12px;
                  text-align:center;
                  line-height:1.5;
                "
              >
                © 2026 Votre Société<br>
                Cet email est envoyé automatiquement, merci de ne pas y répondre.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
</html>
  `,

  newsletterEmail: `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
  <tr>
    <td align="center">

      <table width="600" cellpadding="0" cellspacing="0"
        style="background:#ffffff; border-radius:8px; overflow:hidden;">

        <!-- HEADER -->
        <tr>
          <td
            style="
              padding:20px;
              background:#0d6efd;
              color:#ffffff;
              font-size:20px;
              font-weight:bold;
              text-align:center;
            "
          >
            📢 Information importante
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td
            style="
              padding:25px;
              color:#333333;
              font-size:14px;
              line-height:1.6;
            "
          >
            Bonjour,
            <p style='font-weight:bolder'>$name</p>
            <br><br>

            Nous souhaitons vous informer qu’une mise à jour importante
            de notre service sera déployée prochainement.
            Cette amélioration vise à renforcer la performance,
            la sécurité et la stabilité de la plateforme.<br><br>

            <div
              style="
                margin:20px 0;
                padding:15px;
                background:#e7f1ff;
                border-left:4px solid #0d6efd;
                color:#084298;
                border-radius:6px;
              "
            >
              La maintenance est prévue le <strong>vendredi 14 février</strong>
              entre <strong>22h00 et 23h00</strong>.
              L’accès au service pourra être temporairement indisponible.
            </div>

            Merci pour votre compréhension et votre confiance.
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td
            style="
              padding:20px;
              background:#f5f7fa;
              color:#666666;
              font-size:12px;
              text-align:center;
              line-height:1.5;
            "
          >
            © 2026 bokyshoping<br>
            Vous recevez cet email car vous êtes inscrit à nos communications.<br>
            <span style="color:#0d6efd;">Se désabonner</span>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
  </body>
</html>

  `
}

const insertSnippet = (key: keyof typeof snippets) => {
  code.value += '\n' + snippets[key] + '\n'
}

const handleReady = () => {}


watch(() => code.value, () => {
  emit('update', code.value as string)
})
</script>
<template>
  <div class="toolbar-container">
    <div class="toolbar">
      <el-dropdown class="toolbar-dropdown">
      <button class="toolbar-btn">
        <i class="fas fa-envelope"></i> Email Templates
      </button>
      <template #dropdown>
        <el-dropdown-menu>
        <el-dropdown-item @click="insertSnippet('confirmationEmail')">
          <i class="fas fa-check-circle"></i> Account Confirmation
        </el-dropdown-item>
        <el-dropdown-item @click="insertSnippet('newsletterEmail')">
          <i class="fas fa-newspaper"></i> Newsletter
        </el-dropdown-item>
        </el-dropdown-menu>
      </template>
      </el-dropdown>

      <el-dropdown class="toolbar-dropdown">
      <button class="toolbar-btn">
        <i class="fas fa-cube"></i> Components
      </button>
      <template #dropdown>
        <el-dropdown-menu>
        <el-dropdown-item @click="insertSnippet('card')">
          <i class="fas fa-square"></i> Card
        </el-dropdown-item>
        <el-dropdown-item @click="insertSnippet('button')">
          <i class="fas fa-click"></i> Button
        </el-dropdown-item>
        <el-dropdown-item @click="insertSnippet('badge')">
          <i class="fas fa-tag"></i> Badge
        </el-dropdown-item>
        <el-dropdown-item @click="insertSnippet('alert')">
          <i class="fas fa-exclamation-circle"></i> Alert
        </el-dropdown-item>
        <el-dropdown-item @click="insertSnippet('hero')">
          <i class="fas fa-image"></i> Hero
        </el-dropdown-item>
        </el-dropdown-menu>
      </template>
      </el-dropdown>

      <el-dropdown class="toolbar-dropdown">
      <button class="toolbar-btn">
        <i class="fas fa-table"></i> Layouts
      </button>
      <template #dropdown>
        <el-dropdown-menu>
        <el-dropdown-item @click="insertSnippet('grid')">
          <i class="fas fa-grip"></i> Grid
        </el-dropdown-item>
        <el-dropdown-item @click="insertSnippet('table')">
          <i class="fas fa-table"></i> Table
        </el-dropdown-item>
        <el-dropdown-item @click="insertSnippet('form')">
          <i class="fas fa-wpforms"></i> Form
        </el-dropdown-item>
        </el-dropdown-menu>
      </template>
      </el-dropdown>

      <el-dropdown class="toolbar-dropdown">
        <button class="toolbar-btn">
          <i class="fas fa-quote-left"></i> Content
        </button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="insertSnippet('blockquote')">
              <i class="fas fa-quote-left"></i> Blockquote
            </el-dropdown-item>
            <el-dropdown-item @click="insertSnippet('image')">
              <i class="fas fa-image"></i> Image
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div class="toolbar-divider danger"></div>
      <button class="toolbar-btn danger" @click="code=''" title="Clear">
        <i class="fas fa-trash-alt"></i> Clear
      </button>
    </div>
  </div>

  <div class="editor-container">
    <div class="editor-wrapper">
      <div class="editor-header">
        <h2 class="editor-title"><i class="fas fa-code"></i> Code Editor</h2>
        <span class="editor-info">{{ code?code.length:0 }} chars</span>
      </div>
      <div class="editor-body">
        <code-editor 
          style="height: 600px; border-radius: 12px; overflow: hidden;" 
          v-model:value="code" 
          :options="editorOption" 
          @ready="handleReady"
          theme="vs-dark">
        </code-editor>
      </div>
    </div>
  </div>
</template>

<style scoped>
  * { box-sizing: border-box; }

  .toolbar-container {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    padding: 16px 20px;
    border-bottom: 1px solid rgba(99, 102, 241, 0.2);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .toolbar {
    display: flex;
    gap: 12px;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    flex-wrap: wrap;
  }

  .toolbar-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid rgba(99, 102, 241, 0.3);
    color: #e2e8f0;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .toolbar-btn:hover {
    background: rgba(99, 102, 241, 0.2);
    border-color: rgba(99, 102, 241, 0.6);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  .toolbar-btn.danger:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.5);
  }

  .toolbar-divider {
    width: 1px;
    height: 28px;
    background: rgba(99, 102, 241, 0.2);
    margin: 0 8px;
  }

  .editor-container {
    background: linear-gradient(135deg, #0f172a 0%, #1a1f35 100%);
    min-height: calc(100vh - 120px);
    padding: 32px 20px;
  }

  .editor-wrapper {
    max-width: 1400px;
    margin: 0 auto;
    background: #1e293b;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(99, 102, 241, 0.2);
  }

  .editor-wrapper:hover {
    border-color: rgba(99, 102, 241, 0.4);
    box-shadow: 0 20px 50px rgba(99, 102, 241, 0.15);
  }

  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 28px;
    background: linear-gradient(135deg, #475569 0%, #334155 100%);
    border-bottom: 1px solid rgba(99, 102, 241, 0.2);
  }

  .editor-title {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: #e2e8f0;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .editor-info {
    font-size: 12px;
    color: #94a3b8;
    background: rgba(99, 102, 241, 0.1);
    padding: 6px 14px;
    border-radius: 20px;
    border: 1px solid rgba(99, 102, 241, 0.2);
  }

  .editor-body {
    padding: 20px;
  }
</style>
