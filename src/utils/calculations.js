export const calculations = {
  roundToTwo: (num) => {
    if (typeof num !== 'number' || isNaN(num)) return 0;
    return Number(Math.round(num + "e+2") + "e-2");
  },

  getMonthlyEquivalent: (amount, cycle) => {
    if (cycle === 'annual') return amount / 12;
    return amount;
  },

  calculateProgress: (current, total) => {
    if (!total || total === 0) return 0;
    return Math.min(100, (current / total) * 100);
  },

  calculateLateFee: (amount, rate, daysLate) => {
    if (!amount || !rate || !daysLate) return 0;
    return (amount * (rate / 100) * daysLate) / 30;
  },

  sumPayments: (payments, type = 'all') => {
    if (!Array.isArray(payments)) return 0;
    
    return payments.reduce((sum, payment) => {
      if (type === 'all' || payment.type === type) {
        return sum + payment.amount;
      }
      return sum;
    }, 0);
  },

  calculateAnnualTotal: (monthlyAmount) => {
    return monthlyAmount * 12;
  },

  calculateRemainingBalance: (loan) => {
    const totalPaid = loan.paymentHistory.reduce((sum, payment) => 
      sum + payment.amount, 0
    );
    return Math.max(0, loan.totalAmountToPay - totalPaid);
  }
};

export default calculations;
