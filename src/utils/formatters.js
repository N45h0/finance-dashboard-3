const formatters = {
  currency: (amount, currency = "UYU", options = {}) => {
    const defaultOptions = {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };

    try {
      const value = typeof amount === 'string' ? parseFloat(amount) : amount;
      if (isNaN(value)) return `${currency} 0.00`;
      
      return new Intl.NumberFormat('es-UY', {
        ...defaultOptions,
        ...options
      }).format(value);
    } catch (error) {
      console.warn('Error formatting currency:', error);
      return `${currency} ${Number(amount).toFixed(2)}`;
    }
  },

  percentage: (value, decimals = 1) => {
    try {
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      if (isNaN(numValue)) return '0%';
      
      const normalizedValue = Math.min(100, Math.max(0, numValue));
      return new Intl.NumberFormat('es-UY', {
        style: 'percent',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(normalizedValue / 100);
    } catch (error) {
      console.warn('Error formatting percentage:', error);
      return `${value}%`;
    }
  },

  date: (date, format = 'short') => {
    if (!date) return 'N/A';
    
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return 'Fecha inválida';
      
      const formats = {
        short: {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        },
        long: {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        },
        withTime: {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        },
        monthDay: {
          month: '2-digit',
          day: '2-digit'
        },
        monthYear: {
          year: 'numeric',
          month: 'long'
        }
      };

      return dateObj.toLocaleDateString('es-UY', formats[format]);
    } catch (error) {
      console.warn('Error formatting date:', error);
      return date.toString();
    }
  },

  number: (value, decimals = 0) => {
    try {
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      if (isNaN(numValue)) return '0';
      
      return new Intl.NumberFormat('es-UY', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(numValue);
    } catch (error) {
      console.warn('Error formatting number:', error);
      return value.toString();
    }
  },

  paymentMethod: (method) => {
    const methods = {
      'debit_6039': 'Brou Débito 6039',
      'debit_2477': 'Visa Santander 2477',
      'debit_8475': 'Brou Mastercard 8475',
      'debit_3879': 'Prex Mastercard UY',
      'cash': 'Efectivo',
      'transfer': 'Transferencia'
    };
    return methods[method] || method;
  },

  accountName: (accountId) => {
    const accounts = {
      '6039': 'Brou Débito 6039',
      '2477': 'Visa Santander 2477',
      '8475': 'Brou Mastercard 8475',
      '3879': 'Prex Mastercard UY'
    };
    return accounts[accountId] || accountId;
  },

  holderName: (holder) => {
    const normalizedHolder = holder.toUpperCase();
    const holders = {
      'IGNACIO': 'Ignacio',
      'LAFIO': 'Ignacio',
      'LOVIO': 'Ignacio',
      'NACHO': 'Ignacio',
      'YENNIFFER': 'Yenniffer',
      'YENNI': 'Yenniffer',
      'LOVIA': 'Yenniffer'
    };
    return holders[normalizedHolder] || holder;
  },

  status: (status, type = 'general') => {
    const statuses = {
      general: {
        'active': 'Activo',
        'inactive': 'Inactivo',
        'pending': 'Pendiente'
      },
      payment: {
        'paid': 'Pagado',
        'pending': 'Pendiente',
        'late': 'Atrasado'
      },
      loan: {
        'active': 'Activo',
        'completed': 'Completado',
        'cancelled': 'Cancelado'
      }
    };
    return statuses[type][status] || status;
  },

  compactNumber: (value) => {
    const formatter = Intl.NumberFormat('es-UY', {
      notation: 'compact',
      maximumFractionDigits: 1
    });
    return formatter.format(value);
  }
};

export default formatters;
