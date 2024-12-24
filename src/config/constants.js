export const ACCOUNT_HOLDERS = {
  IGNACIO: {
    id: 'ignacio',
    name: 'IGNACIO',
    aliases: ['LAFIO', 'LOVIO', 'IGNACIO', 'NACHO'],
    normalizedAliases: function() {
      return this.aliases.map(alias => [
        alias.toLowerCase(),
        alias.toUpperCase(),
        alias.charAt(0).toUpperCase() + alias.slice(1).toLowerCase()
      ]).flat();
    }
  },
  YENNIFFER: {
    id: 'yenniffer',
    name: 'YENNIFFER',
    aliases: ['LOVIA', 'YENNI', 'YENNIFFER'],
    normalizedAliases: function() {
      return this.aliases.map(alias => [
        alias.toLowerCase(),
        alias.toUpperCase(),
        alias.charAt(0).toUpperCase() + alias.slice(1).toLowerCase()
      ]).flat();
    }
  }
};

export const PAYMENT_METHODS = {
  DEBIT_6039: 'debit_6039',
  DEBIT_2477: 'debit_2477',
  DEBIT_8475: 'debit_8475',
  DEBIT_3879: 'debit_3879',
  CASH: 'cash',
  TRANSFER: 'transfer'
};

export const BILLING_CYCLES = {
  MONTHLY: 'monthly',
  ANNUAL: 'annual'
};

export const SERVICE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending'
};

export const LOAN_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};
