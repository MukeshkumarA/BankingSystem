import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PandataService {

  private panData: { pan: string; cibilScore: number | null }[] = [];

  constructor() {
    // Initialize some sample data for demonstration purposes
    this.panData.push({ pan: 'ABCDE1234F', cibilScore: 5.2 });
    this.panData.push({ pan: 'FGHIJ5678K', cibilScore: 8.6 });
    this.panData.push({ pan: 'LMNOP9012Q', cibilScore: 5.6 });
    this.panData.push({ pan: 'AIGHT1234O', cibilScore: 7.7 });
    this.panData.push({ pan: 'BIGHT1234O', cibilScore: 9.2 });
    this.panData.push({ pan: 'CIGHT1234O', cibilScore: 5.9 });
    this.panData.push({ pan: 'PIGHT1234O', cibilScore: 7.1 });
    this.panData.push({ pan: 'VIGVT1234O', cibilScore: 4.5 });
    this.panData.push({ pan: 'LIGMT1234O', cibilScore: 6.1 });
    this.panData.push({ pan: 'DIGMT1234O', cibilScore: 5.9 });
    this.panData.push({ pan: 'POKMT1234O', cibilScore: 6.5 });
    this.panData.push({ pan: 'FUCMT1234O', cibilScore: 8.1 });
    this.panData.push({ pan: 'UGSMT1234O', cibilScore: 4.1 });
    this.panData.push({ pan: 'FHGMT1234O', cibilScore: 6.5 });
    // this.panData.push(...jdata.pandatas);
  }

  // check is pan exist or not
  checkPanExists(pan: string): boolean {
    return this.panData.some((item) => item.pan === pan);
  }

  // get the corresponding cibil score of the pan value
  getCibilScoreByPan(panValue: string): number | null {
    const trimmedPan = panValue.trim();
    const panDataItem = this.panData.find((item) => item.pan === trimmedPan);

    return panDataItem ? panDataItem.cibilScore : null;
  }


}
