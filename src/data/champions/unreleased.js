import { CHAMPION } from '../model/Champion';

export const UNRELEASED_CHAMPIONS = [
    // Cosmic
    CHAMPION.PHOENIXDARK,
    CHAMPION.HYPERION,
    // Tech
    CHAMPION.HOWARDMECH,
    // Mutant
    CHAMPION.CABLE,
    CHAMPION.GWENPOOL,
    CHAMPION.WEAPONX,
    // Skill
    CHAMPION.REDSKULL,
    // Mystic
    CHAMPION.DRSTRANGEMARVELNOW,
    CHAMPION.SCARLETWITCHULTIMATE,
    // Universal
    CHAMPION.MAESTRO,
].reduce((map, champion) => {
    map[ champion ] = true;
    return map;
}, {});
