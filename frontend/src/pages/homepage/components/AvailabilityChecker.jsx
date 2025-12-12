import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AvailabilityChecker = ({ isSticky = false }) => {
  const [formData, setFormData] = useState({
    eventDate: '',
    guestCount: '',
    eventType: 'wedding'
  });
  const [isExpanded, setIsExpanded] = useState(!isSticky);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    console.log('Checking availability for:', formData);
  };

  const eventTypes = [
    { value: 'wedding', label: 'Wedding', icon: 'Heart' },
    { value: 'corporate', label: 'Corporate Event', icon: 'Briefcase' },
    { value: 'celebration', label: 'Celebration', icon: 'PartyPopper' },
    { value: 'other', label: 'Other', icon: 'Calendar' }
  ];

  if (isSticky) {
    return (
      <div className="fixed bottom-6 right-6 z-40 lg:block hidden">
        <div className={`bg-card shadow-organic-lg rounded-xl border border-border transition-organic ${isExpanded ? 'w-80' : 'w-16'}`}>
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="w-16 h-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:bg-primary/90 transition-organic"
              aria-label="Check availability"
            >
              <Icon name="Calendar" size={24} />
            </button>
          ) : (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  Check Availability
                </h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 text-muted-foreground hover:text-foreground transition-organic"
                  aria-label="Minimize"
                >
                  <Icon name="Minus" size={16} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="date"
                  label="Event Date"
                  value={formData?.eventDate}
                  onChange={(e) => handleInputChange('eventDate', e?.target?.value)}
                  required
                />
                
                <Input
                  type="number"
                  label="Guest Count"
                  placeholder="Number of guests"
                  value={formData?.guestCount}
                  onChange={(e) => handleInputChange('guestCount', e?.target?.value)}
                  min="1"
                  required
                />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Event Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {eventTypes?.map((type) => (
                      <button
                        key={type?.value}
                        type="button"
                        onClick={() => handleInputChange('eventType', type?.value)}
                        className={`p-2 rounded-lg border text-xs transition-organic flex items-center space-x-1 ${
                          formData?.eventType === type?.value
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background text-foreground border-border hover:bg-muted'
                        }`}
                      >
                        <Icon name={type?.icon} size={14} />
                        <span>{type?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <Button
                  type="submit"
                  variant="default"
                  fullWidth
                  iconName="Search"
                  iconPosition="left"
                  className="mt-4"
                >
                  Check Dates
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-organic-md border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Calendar" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-semibold text-foreground">
            Check Availability
          </h3>
          <p className="text-sm text-muted-foreground">
            Find your perfect date at Monte Verde
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="date"
            label="Event Date"
            value={formData?.eventDate}
            onChange={(e) => handleInputChange('eventDate', e?.target?.value)}
            required
          />
          
          <Input
            type="number"
            label="Guest Count"
            placeholder="Number of guests"
            value={formData?.guestCount}
            onChange={(e) => handleInputChange('guestCount', e?.target?.value)}
            min="1"
            required
          />
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Event Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {eventTypes?.map((type) => (
              <button
                key={type?.value}
                type="button"
                onClick={() => handleInputChange('eventType', type?.value)}
                className={`p-3 rounded-lg border transition-organic flex flex-col items-center space-y-2 ${
                  formData?.eventType === type?.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-border hover:bg-muted'
                }`}
              >
                <Icon name={type?.icon} size={20} />
                <span className="text-sm font-medium">{type?.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          iconName="Search"
          iconPosition="left"
          className="mt-6"
        >
          Check Availability
        </Button>
      </form>
    </div>
  );
};

export default AvailabilityChecker;