export interface DeckMdl {
    playerCapacity: number,
    cardQuantities: {
        [cardId: string]: number,
    },
};

export interface DecksMdl {
    [deckId: string]: DeckMdl,
};

const ExplodingKittensDeck: DeckMdl = {
    playerCapacity: 5,
    cardQuantities: {
        exploding_kitten: 4,
        defuse: 6,
        // shuffle done
        shuffle: 4,
        //skip done
        skip: 4,
        attack: 4,
        favor: 4,
        nope: 5,
        //see future done
        see_future_3: 5,
        zombie_cat: 4,
        shy_bladder_cat: 4,
        schrodinger_cat: 4,
        bikini_cat: 4,
        momma_cat: 4,
    },
};

const ImplodingKittenDeck: DeckMdl = {
    playerCapacity: 0,
    cardQuantities: {
        // reverse done
        reverse: 4,
        // bottom draw done
        bottom_draw: 4,
    },
};

const StreakingKittnDeck: DeckMdl = {
    playerCapacity: 0,
    cardQuantities: {
        // Swap top and bottom done
        swap_top_bottom: 4,
        // catomic bomb done
        catomic_bomb: 4,
    },
};

export const DECKS: DecksMdl = {
    original: ExplodingKittensDeck,
    imploding: ImplodingKittenDeck,
    streaking: StreakingKittnDeck, 
};