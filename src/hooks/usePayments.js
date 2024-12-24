import { useMemo } from 'react';
import useStore from '../store';

export const usePayments = () => {
  const store = useStore();
  
  const summary = useMemo(() => store.getGlobalSummary(), [
    store.loans,
    store.services,
    store.payments
  ]);

  const upcomingPayments = useMemo(() => {
    const payments = [];
    
    // Agregar próximos pagos de préstamos
    store.loans
      .filter(loan => loan.status === 'active')
      .forEach(loan => {
        if (loan.nextPaymentDate) {
          payments.push({
            type: 'loan',
            date: loan.nextPaymentDate,
            amount: loan.amount,
            name: loan.name,
            account: loan.account,
            holder: loan.owner
          });
        }
      });

    // Agregar próximos pagos de servicios
    store.services.forEach(service => {
      const details = store.getServiceDetails(service.id);
      if (details.nextPaymentDate) {
        payments.push({
          type: 'service',
          date: details.nextPaymentDate,
          amount: service.price.uyuEquivalent,
          name: service.name,
          account: service.paymentMethod.replace('debit_', ''),
          holder: service.holder
        });
      }
    });

    return payments.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [store.loans, store.services]);

  return {
    summary,
    upcomingPayments,
    addPayment: store.addLoanPayment,
    addServicePayment: store.addServicePayment
  };
};

// Ubicación: src/hooks/useHolderData.js
import { useMemo } from 'react';
import useStore from '../store';

export const useHolderData = (holderId) => {
  const store = useStore();
  
  const holderData = useMemo(() => {
    const totals = store.getTotalsByHolder();
    return totals[holderId.toUpperCase()] || null;
  }, [holderId, store.loans, store.services]);

  return holderData;
};
