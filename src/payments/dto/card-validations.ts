export function validateCardFields(card: any): string[] {
    const missing: string[] = [];
  
    if (!card.cardNumber) missing.push('cardNumber');
    if (!card.cardHolderName) missing.push('cardHolderName');
    if (!card.expirationMonth) missing.push('expirationMonth');
    if (!card.expirationYear) missing.push('expirationYear');
    if (!card.cvv) missing.push('cvv');
  
    return missing;
  }
  
  export function isCardExpired(month: number, year: number): boolean {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
  
    return year < currentYear || (year === currentYear && month < currentMonth);
  }
  
  