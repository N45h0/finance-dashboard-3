import { useMemo } from 'react';
import useStore from '../store';
import { ACCOUNT_HOLDERS } from '../config/constants';

export const useHolderPayments = (holderId) => {
  const store = useStore();
  
  return useMemo(() => {
    const holder = ACCOUNT_HOLDERS[holderId.toUpperCase()];
    if (!holder) return null;

    const holderAliases = [
      ...holder.aliases,
      ...holder.normalizedAliases()
    ];

    const loans = store.loans.filter(loan =>
      holderAliases.includes(loan.owner.toUpperCase()) &&
      loan.status === 'active'
    );

    const services = store.services.filter(service =>
      holderAliases.includes(service.holder.toUpperCase())
    );

    const totalLoans = loans.reduce((sum, loan) => sum + loan.amount, 0);
    const totalServices = services.reduce((sum, service) => {
      const monthlyAmount = service.billingCycle === 'annual'
        ? service.price.uyuEquivalent / 12
        : service.price.uyuEquivalent;
      return sum + monthlyAmount;
    }, 0);

    return {
      holder: holder.name,
      loans,
      services,
      totalLoans,
      totalServices,
      totalMonthly: totalLoans + totalServices
    };
  }, [holderId, store.loans, store.services]);
};

// Ubicación: src/hooks/useAccountPayments.js
import { useMemo } from 'react';
import useStore from '../store';

export const useAccountPayments = (accountId) => {
  const store = useStore();
  
  return useMemo(() => {
    const account = store.accounts.find(acc => acc.id === accountId);
    if (!account) return null;

    const loans = store.loans.filter(loan =>
      loan.account === accountId && loan.status === 'active'
    );

    const services = store.services.filter(service =>
      service.paymentMethod === `debit_${accountId}`
    );

    const totalLoans = loans.reduce((sum, loan) => sum + loan.amount, 0);
    const totalServices = services.reduce((sum, service) => {
      const monthlyAmount = service.billingCycle === 'annual'
        ? service.price.uyuEquivalent / 12
        : service.price.uyuEquivalent;
      return sum + monthlyAmount;
    }, 0);

    return {
      account,
      loans,
      services,
      totalLoans,
      totalServices,
      totalMonthly: totalLoans + totalServices
    };
  }, [accountId, store.loans, store.services, store.accounts]);
};

// Ubicación: src/hooks/useResponsive.js
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useResponsive = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile,
    isTablet,
    windowSize,
    isDesktop: !isMobile && !isTablet
  };
};

// Ubicación: src/hooks/useSortedData.js
import { useMemo } from 'react';

export const useSortedData = (data, config = {}) => {
  const {
    sortBy = 'name',
    direction = 'asc',
    filterBy = null,
    filterValue = null
  } = config;

  return useMemo(() => {
    let sortedData = [...data];

    if (filterBy && filterValue) {
      sortedData = sortedData.filter(item =>
        String(item[filterBy]).toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    sortedData.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return direction === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sortedData;
  }, [data, sortBy, direction, filterBy, filterValue]);
};
