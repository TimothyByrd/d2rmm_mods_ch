# GambleClassItems_CH

## Gamble Class-specific Items for D2RMM

This mod makes class-specific items available for gambling. (Assassin katars can already be gambled.)

If __`Amazon`__ is enabled, then Amazon-specific bows, spears & javelins can be gambled.

If __`Barbarian`__ is enabled, then Barbarian-specific helmets can be gambled.

If __`Druid`__ is enabled, then Druid-specific pelts can be gambled.

If __`Necromancer`__ is enabled, then Necromancer wands and heads can be gambled.

If __`Paladin`__ is enabled, then Paladin scepters and shields can be gambled.

If __`Sorceress`__ is enabled, then Sorceress staves and orbs can be gambled.

If __`Warlock`__ is enabled, then Warlock grimoires and daggers can be gambled. If you do not have the Warlock DLC, this option has no effect (and daggers can normally be gambled).

If __`Only add normal items`__ is enabled, then only normal items - not exceptional and elite item type - will be added to gamble.txt.
This is the way other items are put into gamble.txt, but may need to be disabled if there is a problem
with the normal -> exceptional -> elite progression for some class-specific item type.

If __`Change gambling odds`__ is enabled, then the chances of a gamble being rare/set/unique are greatly increased,
as well as the chances of an exceptional or elite upgrade.

The __`GambleUnique`__, __`GambleSet`__, __`GambleRare`__, __`GambleUber`__ and __`GambleUltra`__ settings allow fine tuning of the gambling odds.
See https://classic.battle.net/diablo2exp/basics/gambling.shtml for more info.

The various "Exclude" options allow individual weapon classes and armor slots to be excluded from gambling:
- Exclude Axes
- Exclude Bows
- Exclude Crossbows
- Exclude Daggers
- Exclude Javelins
- Exclude Maces
- Exclude Polearms
- Exclude Spears
- Exclude Swords
- Exclude Throwing weapons
- Exclude Katars
- Exclude Helms
- Exclude Body Armor
- Exclude Shields
- Exclude Gloves
- Exclude Boots
- Exclude Belts
- Exclude Circlets

## Versions

- 1.0 Initial version
- 1.1 Remove options for charms and jewels since they crash D2R (though they worked in D2:Lod).
- 1.1.1 Update version so D2RMM can detect it.
- 1.2 Fix Assassin weapon class to include.
- 1.3 Add options to exclude individual weapon classes and armor slots from gambling.
- 1.4 Add ability to tune gambling odds.
- 1.5 Add code by lendarker to enable gambling Warlock items
- 1.6 Remove adding daggers when Warlock is selected, as they are not class specific.
- 1.7 Allow for people who do not have the Warlock DLC. Add daggers back in.