import Settings from "./config";

var zealotsSinceEye = 0
var Uncertainty = 0
let dragLootNumCheck = false

register("chat", (message, event) => {
  if (message.includes("Drag Score: ")&& message.includes("Eyes Placed: ")) {
    dragLootNumCheck = true
  }
  if (message.includes("LootNum:") && Settings.LootNumToggle) {
      cancel(event)
      const regex = /LootNum: (\d+(?:.\d+)?(?:E[+-]?\d+)?) Magic Find Multiplier: (\d+(?:.\d+)?(?:E[+-]?\d+)?)x/g;
      let match;
      while ((match = regex.exec(message)) !== null) {
        const lootNum = parseFloat(match[1]);
        const multiplier = parseFloat(match[2]);
        const roundedMultiplier = (multiplier * 100).toFixed(2);
        if (dragLootNumCheck && Settings.dragLootNumHiderOverride) {
          dragLootNumCheck = false
          ChatLib.chat("&f[&6DSA&f] &4[&cDragon&4] &a♣&c" + lootNum + "  &6(&b✯" + roundedMultiplier + "&6)")
        } else {
          zealotsSinceEye = zealotsSinceEye + 1
          if (lootNum>Settings.lootNumLowerValue) {
            //do nothing, lootnum value was too high
          } else if (lootNum<=Settings.lootNumLowerValue) {
            ChatLib.chat("&f[&6DSA&f] &a♣&c" + lootNum + "  &6(&b✯" + roundedMultiplier + "&6)")
          }
        }
      }
  } else if (message.includes("Your magic weapon hit") && Settings.magicWeaponHiderVar) {
      cancel(event)
      // do simplification here if I want later :D
  } else if (message.includes("FIREBALL!!") && Settings.fireballVar) {
      //fireball title
      Client.showTitle("&cFireball","",0,40,5)
      //entity.ender_dragon.name do stuff with this
  } else if (message.includes("Debug mode off.")) {
      ChatLib.say("/debug");
      cancel(event);
      ChatLib.chat(`&f[&6DSA&f] &6Lootnum Hider set to ${(Settings.lootNumLowerValue).toString()}`);
  } else if (message.includes("Debug mode on.")) {
      cancel(event);
      ChatLib.chat("&f[&6DSA&f] &6Enabled Debug Mode!");
  } else if (message.includes("RARE DROP! (Summoning Eye)") && Settings.eyeTrackerVar) {
      cancel(event)
      new Message("&f[&6DSA&f] &6Summoning Eye took " + zealotsSinceEye + " Zealots. &c(&6±" + Uncertainty + "&c)").setChatLineId(5000).chat()
      Uncertainty = 0
      zealotsSinceEye = 0
  } else if (message.includes("Endstone Protector has spawned.") || (message.includes("Your Sleeping Eyes have been awoken by the magic of the dragon."))) {
      Uncertainty = Uncertainty + 1
  } else if (message.includes("Backstab! Damage +150%.") && Settings.lividDaggerSpam) {
      cancel(event)
  } else if (message.includes("Cleaning up mobs.") && Server.getIP().includes("dragsim.co") && Settings.autoDebugVar) {
    ChatLib.say("/debug")
  };
}).setCriteria("${message}");


register("command", (...arguments) => { //this works fine, but vscode doesn't like '...arguments'
  Settings.openGUI()
}).setName("dsa").setAliases("dragsimaddons");
