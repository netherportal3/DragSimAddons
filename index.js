import PogObject from "PogData";
const persistentData = new PogObject("DragSimAddons", {
  LootNumLower: 50,
  backstabStatus: true,
});
var zealotsSinceEye = 0
var Uncertainty = 0
//lootnum simplifier
register("chat", (message, event) => {
  if (message.includes("LootNum:")) {
      cancel(event)
      const regex = /LootNum: (\d+(?:.\d+)?(?:E[+-]?\d+)?) Magic Find Multiplier: (\d+(?:.\d+)?(?:E[+-]?\d+)?)x/g;
      let match;
      while ((match = regex.exec(message)) !== null) {
        const lootNum = parseFloat(match[1]);
        const multiplier = parseFloat(match[2]);
        const roundedMultiplier = (multiplier * 100).toFixed(2);
        zealotsSinceEye = zealotsSinceEye + 1
        if (lootNum>persistentData.LootNumLower) {
          //do nothing :D feel free to edit if you want!
        } else if (lootNum<=persistentData.LootNumLower) {
          ChatLib.chat("&f[&6DSA&f] &a♣&c" + lootNum + "  &6(&b✯" + roundedMultiplier + "&6)")
        }
      }
  } else if (message.includes("Debug mode off.")) {
      ChatLib.say("/debug");
      cancel(event);
      ChatLib.chat(`&f[&6DSA&f] &6Lootnum Hider set to ${persistentData.LootNumLower}`);
  } else if (message.includes("Debug mode on.")) {
      cancel(event);
      ChatLib.chat("&f[&6DSA&f] &6Enabled Debug Mode!");
  } else if (message.includes("RARE DROP! (Summoning Eye)")) {
      cancel(event)
      new Message("&f[&6DSA&f] &6Summoning Eye took " + zealotsSinceEye + " Zealots. &c(&6±" + Uncertainty + "&c)").setChatLineId(5000).chat()
      Uncertainty = 0
      zealotsSinceEye = 0
  } else if (message.includes("Endstone Protector has spawned.") || (message.includes("Your Sleeping Eyes have been awoken by the magic of the dragon."))) {
      Uncertainty = Uncertainty + 1
  } else if (message.includes("Backstab! Damage +150%.") && !persistentData.backstabStatus) {
      cancel(event)
  } else if (message.includes("Cleaning up mobs.")) {
      if (Server.getIP().includes("dragsim.co")) {
        ChatLib.say("/debug")
      }
  };
}).setCriteria("${message}");


register("command", (...arguments) => { //this works fine, but vscode doesn't like '...arguments'
  try {
    const command = String(arguments[0]).toLowerCase();
    switch (command) {
      case "help":
        ChatLib.chat("&f[&6DSA&f] &6Command Arguments");
        ChatLib.chat(ChatLib.getChatBreak("&6-"));
        ChatLib.chat("&f[&6DSA&f] /dsa ln <numxber> - Sets the highest lootnum to display (inclusive)");
        ChatLib.chat("&f[&6DSA&f] /dsa backstab - toggles backstab message visibility");
        ChatLib.chat(ChatLib.getChatBreak("&6-"));
        break;
      case "ln":
        if (arguments.length < 2 || !/^\d+(\.\d+)?$/.test(arguments[1])) {
          ChatLib.chat("&f[&6DSA&f] &cInvalid syntax! Use '/dsa help' for command help");
        } else {
          try {
            persistentData.LootNumLower = parseFloat(arguments[1]);
            persistentData.save()
            ChatLib.chat(`&f[&6DSA&f] &6Won't display LootNum values above &b${persistentData.LootNumLower}`);
          } catch (err) {
            ChatLib.chat("&f[&6DSA&f] &cInvalid syntax! Use '/dsa help' for command help");
          }
        }
        break;
      case "backstab":
        persistentData.backstabStatus = !persistentData.backstabStatus
        persistentData.save()
        break;
      default:
        ChatLib.chat("&f[&6DSA&f] &cInvalid syntax! Use '/dsa help' for command help");
    }
  } catch (err) {
    ChatLib.chat("&f[&6DSA&f] &cInvalid syntax! Use '/dsa help' for command help");
  }
}).setName("dsa").setAliases("dragsimaddons");
