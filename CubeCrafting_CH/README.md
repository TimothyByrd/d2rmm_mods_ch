# CubeCrafting_CH

## Crafting Recipes for D2RMM

This mod adds recipes for more item crafting using the Horadric cube.

These recipes use potions and scrolls to mark what actions to take.
In general, Thawing potions loosen things up to take them apart, while Antidote potions make things better,
and Stamina potions are for recipes where you are likely to want to keep on going. :)

If __`Remove items from sockets`__ is enabled, then recipes are added for weapons and armor to remove items from sockets,
recovering both the item and the socket fillers.
The recipe is item + Thawing potion.

Since a 2x4 item may have up to 6 sockets, unsocketing such an item will require the ExpandedCube mod to have enough space.

If __`Convert to normal item`__ is enabled, then recipes are added to convert Magic/Rare/Set/Unique items to Normal items,
or Low Quality -> Normal -> Superior.
The recipe is item + Antidote potion + Stamina Potion.

If __`Reroll charms`__ is enabled, then recipes are to take two magic charms of the same size and return one new charm.

If __`Reroll rings/amulets/jewels`__ is enabled, then the following recipes are added:

- 2 Magic rings -> Magic amulet
- 2 Magic amulets -> Magic ring
- 2 Rare rings -> Rare amulet
- 2 Rare amulets -> Rare ring
- 2 Magic jewels -> Rare jewel
- 2 Rare jewels -> Magic jewel

If __`Toggle sockets in items`__ is enabled, then recipes are added to toggle sockets in normal and superior items.
This will reroll the item. The recipe is item + Stamina Potion

If __`Add sockets to Rare/Set/Unique items`__ is enabled, then recipes are added to add sockets to Rare/Set/Unique items.
The recipe is item + Antidote Potion + Portal Scroll.

If __`Upgrade Rare/Set/Unique - Basic->Exceptional->Elite`__ is enabled, then recipes are added to
upgrade Rare/Set/Unique items to Exceptional or Elite.
The recipe is item + Antidote Potion + Identify Scroll.

If __`Reroll item`__ is enabled, then recipes are added to reroll an item.
The recipe is item + Stamina Potion + Identify Scroll.

If __`Fix unique items for crafting`__ is enabled, then unique items are allowed to drop more than once per game.
This is useful for being able to reroll the same unique item over and over again. 
Also uniques with a required area level of over 99 (Torch, Annihilus) have that lowered to equal their required level instead.
This allows them to be rerolled (otherwise, they consider the character to not be high level enough for the recipe).
This code is from olegbl's [Horadric Forging mod](https://www.nexusmods.com/diablo2resurrected/mods/229).

