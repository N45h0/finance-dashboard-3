import React, { useEffect } from 'react';
import useStore from '../store';
import { initialAccounts } from '../data/initialData/accounts';
import { initialLoans } from '../data/initialData/loans';
import { initialServices } from '../data/initialData/services';

export const StoreProvider = ({ children }) => {
  const {
    accounts,
    loans,
    services,
    addAccount,
    addLoan,
    addService
  } = useStore();

  useEffect(() => {
    // Solo cargar datos iniciales si no hay datos existentes
    if (accounts.length === 0) {
      initialAccounts.forEach(account => addAccount(account));
    }
    
    if (loans.length === 0) {
      initialLoans.forEach(loan => addLoan(loan));
    }
    
    if (services.length === 0) {
      initialServices.forEach(service => addService(service));
    }
  }, []);

  return children;
};
