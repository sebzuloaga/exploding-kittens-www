export interface CardMdl {
    id: string,
    name: string,
    action: string,
    instantAction: boolean,
    initialShuffle: boolean,
};

export interface CardsMdl {
    [cardId: string]: CardMdl,
};

const explodingKittenCard: CardMdl = {
    id: 'exploding_kitten',
    name: "Exploding Kitten",
    action: "explode",
    instantAction: false,
    initialShuffle: false,
};

const defuseCard: CardMdl = {
    id: 'defuse',
    name: "Defuse",
    action: "defuse",
    instantAction: false,
    initialShuffle: false,
};

const shuffleCard: CardMdl = {
    id: 'shuffle',
    name: "Shuffle",
    action: "shuffle",
    instantAction: true,
    initialShuffle: true,
};

const skipCard: CardMdl = {
    id: 'skip',
    name: "Skip",
    action: "skip",
    instantAction: true,
    initialShuffle: true,
};

const attackCard: CardMdl = {
    id: 'attack',
    name: "Attack",
    action: "attack",
    instantAction: true,
    initialShuffle: true,
};

const favorCard: CardMdl = {
    id: 'favor',
    name: "Favor",
    action: "favor",
    instantAction: false,
    initialShuffle: true,
};

const nopeCard: CardMdl = {
    id: 'nope',
    name: "Nope",
    action: "nope",
    instantAction: true,
    initialShuffle: true,
};

const seeFutureCard: CardMdl = {
    id: 'see_future_3',
    name: "See The Future (x3)",
    action: "see_future",
    instantAction: true,
    initialShuffle: true,
};

const MommaCatCard: CardMdl = {
    id: 'momma_cat',
    name: "Momma Cat",
    action: "cat",
    instantAction: false,
    initialShuffle: true,
};

const ZombieCatCard: CardMdl = {
    id: 'zombie_cat',
    name: "Zombie Cat",
    action: "cat",
    instantAction: false,
    initialShuffle: true,
};

const BikiniCatCard: CardMdl = {
    id: 'bikini_cat',
    name: "Bikini Cat",
    action: "cat",
    instantAction: false,
    initialShuffle: true,
};

const SchrodingerCatCard: CardMdl = {
    id: 'schrodinger_cat',
    name: "Schrodinger Cat",
    action: "cat",
    instantAction: false,
    initialShuffle: true,
};

const ShyBladderCatCard: CardMdl = {
    id: 'shy_bladder_cat',
    name: "Shy Bladder Cat",
    action: "cat",
    instantAction: false,
    initialShuffle: true,
};

const ReverseCard: CardMdl = {
    id: 'reverse',
    name: "Reverse",
    action: "reverse",
    instantAction: true,
    initialShuffle: true,
};

const BottomDrawCard: CardMdl = {
    id: 'bottom_draw',
    name: "Draw From the Bottom",
    action: "bottom_draw",
    instantAction: true,
    initialShuffle: true,
};

const SwapTopBottomCard: CardMdl = {
    id: 'swap_top_bottom',
    name: "Swap Top And Bottom",
    action: "swap_top_bottom",
    instantAction: true,
    initialShuffle: true,
};

const CatomicBomb: CardMdl = {
    id: 'catomic_bomb',
    name: "Catomic Bomb",
    action: "catomic_bomb",
    instantAction: true,
    initialShuffle: true,
};

export const CARDS: CardsMdl = {
    exploding_kitten: explodingKittenCard,
    defuse: defuseCard,
    shuffle: shuffleCard,
    skip: skipCard,
    attack: attackCard,
    favor: favorCard,
    nope: nopeCard,
    see_future_3: seeFutureCard,
    momma_cat: MommaCatCard,
    zombie_cat: ZombieCatCard,
    bikini_cat: BikiniCatCard,
    schrodinger_cat: SchrodingerCatCard,
    shy_bladder_cat: ShyBladderCatCard,
    reverse: ReverseCard,
    bottom_draw: BottomDrawCard,
    swap_top_bottom: SwapTopBottomCard,
    catomic_bomb: CatomicBomb,
};