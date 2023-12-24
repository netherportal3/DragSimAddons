import { @Vigilant, @SwitchProperty, @DecimalSliderProperty, Color } from 'Vigilance';
@Vigilant("DragSimAddons")
class Settings {

    @SwitchProperty({
        name: 'LootNum Hider Toggle',
        description: 'Toggles the LootNum Hider',
        category: 'Chat Tools',
        subcategory: 'LootNum Hider',
        placeholder: 'Activate',
    })
    LootNumToggle = true;

    @SwitchProperty({
        name: 'Backstab Hider',
        description: "Toggles the Livid Dagger's Backstab messages.",
        category: 'Chat Tools',
        subcategory: 'Misc. Antispam',
        placeholder: 'Activate',
    })
    lividDaggerSpam = false;

    @SwitchProperty({
        name: 'Fireball Title',
        description: "Toggles notifying the player during fireballs.",
        category: 'WIP',
        subcategory: 'Notifiers',
        placeholder: 'Activate',
    })
    fireballVar = false;

    @SwitchProperty({
        name: 'Fireball Dragon Locator &f(&cBROKEN&f)',
        description: "Adds location data to the fireball title.",
        category: 'WIP',
        subcategory: 'Notifiers',
        placeholder: 'Activate',
    })
    dragonLocator = false;

    @SwitchProperty({
        name: 'Auto-Debug Enabler',
        description: "Auto-Enables /debug when mobs reset. \n&a(Strongly Recommended)",
        category: 'Chat Tools',
        subcategory: 'Auto-Debug Enabler',
        placeholder: 'Activate',
    })
    autoDebugVar = true;

    @SwitchProperty({
        name: 'Magic Weapon Hider',
        description: "Toggles the 'Your magic weapon hit...' message.",
        category: 'Chat Tools',
        subcategory: 'Misc. Antispam',
        placeholder: 'Activate',
    })
    magicWeaponHiderVar = true;

    @SwitchProperty({
        name: 'Summoning Eye Tracker',
        description: "Displays how many Zealots it took to get each eye. ",
        category: 'Chat Tools',
        subcategory: 'Eye Tracker',
        placeholder: 'Activate',
    })
    eyeTrackerVar = true;
    
    @DecimalSliderProperty({
        name: 'LootNum Hider Bound',
        description: "Won't display LootNum values above this number.",
        category: 'Chat Tools',
        subcategory: 'LootNum Hider',
        minF: 0.0,
        maxF: 10.0,
        decimalPlaces: 2,
    })
    lootNumLowerValue = 5.0;

    @SwitchProperty({
        name: 'Dragon LootNum Hider',
        description: "Override LootNum Hider on Dragon Kills \n&a(Strongly Recommended)",
        category: 'Chat Tools',
        subcategory: 'LootNum Hider',
        placeholder: 'Activate',
    })
    dragLootNumHiderOverride = true;

    


    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", "shows... cool stuff :)")
        this.setSubcategoryDescription("General", "Category", "Shows off some nifty property examples.")

        this.setCategoryDescription("Chat Tools", "Chat-Based Tools")
        this.setSubcategoryDescription("Chat Tools", "LootNum Hider", "LootNum Hider settings")
        this.setSubcategoryDescription("Chat Tools", "Misc. Antispam", "Some miscellanious anti-spam features")
        this.setSubcategoryDescription("Chat Tools", "Auto-Debug Enabler", "Features for Auto-Enabling /debug")
        this.setSubcategoryDescription("Chat Tools", "Eye Tracker", "Features for tracking Summoning Eyes")


        this.setCategoryDescription("WIP", "&cWork-In-Progress tools, probably won't function correctly.")
        this.setSubcategoryDescription("WIP", "Notifiers", "Notifiers for events")

    }
}
export default new Settings();
