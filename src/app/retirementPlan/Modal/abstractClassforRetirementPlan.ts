
import { RetirementPlanApplication } from "./retirementPlanView";

export interface RetirementPlanApplicationStorage{
    createRetirementPlanApplication(applicant: RetirementPlanApplication): void;
}