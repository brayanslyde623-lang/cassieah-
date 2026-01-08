import axios from "axios";
import fs from "fs-extra";
import request from "request";

interface CommandConfig {
  name: string;
  aliases: string[];
  version: string;
  author: string;
  countDown: number;
  role: number;
  shortDescription: string;
  longDescription: string;
  category: string;
  guide: {
    vi: string;
    en: string;
  };
}

interface OnStartParams {
  api: any;
  event: {
    threadID: number;
  };
  args: string[];
  message: any;
}

const outCommand = {
  config: {
    name: "out",
    aliases: ["l"],
    version: "1.0",
    author: "Brayan Stack's 🫆🇨🇩",
    countDown: 5,
    role: 2,
    shortDescription: "Bot will leave GC",
    longDescription: "",
    category: "admin",
    guide: {
      vi: "{pn} [tid,blank]",
      en: "{pn} [tid,blank]"
    }
  } as CommandConfig,

  onStart: async function ({ api, event, args }: OnStartParams): Promise<void> {
    let threadID: number;

    // Si aucun argument, quitter le groupe actuel
    if (!args.join(" ")) {
      threadID = event.threadID;
    } else {
      threadID = parseInt(args.join(" "), 10);
    }

    // Message encadré simple pour compatibilité Messenger/Discord-like
    const framedMessage = `
💌 ❲ 𝗕𝗿𝗮𝘆𝗮𝗻 𝘚𝘵𝗮𝗰𝗸'𝘀 🫆🇨🇩 ❳ 💌
━━━━━━━━━━━━━━━
🟦 𝐎𝐊 𝐁𝐘𝐄 - 𝐋𝐄𝐅𝐓 𝐆𝐑𝐎𝐔𝐏 🫸🩵🫷 🟦
━━━━━━━━━━━━━━━
`;

    // Envoi le message et quitte le groupe
    return api.sendMessage(framedMessage, threadID, () =>
      api.removeUserFromGroup(api.getCurrentUserID(), threadID)
    );
  }
};

export default outCommand;