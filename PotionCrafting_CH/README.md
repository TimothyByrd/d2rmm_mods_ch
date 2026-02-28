# PotionCrafting_CH

#### Table of contents

[Cube crafting using potions for D2RMM](#h01)<br>
[Rerolling items](#h02)<br>
[Socketing](#h03)<br>
[Potions](#h04)<br>
[Example: Crafting a Giant Thresher for Infinity](#h05)<br>
[Version history](#h06)<br>


## Cube crafting using potions for D2RMM
<a name="h01" />

**Warning: Being able to to craft pretty much any equipment - runeword base, charm or unique - can take the fun out of the game.**

This mod adds recipes for more item crafting using the Horadric cube.
We may not have Chaos Orbs, Orbs of Scouring and the like, but we do have... potions.

These recipes use potions (and occasionally scrolls) to mark what actions to take.
In general, Thawing potions loosen things up to take them apart, while Antidote potions make things better,
and Stamina potions are for recipes where you are likely to want to keep on going. :)

For items, sockets can be added or removed, socket-fillers can be extracted, basic items can be upgraded to exceptional or elite. And more.

There are recipes to get the effect of rerolling charms, rings, amulets and jewels.

There are also recipes for upgrading and converting potions, which could really be considered "potion crafting".

Note that the "Breakpoint and Recipe UI Panels" mod must install before this mod for recipes to be added to UI Panel.

## Rerolling items
<a name="h02" />

If __`Convert to normal item`__ is enabled, then recipes are added to convert Unique/Set/Rare/Magic/Superior items to Normal items,
or Low Quality -> Normal -> Superior.

- The recipe is: item + Antidote potion + Stamina Potion.

If __`Upgrade item`__ is enabled, then recipes are added to:

- Upgrade to Exceptional or Elite: item + Antidote Potion + Identify Scroll.
- Upgrade to Ethereal: item + Antidote Potion + Stamina Potion + Thawing Potion.
- Repair: item + Antidote Potion + Thawing Potion.

If __`Reroll item`__ is enabled, then recipes are added to reroll an item.

- The base reroll recipe is: item + Stamina Potion + Identify Scroll.
- The recipe: item + Stamina Potion + Identify Scroll + Full Rejuvination Potion rerolls at high item level.
- The recipe: item + Antidote Potion + Stamina Potion + Identify Scroll converts Normal/Superior -> Magic -> Rare.
- The recipe: item + Antidote Potion + Identify Tome converts to a Set item.
If the item is inappropriate or not high enough ilvl, it will become a failed set item.
Items from the Cow King's set cannot be made with this recipe.
- The recipe: item + Antidote Potion + Portal Tome converts to a Unique item.
If the item is inappropriate or not high enough ilvl, it will become a failed unique item.
Also, unless __`Fix unique items for crafting`__ is enabled, a given Unique can only appear once per game.
(Charms will obey the "only one in possession" requirement.)

If __`Reroll jewelry`__ is enabled, then the following recipes are added:

- 2 Magic rings -> Magic amulet
- 2 Magic amulets -> Magic ring
- 2 Rare rings -> Rare amulet
- 2 Rare amulets -> Rare ring
- 2 Magic jewels -> Rare jewel
- 2 Rare jewels -> Magic jewel
- 2 Charms -> Charm of same size
- Charm + Antidote Potion + Stamina Portal -> next size of charme
- Amulet + Thawing Potion -> Jewel
- Ring + Thawing Potion -> Small Charm

## Socketing
<a name="h03" />

If __`Toggle sockets`__ is enabled, then recipes are added to toggle sockets in normal and superior items.
This will reroll the item.

- The recipe to toggle sockets on/off is: item + Stamina Potion
- The recipe: item + Stamina Potion + Minor Health Potion tries to set 2 sockets.
- The recipe: item + Stamina Potion + Light Health Potion tries to set 3 sockets.
- The recipe: item + Stamina Potion + (Standard) Health Potion tries to set 4 sockets.
- The recipe: item + Stamina Potion + Greater Health Potion tries to set 5 sockets.
- The recipe: item + Stamina Potion + Super Health Potion tries to set 6 sockets.

If __`Add sockets`__ is enabled, then recipes are added to add sockets to Unique/Set/Rare/Magic items.

- The recipe is item + Antidote Potion + Portal Scroll.

If __`Remove items from sockets`__ is enabled, then recipes are added for weapons and armor to remove items from sockets,
recovering both the item and the socket fillers.

- The recipe is item + Thawing potion.

Since a 2x4 weapon may have up to 6 sockets, unsocketing such an item will require an Expanded Cube mod to have enough space.

## Potions
<a name="h04" />

If __`Upgrade Health and Mana potions`__ is enabled, these recipes are added:

- 2 Minor Health -> Light Health
- 2 Light Health -> Standard Health
- 2 Standard Health -> Greater Health
- 2 Greater Health -> Super Health
- 2 Minor Mana -> Light Mana
- 2 Light Mana -> Standard Mana
- 2 Standard Mana -> Greater Mana
- 2 Greater Mana -> Super Mana

If __`Split Health and Mana potions`__ is enabled, these recipes are added:

- Light Health + Thawing -> 2 Minor Health
- Standard Health + Thawing -> 2 Light Health
- Greater Health + Thawing -> 2 Standard Health
- Super Health + Thawing -> 2 Greater Health
- Light Mana + Thawing -> 2 Minor Mana
- Standard Mana + Thawing -> 2 Light Mana
- Greater Mana + Thawing -> 2 Standard Mana
- Super Mana + Thawing -> 2 Greater Mana

If __`Convert between Health and Mana potions`__ is enabled, these recipes are added:

- Minor Health -> Minor Mana
- Minor Mana -> Minor Health
- Light Health -> Light Mana
- Light Mana -> Light Health
- Standard Health -> Standard Mana
- Standard Mana -> Standard Health
- Greater Health -> Greater Mana
- Greater Mana -> Greater Health
- Super Health -> Super Mana
- Super Mana -> Super Health

If __`Recipes for Full Rejuvination potion`__ is enabled, these recipes are added:

- 1 Health Potion + 1 Mana Potion -> Small Rejuvination Potion
- 2 Small Rejuv -> Full Rejuvination Potion

If __`Cycle between other potions/scrolls`__ is enabled, these recipes are added:

- Antidote Potion -> Stamina Potion
- Stamina Potion -> Thawing Potion
- Thawing Potion -> Identify Scroll
- Identify Scroll -> Portal Scroll
- Portal Scroll -> Antidote Potion

If __`Specific charms and jewels`__ is enabled, these recipes are added:

- Jewel + Perfect Skull -> Max Damage Jewel
- Jewel + Perfect Amethyst -> % Damage Jewel
- Jewel + Perfect Diamond -> All Resistaances Jewel
- Jewel + Perfect Sapphire -> Resist Cold Jewel
- Jewel + Perfect Ruby -> Resist Fire Jewel
- Jewel + Perfect Topaz -> Resist Lightning Jewel
- Jewel + Perfect Emerald -> Resist Poison Jewel
- Jewel + Stamina Potion -> Jewel of Attack Speed
- Jewel + Thawing Potion -> Jewel of Lower Requirements
- Jewel + Perfect Skull + Stamina Potion -> Max Damage Jewel of Attack Speed
- Jewel + Perfect Skull + Thawing Potion -> Max Damage Jewel of Lower Requirements
- Jewel + Perfect Amethyst + Stamina Potion -> % Damage Jewel of Attack Speed
- Jewel + Perfect Amethyst + Thawing Potion -> % Damage Jewel of Lower Requirements
- Jewel + Perfect Diamond + Stamina Potion -> All Resistaances Jewel of Attack Speed
- Jewel + Perfect Diamond + Thawing Potion -> All Resistaances Jewel of Lower Requirements
- Jewel + Perfect Sapphire + Stamina Potion -> Resist Cold Jewel of Attack Speed
- Jewel + Perfect Sapphire + Thawing Potion -> Resist Cold Jewel of Lower Requirements
- Jewel + Perfect Ruby + Stamina Potion -> Resist Fire Jewel of Attack Speed
- Jewel + Perfect Ruby + Thawing Potion -> Resist Fire Jewel of Lower Requirements
- Jewel + Perfect Topaz + Stamina Potion -> Resist Lightning Jewel of Attack Speed
- Jewel + Perfect Topaz + Thawing Potion -> Resist Lightning Jewel of Lower Requirements
- Jewel + Perfect Emerald + Stamina Potion -> Resist Poison Jewel of Attack Speed
- Jewel + Perfect Emerald + Thawing Potion -> Resist Poison Jewel of Lower Requirements
- Grand Charm + Chipped Topaz -> Fletcher's Charm
- Grand Charm + Flawed Topaz -> Acrobat's Charm
- Grand Charm + Flawless Topaz -> Harpoonist's Charm
- Grand Charm + Chipped Sapphire -> Burning Charm
- Grand Charm + Flawed Sapphire -> Sparking Charm
- Grand Charm + Flawless Sapphire -> Chilling Charm
- Grand Charm + Chipped Skull -> Hexing Charm
- Grand Charm + Flawed Skull -> Fungal Charm
- Grand Charm + Flawless Skull -> Graverobber's Charm
- Grand Charm + Chipped Diamond -> Lion Branded Charm
- Grand Charm + Flawed Diamond -> Captain's Charm
- Grand Charm + Flawless Diamond -> Preserver's Charm
- Grand Charm + Chipped Amethyst -> Expert's Charm
- Grand Charm + Flawed Amethyst -> Fanatic Charm
- Grand Charm + Flawless Amethyst -> Sounding Charm
- Grand Charm + Chipped Ruby -> Trainer's Charm
- Grand Charm + Flawed Ruby -> Spiritual Charm
- Grand Charm + Flawless Ruby -> Nature's Charm
- Grand Charm + Chipped Emerald -> Entrapping Charm
- Grand Charm + Flawed Emerald -> Mentalist's Charm
- Grand Charm + Flawless Emerald -> Shogukusha's Charm
- Grand Charm + Perfect Skull -> Sharp Charm
- Grand Charm + Perfect Diamond -> Shimmering Charm
- Grand Charm + Thawing Potion -> Charm of Balance
- Grand Charm + Portal Scroll -> Charm of Greed
- Grand Charm + Mana Potion -> Charm of Sustenance
- Grand Charm + Health Potion -> Charm of Vita
- Grand Charm + Stamina Potion -> Charm of Inertia
- Grand Charm + Chipped Topaz + Thawing Potion -> Fletcher's Charm of Balance
- Grand Charm + Chipped Topaz + Portal Scroll -> Fletcher's Charm of Greed
- Grand Charm + Chipped Topaz + Mana Potion -> Fletcher's Charm of Sustenance
- Grand Charm + Chipped Topaz + Health Potion -> Fletcher's Charm of Vita
- Grand Charm + Chipped Topaz + Stamina Potion -> Fletcher's Charm of Inertia
- Grand Charm + Flawed Topaz + Thawing Potion -> Acrobat's Charm of Balance
- Grand Charm + Flawed Topaz + Portal Scroll -> Acrobat's Charm of Greed
- Grand Charm + Flawed Topaz + Mana Potion -> Acrobat's Charm of Sustenance
- Grand Charm + Flawed Topaz + Health Potion -> Acrobat's Charm of Vita
- Grand Charm + Flawed Topaz + Stamina Potion -> Acrobat's Charm of Inertia
- Grand Charm + Flawless Topaz + Thawing Potion -> Harpoonist's Charm of Balance
- Grand Charm + Flawless Topaz + Portal Scroll -> Harpoonist's Charm of Greed
- Grand Charm + Flawless Topaz + Mana Potion -> Harpoonist's Charm of Sustenance
- Grand Charm + Flawless Topaz + Health Potion -> Harpoonist's Charm of Vita
- Grand Charm + Flawless Topaz + Stamina Potion -> Harpoonist's Charm of Inertia
- Grand Charm + Chipped Sapphire + Thawing Potion -> Burning Charm of Balance
- Grand Charm + Chipped Sapphire + Portal Scroll -> Burning Charm of Greed
- Grand Charm + Chipped Sapphire + Mana Potion -> Burning Charm of Sustenance
- Grand Charm + Chipped Sapphire + Health Potion -> Burning Charm of Vita
- Grand Charm + Chipped Sapphire + Stamina Potion -> Burning Charm of Inertia
- Grand Charm + Flawed Sapphire + Thawing Potion -> Sparking Charm of Balance
- Grand Charm + Flawed Sapphire + Portal Scroll -> Sparking Charm of Greed
- Grand Charm + Flawed Sapphire + Mana Potion -> Sparking Charm of Sustenance
- Grand Charm + Flawed Sapphire + Health Potion -> Sparking Charm of Vita
- Grand Charm + Flawed Sapphire + Stamina Potion -> Sparking Charm of Inertia
- Grand Charm + Flawless Sapphire + Thawing Potion -> Chilling Charm of Balance
- Grand Charm + Flawless Sapphire + Portal Scroll -> Chilling Charm of Greed
- Grand Charm + Flawless Sapphire + Mana Potion -> Chilling Charm of Sustenance
- Grand Charm + Flawless Sapphire + Health Potion -> Chilling Charm of Vita
- Grand Charm + Flawless Sapphire + Stamina Potion -> Chilling Charm of Inertia
- Grand Charm + Chipped Skull + Thawing Potion -> Hexing Charm of Balance
- Grand Charm + Chipped Skull + Portal Scroll -> Hexing Charm of Greed
- Grand Charm + Chipped Skull + Mana Potion -> Hexing Charm of Sustenance
- Grand Charm + Chipped Skull + Health Potion -> Hexing Charm of Vita
- Grand Charm + Chipped Skull + Stamina Potion -> Hexing Charm of Inertia
- Grand Charm + Flawed Skull + Thawing Potion -> Fungal Charm of Balance
- Grand Charm + Flawed Skull + Portal Scroll -> Fungal Charm of Greed
- Grand Charm + Flawed Skull + Mana Potion -> Fungal Charm of Sustenance
- Grand Charm + Flawed Skull + Health Potion -> Fungal Charm of Vita
- Grand Charm + Flawed Skull + Stamina Potion -> Fungal Charm of Inertia
- Grand Charm + Flawless Skull + Thawing Potion -> Graverobber's Charm of Balance
- Grand Charm + Flawless Skull + Portal Scroll -> Graverobber's Charm of Greed
- Grand Charm + Flawless Skull + Mana Potion -> Graverobber's Charm of Sustenance
- Grand Charm + Flawless Skull + Health Potion -> Graverobber's Charm of Vita
- Grand Charm + Flawless Skull + Stamina Potion -> Graverobber's Charm of Inertia
- Grand Charm + Chipped Diamond + Thawing Potion -> Lion Branded Charm of Balance
- Grand Charm + Chipped Diamond + Portal Scroll -> Lion Branded Charm of Greed
- Grand Charm + Chipped Diamond + Mana Potion -> Lion Branded Charm of Sustenance
- Grand Charm + Chipped Diamond + Health Potion -> Lion Branded Charm of Vita
- Grand Charm + Chipped Diamond + Stamina Potion -> Lion Branded Charm of Inertia
- Grand Charm + Flawed Diamond + Thawing Potion -> Captain's Charm of Balance
- Grand Charm + Flawed Diamond + Portal Scroll -> Captain's Charm of Greed
- Grand Charm + Flawed Diamond + Mana Potion -> Captain's Charm of Sustenance
- Grand Charm + Flawed Diamond + Health Potion -> Captain's Charm of Vita
- Grand Charm + Flawed Diamond + Stamina Potion -> Captain's Charm of Inertia
- Grand Charm + Flawless Diamond + Thawing Potion -> Preserver's Charm of Balance
- Grand Charm + Flawless Diamond + Portal Scroll -> Preserver's Charm of Greed
- Grand Charm + Flawless Diamond + Mana Potion -> Preserver's Charm of Sustenance
- Grand Charm + Flawless Diamond + Health Potion -> Preserver's Charm of Vita
- Grand Charm + Flawless Diamond + Stamina Potion -> Preserver's Charm of Inertia
- Grand Charm + Chipped Amethyst + Thawing Potion -> Expert's Charm of Balance
- Grand Charm + Chipped Amethyst + Portal Scroll -> Expert's Charm of Greed
- Grand Charm + Chipped Amethyst + Mana Potion -> Expert's Charm of Sustenance
- Grand Charm + Chipped Amethyst + Health Potion -> Expert's Charm of Vita
- Grand Charm + Chipped Amethyst + Stamina Potion -> Expert's Charm of Inertia
- Grand Charm + Flawed Amethyst + Thawing Potion -> Fanatic Charm of Balance
- Grand Charm + Flawed Amethyst + Portal Scroll -> Fanatic Charm of Greed
- Grand Charm + Flawed Amethyst + Mana Potion -> Fanatic Charm of Sustenance
- Grand Charm + Flawed Amethyst + Health Potion -> Fanatic Charm of Vita
- Grand Charm + Flawed Amethyst + Stamina Potion -> Fanatic Charm of Inertia
- Grand Charm + Flawless Amethyst + Thawing Potion -> Sounding Charm of Balance
- Grand Charm + Flawless Amethyst + Portal Scroll -> Sounding Charm of Greed
- Grand Charm + Flawless Amethyst + Mana Potion -> Sounding Charm of Sustenance
- Grand Charm + Flawless Amethyst + Health Potion -> Sounding Charm of Vita
- Grand Charm + Flawless Amethyst + Stamina Potion -> Sounding Charm of Inertia
- Grand Charm + Chipped Ruby + Thawing Potion -> Trainer's Charm of Balance
- Grand Charm + Chipped Ruby + Portal Scroll -> Trainer's Charm of Greed
- Grand Charm + Chipped Ruby + Mana Potion -> Trainer's Charm of Sustenance
- Grand Charm + Chipped Ruby + Health Potion -> Trainer's Charm of Vita
- Grand Charm + Chipped Ruby + Stamina Potion -> Trainer's Charm of Inertia
- Grand Charm + Flawed Ruby + Thawing Potion -> Spiritual Charm of Balance
- Grand Charm + Flawed Ruby + Portal Scroll -> Spiritual Charm of Greed
- Grand Charm + Flawed Ruby + Mana Potion -> Spiritual Charm of Sustenance
- Grand Charm + Flawed Ruby + Health Potion -> Spiritual Charm of Vita
- Grand Charm + Flawed Ruby + Stamina Potion -> Spiritual Charm of Inertia
- Grand Charm + Flawless Ruby + Thawing Potion -> Nature's Charm of Balance
- Grand Charm + Flawless Ruby + Portal Scroll -> Nature's Charm of Greed
- Grand Charm + Flawless Ruby + Mana Potion -> Nature's Charm of Sustenance
- Grand Charm + Flawless Ruby + Health Potion -> Nature's Charm of Vita
- Grand Charm + Flawless Ruby + Stamina Potion -> Nature's Charm of Inertia
- Grand Charm + Chipped Emerald + Thawing Potion -> Entrapping Charm of Balance
- Grand Charm + Chipped Emerald + Portal Scroll -> Entrapping Charm of Greed
- Grand Charm + Chipped Emerald + Mana Potion -> Entrapping Charm of Sustenance
- Grand Charm + Chipped Emerald + Health Potion -> Entrapping Charm of Vita
- Grand Charm + Chipped Emerald + Stamina Potion -> Entrapping Charm of Inertia
- Grand Charm + Flawed Emerald + Thawing Potion -> Mentalist's Charm of Balance
- Grand Charm + Flawed Emerald + Portal Scroll -> Mentalist's Charm of Greed
- Grand Charm + Flawed Emerald + Mana Potion -> Mentalist's Charm of Sustenance
- Grand Charm + Flawed Emerald + Health Potion -> Mentalist's Charm of Vita
- Grand Charm + Flawed Emerald + Stamina Potion -> Mentalist's Charm of Inertia
- Grand Charm + Flawless Emerald + Thawing Potion -> Shogukusha's Charm of Balance
- Grand Charm + Flawless Emerald + Portal Scroll -> Shogukusha's Charm of Greed
- Grand Charm + Flawless Emerald + Mana Potion -> Shogukusha's Charm of Sustenance
- Grand Charm + Flawless Emerald + Health Potion -> Shogukusha's Charm of Vita
- Grand Charm + Flawless Emerald + Stamina Potion -> Shogukusha's Charm of Inertia
- Grand Charm + Perfect Skull + Thawing Potion -> Sharp Charm of Balance
- Grand Charm + Perfect Skull + Portal Scroll -> Sharp Charm of Greed
- Grand Charm + Perfect Skull + Mana Potion -> Sharp Charm of Sustenance
- Grand Charm + Perfect Skull + Health Potion -> Sharp Charm of Vita
- Grand Charm + Perfect Skull + Stamina Potion -> Sharp Charm of Inertia
- Grand Charm + Perfect Diamond + Thawing Potion -> Shimmering Charm of Balance
- Grand Charm + Perfect Diamond + Portal Scroll -> Shimmering Charm of Greed
- Grand Charm + Perfect Diamond + Mana Potion -> Shimmering Charm of Sustenance
- Grand Charm + Perfect Diamond + Health Potion -> Shimmering Charm of Vita
- Grand Charm + Perfect Diamond + Stamina Potion -> Shimmering Charm of Inertia
- Small Charm + Skull -> Fine Charm
- Small Charm + Perfect Diamond -> Shimmering Charm
- Small Charm + Perfect Sapphire -> Sapphire Charm
- Small Charm + Perfect Ruby -> Ruby Charm
- Small Charm + Perfect Topaz -> Amber Charm
- Small Charm + Perfect Emerald -> Emerald Charm
- Small Charm + Sapphire -> Hibernal Charm
- Small Charm + Ruby -> Flaming Charm
- Small Charm + Topaz -> Shocking Charm
- Small Charm + Emerald -> Pestilent Charm
- Small Charm + Thawing Potion -> Charm of Balance
- Small Charm + Portal Scroll -> Charm of Greed
- Small Charm + Identify Scroll -> Charm of Good Luck
- Small Charm + Mana Potion -> Charm of Sustenance
- Small Charm + Health Potion -> Charm of Vita
- Small Charm + Stamina Potion -> Charm of Inertia
- Small Charm + Antidote Potion -> Charm of Anthrax
- Small Charm + Skull + Thawing Potion -> Fine Charm of Balance
- Small Charm + Skull + Portal Scroll -> Fine Charm of Greed
- Small Charm + Skull + Identify Scroll -> Fine Charm of Good Luck
- Small Charm + Skull + Mana Potion -> Fine Charm of Sustenance
- Small Charm + Skull + Health Potion -> Fine Charm of Vita
- Small Charm + Skull + Stamina Potion -> Fine Charm of Inertia
- Small Charm + Skull + Antidote Potion -> Fine Charm of Anthrax
- Small Charm + Perfect Diamond + Thawing Potion -> Shimmering Charm of Balance
- Small Charm + Perfect Diamond + Portal Scroll -> Shimmering Charm of Greed
- Small Charm + Perfect Diamond + Identify Scroll -> Shimmering Charm of Good Luck
- Small Charm + Perfect Diamond + Mana Potion -> Shimmering Charm of Sustenance
- Small Charm + Perfect Diamond + Health Potion -> Shimmering Charm of Vita
- Small Charm + Perfect Diamond + Stamina Potion -> Shimmering Charm of Inertia
- Small Charm + Perfect Diamond + Antidote Potion -> Shimmering Charm of Anthrax
- Small Charm + Perfect Sapphire + Thawing Potion -> Sapphire Charm of Balance
- Small Charm + Perfect Sapphire + Portal Scroll -> Sapphire Charm of Greed
- Small Charm + Perfect Sapphire + Identify Scroll -> Sapphire Charm of Good Luck
- Small Charm + Perfect Sapphire + Mana Potion -> Sapphire Charm of Sustenance
- Small Charm + Perfect Sapphire + Health Potion -> Sapphire Charm of Vita
- Small Charm + Perfect Sapphire + Stamina Potion -> Sapphire Charm of Inertia
- Small Charm + Perfect Sapphire + Antidote Potion -> Sapphire Charm of Anthrax
- Small Charm + Perfect Ruby + Thawing Potion -> Ruby Charm of Balance
- Small Charm + Perfect Ruby + Portal Scroll -> Ruby Charm of Greed
- Small Charm + Perfect Ruby + Identify Scroll -> Ruby Charm of Good Luck
- Small Charm + Perfect Ruby + Mana Potion -> Ruby Charm of Sustenance
- Small Charm + Perfect Ruby + Health Potion -> Ruby Charm of Vita
- Small Charm + Perfect Ruby + Stamina Potion -> Ruby Charm of Inertia
- Small Charm + Perfect Ruby + Antidote Potion -> Ruby Charm of Anthrax
- Small Charm + Perfect Topaz + Thawing Potion -> Amber Charm of Balance
- Small Charm + Perfect Topaz + Portal Scroll -> Amber Charm of Greed
- Small Charm + Perfect Topaz + Identify Scroll -> Amber Charm of Good Luck
- Small Charm + Perfect Topaz + Mana Potion -> Amber Charm of Sustenance
- Small Charm + Perfect Topaz + Health Potion -> Amber Charm of Vita
- Small Charm + Perfect Topaz + Stamina Potion -> Amber Charm of Inertia
- Small Charm + Perfect Topaz + Antidote Potion -> Amber Charm of Anthrax
- Small Charm + Perfect Emerald + Thawing Potion -> Emerald Charm of Balance
- Small Charm + Perfect Emerald + Portal Scroll -> Emerald Charm of Greed
- Small Charm + Perfect Emerald + Identify Scroll -> Emerald Charm of Good Luck
- Small Charm + Perfect Emerald + Mana Potion -> Emerald Charm of Sustenance
- Small Charm + Perfect Emerald + Health Potion -> Emerald Charm of Vita
- Small Charm + Perfect Emerald + Stamina Potion -> Emerald Charm of Inertia
- Small Charm + Perfect Emerald + Antidote Potion -> Emerald Charm of Anthrax
- Small Charm + Sapphire + Thawing Potion -> Hibernal Charm of Balance
- Small Charm + Sapphire + Portal Scroll -> Hibernal Charm of Greed
- Small Charm + Sapphire + Identify Scroll -> Hibernal Charm of Good Luck
- Small Charm + Sapphire + Mana Potion -> Hibernal Charm of Sustenance
- Small Charm + Sapphire + Health Potion -> Hibernal Charm of Vita
- Small Charm + Sapphire + Stamina Potion -> Hibernal Charm of Inertia
- Small Charm + Sapphire + Antidote Potion -> Hibernal Charm of Anthrax
- Small Charm + Ruby + Thawing Potion -> Flaming Charm of Balance
- Small Charm + Ruby + Portal Scroll -> Flaming Charm of Greed
- Small Charm + Ruby + Identify Scroll -> Flaming Charm of Good Luck
- Small Charm + Ruby + Mana Potion -> Flaming Charm of Sustenance
- Small Charm + Ruby + Health Potion -> Flaming Charm of Vita
- Small Charm + Ruby + Stamina Potion -> Flaming Charm of Inertia
- Small Charm + Ruby + Antidote Potion -> Flaming Charm of Anthrax
- Small Charm + Topaz + Thawing Potion -> Shocking Charm of Balance
- Small Charm + Topaz + Portal Scroll -> Shocking Charm of Greed
- Small Charm + Topaz + Identify Scroll -> Shocking Charm of Good Luck
- Small Charm + Topaz + Mana Potion -> Shocking Charm of Sustenance
- Small Charm + Topaz + Health Potion -> Shocking Charm of Vita
- Small Charm + Topaz + Stamina Potion -> Shocking Charm of Inertia
- Small Charm + Topaz + Antidote Potion -> Shocking Charm of Anthrax
- Small Charm + Emerald + Thawing Potion -> Pestilent Charm of Balance
- Small Charm + Emerald + Portal Scroll -> Pestilent Charm of Greed
- Small Charm + Emerald + Identify Scroll -> Pestilent Charm of Good Luck
- Small Charm + Emerald + Mana Potion -> Pestilent Charm of Sustenance
- Small Charm + Emerald + Health Potion -> Pestilent Charm of Vita
- Small Charm + Emerald + Stamina Potion -> Pestilent Charm of Inertia
- Small Charm + Emerald + Antidote Potion -> Pestilent Charm of Anthrax
- Small Charm + Amethyst -> Annihilus
- Large Charm + Amethyst -> Hellfire Torch
- Grand Charm + Amethyst -> Gheed's Fortune
- Grand Charm + Diamond -> Bone Break
- Grand Charm + Emerald -> Rotting Fissure
- Grand Charm + Ruby -> Flame Rift
- Grand Charm + Sapphire -> Cold Rupture
- Grand Charm + Topaz -> Crack of the Heavens
- Grand Charm + Skull -> Black Cleft

The __`Update recipes panel`__ setting is for when the "Breakpoint and Recipe UI Panels" mod is installed.
It updates the recipe panel to include the new recipes added by this mod.
The "Breakpoint and Recipe UI Panels" mod must install before this mod for recipes to be added to UI Panel.

If __`Fix unique items for crafting`__ is enabled, then unique items are allowed to drop more than once per game.
This is useful for being able to reroll the same unique item over and over again. 
Also uniques with a required area level of over 99 (Torch, Annihilus) have that lowered to equal their required level instead.
This allows them to be rerolled (otherwise, they consider the character to not be high level enough for the recipe).
This code is from olegbl's [Horadric Forging mod](https://www.nexusmods.com/diablo2resurrected/mods/229).

## Example: Crafting a Giant Thresher for Infinity
<a name="h05" />

**Warning: Being able to to craft pretty much any equipment - runeword base, charm or unique - can take the fun out of the game.**

To craft a giant thresher for infinity for your mercenary use these steps:

1. Go to Gheed and buy or gamble a War Scythe.
2. If the item is magic or rare, use the Item + Stamina + Antidote recipe to transmute it to normal.
3. Use the Item + Antidote + Identify recipe to upgrade to a Grim Scythe and then to a Giant Thresher.
4. Use the Item + Stamina + Identify + Full Rejuv recipe to upgrade the item to ilvl 99 and to set the level requirement back to the normal value (66 for a Giant Thresher).
5. If you want a superior item, use the Item + Antidote + Stamina recipe to make is superior. Then use the Item + Stamina recipe until you have a superior affix of +15% Enhanced Damage and no sockets.
6. Socket the item: for Infinity, we want 4 sockets, so the recipe is item + Stamina Potion + (Standard) Health Potion. Here are the possible recipes:
    - 2 sockets: Item + Stamina Potion + Minor Health Potion
    - 3 sockets: Item + Stamina Potion + Light Health Potion
    - 4 sockets: Item + Stamina Potion + (Standard) Health Potion
    - 5 sockets: Item + Stamina Potion + Greater Health Potion
    - 6 sockets: Item + Stamina Potion + Super Health Potion
    - To get a Standard Health Potion, use the Health + Thawing recipe to split down from a Super Health potion.
7. If you want the item to be Ethereal, use the item + Antidote Potion + Stamina Potion + Thawing Potion recipe.

## Version history
<a name="h06" />

- 1.0 Initial version
- 1.1 Fix bug removing sockets from items
- 1.2 Add reroll as Magic/Rare recipes
- 1.3 Include added recipes in recipe panel if "Breakpoint and Recipe UI Panels" mod is installed
- 1.4 Rearrange some recipes. Add recipes to generate charms and jewels, since they cannot be gambled
- 1.4.1 Fix high-level recipe
- 1.5.0 Add recipes for specific charms/jewels
- 1.6.0 Add potion splitting recipes and add crafting examples to the README
- 1.6.1 Fix typo in Amulet->Jewel recipe
- 1.6.2 Add recipes to create unique charms
- 1.7.0 Update to support Reign of the Warlock patch