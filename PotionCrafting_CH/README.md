# PotionCrafting_CH

## Cube crafting using potions for D2RMM

This mod adds recipes for more item crafting using the Horadric cube.
We may not have Chaos Orbs, Orbs of Scouring and the like, but we do have... potions.

These recipes use potions (and occasionally scrolls) to mark what actions to take.
In general, Thawing potions loosen things up to take them apart, while Antidote potions make things better,
and Stamina potions are for recipes where you are likely to want to keep on going. :)

For items, sockets can be added or removed, socket-fillers can be extracted, basic tiems can be upgraded to exceptional or elite. And more.

There are recipes to get the effect of rerolling charms, rings, amulets and jewels.

There are also recipes for upgrading and converting potions, which could really be considered "potion crafting".

## Rerolling items

If __`Convert to normal item`__ is enabled, then recipes are added to convert Unique/Set/Rare/Magic/Superior items to Normal items,
or Low Quality -> Normal -> Superior.

- The recipe is: item + Antidote potion + Stamina Potion.

If __`Upgrade item`__ is enabled, then recipes are added to:

- Upgrade to Exceptional or Elite: item + Antidote Potion + Identify Scroll.
- Upgrade to Ethereal: item + Antidote Potion + Stamina Potion + Thawing Potion.
- Repair: item + Antidote Potion + Thawing Potion.

If __`Reroll item`__ is enabled, then recipes are added to reroll an item.

- The base reroll recipe is: item + Stamina Potion + Identify Scroll.
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

If __`Reroll charms`__ is enabled, then recipes are to take two magic charms of the same size and return one new charm.

- 2 Charms -> Charm
- 2 Charms + Antidote Potion -> High level Charm

## Socketing

If __`Toggle sockets`__ is enabled, then recipes are added to toggle sockets in normal and superior items.
This will reroll the item.

- The recipe toggle sockets on/off is: item + Stamina Potion
- The recipe: item + Stamina Potion + Minor Health Potion tries to set 1 socket
- The recipe: item + Stamina Potion + Light Health Potion tries to set 2 sockets
- The recipe: item + Stamina Potion + (Standard) Health Potion tries to set 3 sockets
- The recipe: item + Stamina Potion + Greater Health Potion tries to set 4 sockets
- The recipe: item + Stamina Potion + Super Health Potion tries to set 5 sockets
- The recipe: item + Stamina Potion + Full Rejuvination Potion tries to set 6 sockets

If __`Add sockets`__ is enabled, then recipes are added to add sockets to Unique/Set/Rare/Magic items.

- The recipe is item + Antidote Potion + Portal Scroll.

If __`Remove items from sockets`__ is enabled, then recipes are added for weapons and armor to remove items from sockets,
recovering both the item and the socket fillers.

- The recipe is item + Thawing potion.

Since a 2x4 item may have up to 6 sockets, unsocketing such an item will require an Expanded Cube mod to have enough space.

## Potions

If __`Upgrade Health and Mana potions`__ is enabled, these recipes are added:

- 2 Minor Health -> Light Health
- 2 Light Health -> Standard Health
- 2 Standard Health -> Greater Health
- 2 Greater Health -> Super Health
- 2 Minor Mana -> Light Mana
- 2 Light Mana -> Standard Mana
- 2 Standard Mana -> Greater Mana
- 2 Greater Mana -> Super Mana

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

- 1 Health Potion + 1 Mana Potion -> Full Rejuvination Potion
- 2 Small Rejuv -> Full Rejuvination Potion

If __`Cycle between other potions/scrolls`__ is enabled, these recipes are added:

- Antidote Potion -> Stamina Potion
- Stamina Potion -> Thawing Potion
- Thawing Potion -> Identify Scroll
- Identify Scroll -> Portal Scroll
- Portal Scroll -> Antidote Potion

The __`Update recipes panel`__ setting is for when the "Breakpoint and Recipe UI Panels" mod is installed.
It updates the recipe panel to include the new recipes added by this mod.

If __`Fix unique items for crafting`__ is enabled, then unique items are allowed to drop more than once per game.
This is useful for being able to reroll the same unique item over and over again. 
Also uniques with a required area level of over 99 (Torch, Annihilus) have that lowered to equal their required level instead.
This allows them to be rerolled (otherwise, they consider the character to not be high level enough for the recipe).
This code is from olegbl's [Horadric Forging mod](https://www.nexusmods.com/diablo2resurrected/mods/229).

## Versions

- 1.0 Initial version
- 1.1 Fix bug removing sockets from items
- 1.2 Add reroll as Magic/Rare recipes
- 1.3 Include added recipes in recipe panel if "Breakpoint and Recipe UI Panels" mod is installed
