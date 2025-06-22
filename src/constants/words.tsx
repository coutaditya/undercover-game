export interface WordPair {
    undercoverWord: string
    civilianWord: string
}

export const WORD_PAIRS: WordPair[] = [
    {
        undercoverWord: "fanta",
        civilianWord: "coke",
    },
    {
        undercoverWord: "strawberry",
        civilianWord: "cherry",
    },
    {
        undercoverWord: "cat",
        civilianWord: "dog",
    },
    {
        undercoverWord: "pizza",
        civilianWord: "burger",
    },
    {
        undercoverWord: "coffee",
        civilianWord: "tea",
    },
    {
        undercoverWord: "summer",
        civilianWord: "winter",
    },
    {
        undercoverWord: "book",
        civilianWord: "magazine",
    },
    {
        undercoverWord: "car",
        civilianWord: "motorcycle",
    },
    {
        undercoverWord: "apple",
        civilianWord: "orange",
    },
    {
        undercoverWord: "beach",
        civilianWord: "mountain",
    },
]

export type PlayerRole = "civilian" | "undercover" | "mrwhite"

export const MR_WHITE_MESSAGE = "You are Mr. White!"

export const CIVILIAN_ROLE = "civilian"
export const UNDERCOVER_ROLE = "undercover"
export const MR_WHITE_ROLE = "mrwhite"
export const UNKNOWN_ROLE = "unknown"
