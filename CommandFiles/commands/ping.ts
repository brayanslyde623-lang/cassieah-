import { MessageEvent } from "fb-chat-api"; // adapte si besoin

module.exports = {
  config: {
    name: "ping",
    aliases: ["pong"],
    version: "1.0.0",
    author: "🩵Brayan🍀🪽",
    role: 0, // 0 = tout le monde | 1 = admin
    shortDescription: "Teste la latence du bot",
    longDescription: "Commande ping pour vérifier si le bot est actif",
    category: "system",
    guide: {
      fr: "Utilisation : ping"
    }
  },

  onStart: async function ({ api, event }: any) {
    const start = Date.now();

    await api.sendMessage("🏓 Pong !", event.threadID);

    const latency = Date.now() - start;

    api.sendMessage(
      `⏱️ Latence : ${latency} ms\n✅ Bot en ligne`,
      event.threadID
    );
  }
};
