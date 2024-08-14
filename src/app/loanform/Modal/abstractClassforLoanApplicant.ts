import { LoanApplicant } from "./loanViewModal";

export interface LoanApplicantStorage {
    createLoanApplication(loanApplicant: LoanApplicant): void;
    getLoanApplicant(userId: string): LoanApplicant | undefined;
    updateLoanApplicant(userId: string, updatedApplicant: Partial<LoanApplicant>): void;
  }