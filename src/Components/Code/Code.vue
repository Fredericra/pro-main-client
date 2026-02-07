<script lang="ts" setup>
import { ArrowDownBold, CirclePlus, Message } from '@element-plus/icons-vue';
import { CodeEditor, type EditorOptions } from 'monaco-editor-vue3';
import { ref, watch } from 'vue';


const code = defineModel<string>('')
const emit = defineEmits<{
    (e: 'update', value: string): void
}>()
const editorOption = ref<EditorOptions>({
    language: 'html',
    automaticLayout: true,
    suggestOnTriggerCharacters: true,
    quickSuggestions: {
        other: true,
        comments: false,
        strings: true,
    }
})
const handleReady = () => {

}
const blockquote = () => {
code.value += `
<blockquote
  style="
    position: relative;
    margin: 2em 0;
    padding: 2em;
    color: #ffffff;
    background-image: url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee');
    background-size: cover;
    background-position: center;
    border-radius: 12px;
    overflow: hidden;
  "
>
  <div
    style="
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.55);
    "
  ></div>

  <p
    style="
      position: relative;
      z-index: 1;
      margin: 0;
      font-size: 1.2rem;
      font-style: italic;
      line-height: 1.7;
    "
  >
    Le succès n’est pas final, l’échec n’est pas fatal : c’est le courage de continuer qui compte.
  </p>

  <footer
    style="
      position: relative;
      z-index: 1;
      margin-top: 1em;
      font-size: 0.9rem;
      opacity: 0.85;
    "
  >
    — Winston Churchill
  </footer>
</blockquote>


`
}
watch(() => code.value, () => {
    if (code.value) emit('update', code.value);
})
const listOl = ()=>{
    code.value+=`
<ol style="list-style-type:decimal;counter-reset: step;padding-left: 1.5rem;margin: 1em 0;">
  <li>Installer l’application</li>
  <li>Configurer les paramètres</li>
  <li>Créer un compte utilisateur</li>
  <li>Valider et lancer le projet</li>
</ol>`
}
const linkStyle = (style:string)=>{
    code.value+=`
\n
<a href="#" style="display: inline-block;padding: 0.6em 1.2em;margin: 0.25em;font-size: 0.95rem;font-weight: 500;text-decoration: none;
  border-radius: 6px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
${style}">Primary</a>
    `
}
const blockquoteLeft = ()=>{
    code.value+=`
    <blockquote
  style="
    margin: 1.5em 0;
    padding: 1em 1.25em;
    background: #f5f7fa;
    border-left: 4px solid #0d6efd;
    color: #333;
    font-style: normal;
  "
>
  Ce message informe les utilisateurs qu’une maintenance est prévue
  ce soir entre 22h00 et 23h00.
</blockquote>

    `
}

const message = ()=>{
    code.value +=`
<!-- Container -->
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
            Bonjour,<br><br>

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
            © 2026 Votre Société<br>
            Vous recevez cet email car vous êtes inscrit à nos communications.<br>
            <span style="color:#0d6efd;">Se désabonner</span>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
    `
}
const messageConfirm = ()=>{
    code.value +=`
    \n
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
    `
}
</script>
<template>
    <div class=" shadow-md shadow-gray-400 h-8 flex justify-start items-center">
        <div class="item" @click="blockquote">
            <i class="fas fa-quote-left"></i>
        </div>
        <div class="item" @click="blockquoteLeft">
            <i class="fas fa-quote-right"></i>
        </div>
        <el-dropdown class="px-2 item">
            <span class="el-dropdown-link mt-1">
                <span class="mx-4 text-black font-bold">List</span>
                <el-icon class="el-icon--right">
                    <i class="fas fa-bars"></i>
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="listOl">
                        <template #icon>
                            <el-icon>
                                <i class="fas fa-list-ol"></i>
                            </el-icon>
                        </template>
                    </el-dropdown-item>
                    <el-dropdown-item @click="listOl">
                        <el-icon>
                            <i class="fas fa-list-ul"></i>
                        </el-icon>
                    </el-dropdown-item>
                    <el-dropdown-item @click="listOl">
                        <el-icon>
                            <i class="fas fa-list"></i>
                        </el-icon>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <el-dropdown class="px-2 item">
            <span class="el-dropdown-link mt-1">
                <span class="mx-4 text-black font-bold">Header</span>
                <el-icon class="el-icon--right">
                    <ArrowDownBold />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item :icon="CirclePlus" @click="code+=`\n<h1></h1>`">Header 1</el-dropdown-item>
                    <el-dropdown-item :icon="CirclePlus" @click="code+=`\n<h2></h2>`">Header 2</el-dropdown-item>
                    <el-dropdown-item :icon="CirclePlus" @click="code+=`\n<h3></h3>`">Header 3</el-dropdown-item>
                    <el-dropdown-item :icon="CirclePlus" @click="code+=`\n<h4></h4>`">Header 4</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <el-dropdown class="px-2 item">
            <span class="el-dropdown-link mt-1">
                <span class="mx-4 text-black font-bold">Button</span>
                <el-icon class="el-icon--right">
                    <ArrowDownBold />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item :icon="CirclePlus"
                    @click="linkStyle('color: #fff;background: #0d6efd;')">Primary</el-dropdown-item>
                    <el-dropdown-item :icon="CirclePlus"
                    @click="linkStyle('color: #fff;background: #dc3545;')"
                    >Danger</el-dropdown-item>
                    <el-dropdown-item :icon="CirclePlus"
                    @click="linkStyle('color: #fff;background: #198754;')"
                    >Success</el-dropdown-item>
                    <el-dropdown-item :icon="CirclePlus"
                    @click="linkStyle('background: #31d2f2;')"
                    >Infos</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <div class="item" @click="code+=`\n<img src='' alt=''>`">
            <i class="fas fa-image"></i>
        </div>
         <div class="item" @click="message">
            <el-icon>
                <Message/>
            </el-icon>
        </div>
         <div class="item" @click="messageConfirm">
            <el-icon>
                <Message/>
            </el-icon>
        </div>
    </div>
    <code-editor style="height: 150vh;" v-model:value="code" :options="editorOption" @ready="handleReady"
        theme="hc-black"></code-editor>
</template>