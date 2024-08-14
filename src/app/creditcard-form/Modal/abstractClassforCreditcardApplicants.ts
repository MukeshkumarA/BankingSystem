
import { CreditCardApplicant } from "./creditCardModal";

export interface CreditCardApplicantStorage{

    createCreditCardApplication(loanApplicant: CreditCardApplicant): void;

}