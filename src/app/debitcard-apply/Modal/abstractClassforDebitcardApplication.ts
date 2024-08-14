import { DebitCardApplicant } from "./debitcardModal";

export interface DebitCardApplicantStorage{
    createDebitCardApplication(debitcardApplicant: DebitCardApplicant): void;
}