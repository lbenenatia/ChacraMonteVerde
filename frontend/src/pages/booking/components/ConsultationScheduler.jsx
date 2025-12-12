import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const ConsultationScheduler = ({ onSchedule, selectedDate, selectedTime }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const availableDates = [
    { date: '2025-01-15', slots: ['10:00', '14:00', '16:00'] },
    { date: '2025-01-16', slots: ['11:00', '15:00', '17:00'] },
    { date: '2025-01-18', slots: ['10:00', '13:00', '16:00'] },
    { date: '2025-01-20', slots: ['09:00', '14:00', '18:00'] },
    { date: '2025-01-22', slots: ['10:00', '15:00', '17:00'] }
  ];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const isDateAvailable = (day) => {
    const dateStr = `${currentMonth?.getFullYear()}-${String(
      currentMonth?.getMonth() + 1
    )?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
    return availableDates?.some((d) => d?.date === dateStr);
  };

  const getAvailableSlots = (day) => {
    const dateStr = `${currentMonth?.getFullYear()}-${String(
      currentMonth?.getMonth() + 1
    )?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
    const dateData = availableDates?.find((d) => d?.date === dateStr);
    return dateData ? dateData?.slots : [];
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl shadow-organic-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-xl font-semibold text-foreground">
            Seleccionar Fecha
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-lg hover:bg-muted transition-organic"
              aria-label="Mes anterior"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <span className="text-sm font-medium text-foreground min-w-[120px] text-center">
              {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-lg hover:bg-muted transition-organic"
              aria-label="Mes siguiente"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {dayNames?.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}

          {Array.from({ length: startingDayOfWeek })?.map((_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {Array.from({ length: daysInMonth })?.map((_, index) => {
            const day = index + 1;
            const isAvailable = isDateAvailable(day);
            const dateStr = `${currentMonth?.getFullYear()}-${String(
              currentMonth?.getMonth() + 1
            )?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
            const isSelected = selectedDate === dateStr;

            return (
              <button
                key={day}
                onClick={() => isAvailable && onSchedule(dateStr, null)}
                disabled={!isAvailable}
                className={`aspect-square rounded-lg text-sm font-medium transition-organic ${
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : isAvailable
                    ? 'bg-muted hover:bg-primary/10 text-foreground'
                    : 'text-muted-foreground cursor-not-allowed opacity-40'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
      {selectedDate && (
        <div className="bg-card rounded-xl shadow-organic-sm p-6">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
            Horarios Disponibles
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {getAvailableSlots(parseInt(selectedDate?.split('-')?.[2]))?.map(
              (slot) => (
                <button
                  key={slot}
                  onClick={() => onSchedule(selectedDate, slot)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-organic ${
                    selectedTime === slot
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-primary/10 text-foreground'
                  }`}
                >
                  {slot}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationScheduler;