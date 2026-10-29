# 🐳 Curso Docker – Infoeste (projeto inicial)

Uma **lista de tarefas** (to-do list) feita em **Next.js** que guarda os dados num banco **MongoDB**.

Este repositório tem **apenas a aplicação**. Durante a aula, vamos construir juntos:

- o **`Dockerfile`**, para empacotar a aplicação numa imagem;
- o **`compose.yaml`**, para subir a aplicação e o MongoDB com um único comando.

---

## 📁 Estrutura

```
app/
  page.js                 # tela da lista de tarefas
  layout.js, globals.css  # layout e estilos
  api/todos/route.js      # GET (listar) e POST (criar)
  api/todos/[id]/route.js # PATCH (editar/concluir) e DELETE (excluir)
lib/
  mongodb.js              # conexão com o MongoDB
next.config.mjs           # output: "standalone" (gera um server.js enxuto pro Docker)
package.json
```

## ⚙️ Variáveis de ambiente

| Variável      | Padrão                              | Para que serve            |
| ------------- | ----------------------------------- | ------------------------- |
| `MONGODB_URI` | `mongodb://localhost:27017/todos`   | Endereço do banco MongoDB |

## 📜 Scripts

| Comando         | O que faz                                   |
| --------------- | ------------------------------------------- |
| `npm install`   | instala as dependências                     |
| `npm run dev`   | sobe em modo desenvolvimento (porta 3000)   |
| `npm run build` | gera o build de produção                    |
| `npm start`     | roda o build de produção (porta 3000)       |

> A aplicação precisa de **Node.js 20+** e de um **MongoDB** rodando — e é justamente isso que o Docker vai resolver pra gente. 😉
