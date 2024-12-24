import { 
  addMonths,
  addDays,
  differenceInDays,
  isSameMonth,
  isAfter,
  isBefore,
  startOfMonth,
  endOfMonth,
  format
} from 'date-fns';
import { es } from 'date-fns/locale';

export const dateUtils = {
  addMonths: (date, months) => {
    return addMonths(new Date(date), months);
  },

  getDaysDifference: (date1, date2) => {
    return differenceInDays(
      new Date(date2),
      new Date(date1)
    );
  },

  isCurrentMonth: (date) => {
    return isSameMonth(new Date(date), new Date());
  },

  isOverdue: (date) => {
    return isBefore(new Date(date), new Date());
  },

  getNextPaymentDate: (currentDate, dayOfMonth) => {
    const today = new Date();
    let nextDate = new Date(currentDate);
    nextDate.setDate(dayOfMonth);

    if (isBefore(nextDate, today)) {
      nextDate = addMonths(nextDate, 1);
    }

    return nextDate;
  },

  formatRelative: (date) => {
    const days = differenceInDays(new Date(date), new Date());
    
    if (days === 0) return 'Hoy';
    if (days === 1) return 'Mañana';
    if (days === -1) return 'Ayer';
    
    if (days > 0) {
      if (days <= 7) return `En ${days} días`;
      if (days <= 30) return `En ${Math.floor(days / 7)} semanas`;
      if (days <= 365) return `En ${Math.floor(days / 30)} meses`;
      return `En ${Math.floor(days / 365)} años`;
    } else {
      const absDays = Math.abs(days);
      if (absDays <= 7) return `Hace ${absDays} días`;
      if (absDays <= 30) return `Hace ${Math.floor(absDays / 7)} semanas`;
      if (absDays <= 365) return `Hace ${Math.floor(absDays / 30)} meses`;
      return `Hace ${Math.floor(absDays / 365)} años`;
    }
  },

  getMonthRange: (date = new Date()) => {
    return {
      start: startOfMonth(date),
      end: endOfMonth(date)
    };
  },

  formatMonth: (date) => {
    return format(new Date(date), 'MMMM yyyy', { locale: es });
  },

  getDaysUntilNextPayment: (paymentDay) => {
    const today = new Date();
    const nextPayment = new Date(today.getFullYear(), today.getMonth(), paymentDay);
    
    if (today.getDate() > paymentDay) {
      nextPayment.setMonth(nextPayment.getMonth() + 1);
    }
    
    return differenceInDays(nextPayment, today);
  }
};
