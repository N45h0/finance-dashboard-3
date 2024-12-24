import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ACCOUNT_HOLDERS } from '../config/constants';
import { formatters } from '../utils/formatters';
import { dateUtils } from '../utils/dateUtils';

const useStore = create(
  persist(
    (set, get) => ({
      // Estado inicial
      holders: ACCOUNT_HOLDERS,
      accounts: [],
      loans: [],
      services: [],
      payments: [],
      incomes: [],

      // Acciones para cuentas
      addAccount: (account) => 
        set(state => ({
          accounts: [...state.accounts, {
            ...account,
            id: `ACC-${Date.now()}`,
            createdAt: new Date().toISOString()
          }]
        })),

      updateAccount: (id, updates) =>
        set(state => ({
          accounts: state.accounts.map(acc =>
            acc.id === id ? { ...acc, ...updates } : acc
          )
        })),

      // Acciones para préstamos
      addLoan: (loan) =>
        set(state => ({
          loans: [...state.loans, {
            ...loan,
            id: `LOAN-${Date.now()}`,
            createdAt: new Date().toISOString(),
            status: 'active',
            paymentHistory: []
          }]
        })),

      updateLoan: (id, updates) =>
        set(state => ({
          loans: state.loans.map(loan =>
            loan.id === id ? { ...loan, ...updates } : loan
          )
        })),

      addLoanPayment: (loanId, payment) =>
        set(state => ({
          loans: state.loans.map(loan =>
            loan.id === loanId
              ? {
                  ...loan,
                  paymentHistory: [...loan.paymentHistory, {
                    ...payment,
                    id: `PAY-${Date.now()}`,
                    date: new Date().toISOString()
                  }]
                }
              : loan
          )
        })),

      // Acciones para servicios
      addService: (service) =>
        set(state => ({
          services: [...state.services, {
            ...service,
            id: `SRV-${Date.now()}`,
            createdAt: new Date().toISOString(),
            status: 'active'
          }]
        })),

      updateService: (id, updates) =>
        set(state => ({
          services: state.services.map(service =>
            service.id === id ? { ...service, ...updates } : service
          )
        })),

      addServicePayment: (serviceId, payment) =>
        set(state => ({
          payments: [...get().payments, {
            ...payment,
            serviceId,
            id: `PAY-${Date.now()}`,
            date: new Date().toISOString()
          }]
        })),

      // Acciones para ingresos
      addIncome: (income) =>
        set(state => ({
          incomes: [...state.incomes, {
            ...income,
            id: `INC-${Date.now()}`,
            createdAt: new Date().toISOString()
          }]
        })),

      updateIncome: (id, updates) =>
        set(state => ({
          incomes: state.incomes.map(income =>
            income.id === id ? { ...income, ...updates } : income
          )
        })),

      // Getters y cálculos
      getTotalsByHolder: () => {
        const state = get();
        const totals = {};

        Object.keys(ACCOUNT_HOLDERS).forEach(holder => {
          const normalizedHolder = holder.toUpperCase();
          totals[normalizedHolder] = {
            loans: 0,
            services: 0,
            total: 0,
            servicesList: [],
            loansList: []
          };
        });

        // Calcular totales de préstamos
        state.loans.forEach(loan => {
          if (loan.status !== 'active') return;
          
          const holder = loan.owner.toUpperCase();
          if (totals[holder]) {
            totals[holder].loans += loan.amount;
            totals[holder].total += loan.amount;
            totals[holder].loansList.push(loan);
          }
        });

        // Calcular totales de servicios
        state.services.forEach(service => {
          const holder = service.holder.toUpperCase();
          if (totals[holder]) {
            const monthlyAmount = service.billingCycle === 'annual'
              ? service.price.uyuEquivalent / 12
              : service.price.uyuEquivalent;
            
            totals[holder].services += monthlyAmount;
            totals[holder].total += monthlyAmount;
            totals[holder].servicesList.push({
              ...service,
              monthlyAmount
            });
          }
        });

        return totals;
      },

      getPaymentsByAccount: () => {
        const state = get();
        return state.accounts.reduce((acc, account) => {
          const accountPayments = {
            loans: state.loans.filter(loan => 
              loan.status === 'active' && loan.account === account.id
            ),
            services: state.services.filter(service => 
              service.paymentMethod === `debit_${account.id}`
            ),
            total: 0
          };

          accountPayments.total = 
            accountPayments.loans.reduce((sum, loan) => sum + loan.amount, 0) +
            accountPayments.services.reduce((sum, service) => {
              const amount = service.billingCycle === 'annual'
                ? service.price.uyuEquivalent / 12
                : service.price.uyuEquivalent;
              return sum + amount;
            }, 0);

          acc[account.id] = accountPayments;
          return acc;
        }, {});
      },

      getServiceDetails: (serviceId) => {
        const state = get();
        const service = state.services.find(s => s.id === serviceId);
        if (!service) return null;

        const payments = state.payments
          .filter(p => p.serviceId === serviceId)
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        const lastPayment = payments[0];

        return {
          ...service,
          payments,
          lastPayment,
          isPaid: Boolean(lastPayment && dateUtils.isCurrentMonth(lastPayment.date)),
          nextPaymentDate: service.billingDay
            ? dateUtils.getNextPaymentDate(new Date(), service.billingDay)
            : null
        };
      },

      // Resumen global
      getGlobalSummary: () => {
        const state = get();
        const totalsByHolder = state.getTotalsByHolder();
        const paymentsByAccount = state.getPaymentsByAccount();

        return {
          totalLoans: Object.values(totalsByHolder)
            .reduce((sum, holder) => sum + holder.loans, 0),
          totalServices: Object.values(totalsByHolder)
            .reduce((sum, holder) => sum + holder.services, 0),
          byHolder: totalsByHolder,
          byAccount: paymentsByAccount,
          monthly: {
            loans: state.loans
              .filter(loan => loan.status === 'active')
              .reduce((sum, loan) => sum + loan.amount, 0),
            services: state.services
              .reduce((sum, service) => {
                const amount = service.billingCycle === 'annual'
                  ? service.price.uyuEquivalent / 12
                  : service.price.uyuEquivalent;
                return sum + amount;
              }, 0)
          }
        };
      }
    }),
    {
      name: 'finance-store',
      partialize: (state) => ({
        accounts: state.accounts,
        loans: state.loans,
        services: state.services,
        payments: state.payments,
        incomes: state.incomes
      })
    }
  )
);

export default useStore;
