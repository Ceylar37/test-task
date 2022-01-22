import {Transaction} from "./transaction";

export interface Block {
    number: string,
    hash: string,
    tableOfTransactions: Transaction[]
}