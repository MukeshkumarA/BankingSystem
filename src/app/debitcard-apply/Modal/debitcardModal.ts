export class DebitCardApplicant{
    applicantId?: number;
    userId?: number;
    occupation?: string;
    maritalStatus?: string;
    charges?: string[];
    communicationMethods?: string[];
    income?: number;
    status: string = "pending";
    reason?: string;
}