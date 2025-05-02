# RuneAndGemSplitting_CH

## Rune and Gem Splitting for D2RMM

This mod adds recipes for upgrading and splitting runes and gems, also for converting between gem types.

Upgrade 2 lower to 1 higher. Split 1 higher to 2 lower.
Can make the split recipes also require a thawing potion for compatibility with StackableRunes and StackableGems mods.

If __`Update rune upgrade recipes`__ is set to __`Require two lower runes and no gems`__, the existing rune upgrade recipes are updated to require two of the lower rune and no gem.

If __`Update rune upgrade recipes`__ is set to __`Require no gems`__, the existing rune upgrade recipes are updated to not require gems.

If __`Rune Splitting`__ is enabled, 32 recipes are added each taking a single rune Eld through Zod and returning 2 of the lower rune.
Recipes taking a single rune may conflict with the StackableRunes mod. If that mod is also being used,
then set the  __`Require a thawing potion to split`__ option.

If __`Rune Conversion`__ is enabled, 33 recipes are added each taking a single rune, an Antidote Potion and a Stamina Potion and returning the next rune.
The potions are also returned, so the recipe can be repeatedly used to cycle through the rune types.
Using a Zod rune in this recipe will return an El rune, in case you have too many Zods.

If __`2-Gem Upgrades`__ is enabled, the existing gem upgrade recipes are updated to require two of the lower gem.

If __`Gem Splitting`__ is enabled, 28 recipes are added each taking a single gem of flawed or higher rank and returning 2 gems of one step lower rank.
Recipes taking a single gem may conflict with the StackableGems mod. If that mod is also being used,
then set the  __`Require a thawing potion to split`__ option.

If __`Gem Conversion`__ is set to __`A single gem plus a stamina potion`__, 35 recipes are added.
Each recipe takes a single gem and a stamina potion, and returns a different gem of the same rank.
For example, "Flawed Amethyst + Stamina Potion" might give a Flawed Diamond
(and return the Stamina Potion so the recipe can be repeatedly used to cycle through the gem types).

If __`Gem Conversion`__ is set to __`Two gems plus a chipped of the desired type`__, 28 recipes are added.
Each recipe takes a two gems of the same rank (Flawed, Standard, Flawless or Perfect) and a chipped gem of the desired type.
For example, "2 Flawed gems + 1 Chipped Skull => Flawed Skull".

Note: Thawing potions are to melt things into parts. Antidotes make things better. Stamina potions are in case you want to keep going. :)

## Versions

- 1.0 Initial version
- 1.1 Add Rune Conversion at the request of vladimir77777777
- 1.2 Add 'less cheaty' gem conversion of 2x+chipped.
