import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters }) => {
  const categories = [
    { value: 'venue', label: 'Venue Spaces', icon: 'Home' },
    { value: 'catering', label: 'Catering & Bar', icon: 'UtensilsCrossed' },
    { value: 'entertainment', label: 'Entertainment', icon: 'Music' },
    { value: 'accommodation', label: 'Accommodation', icon: 'Bed' },
    { value: 'outdoor', label: 'Outdoor Features', icon: 'Trees' },
    { value: 'technology', label: 'Technology', icon: 'Wifi' }
  ];

  const availability = [
    { value: 'available', label: 'Available Now' },
    { value: 'seasonal', label: 'Seasonal' },
    { value: 'booking', label: 'Requires Booking' }
  ];

  const capacity = [
    { value: '0-50', label: 'Small (0-50)' },
    { value: '51-100', label: 'Medium (51-100)' },
    { value: '101-200', label: 'Large (101-200)' },
    { value: '200+', label: 'Extra Large (200+)' }
  ];

  return (
    <div className="bg-card rounded-lg p-6 shadow-organic-sm sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-lg font-semibold text-foreground">
          Filters
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          iconName="X"
          iconPosition="left"
        >
          Clear
        </Button>
      </div>
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Category</h4>
          <CheckboxGroup>
            {categories?.map((category) => (
              <div key={category?.value} className="flex items-center space-x-2 mb-2">
                <Checkbox
                  checked={filters?.categories?.includes(category?.value)}
                  onChange={(e) => {
                    const newCategories = e?.target?.checked
                      ? [...(filters?.categories || []), category?.value]
                      : filters?.categories?.filter(c => c !== category?.value);
                    onFilterChange({ ...filters, categories: newCategories });
                  }}
                />
                <Icon name={category?.icon} size={16} color="var(--color-primary)" />
                <label className="text-sm text-muted-foreground cursor-pointer">
                  {category?.label}
                </label>
              </div>
            ))}
          </CheckboxGroup>
        </div>

        <div className="pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Availability</h4>
          <CheckboxGroup>
            {availability?.map((item) => (
              <Checkbox
                key={item?.value}
                label={item?.label}
                checked={filters?.availability?.includes(item?.value)}
                onChange={(e) => {
                  const newAvailability = e?.target?.checked
                    ? [...(filters?.availability || []), item?.value]
                    : filters?.availability?.filter(a => a !== item?.value);
                  onFilterChange({ ...filters, availability: newAvailability });
                }}
                className="mb-2"
              />
            ))}
          </CheckboxGroup>
        </div>

        <div className="pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Capacity</h4>
          <CheckboxGroup>
            {capacity?.map((item) => (
              <Checkbox
                key={item?.value}
                label={item?.label}
                checked={filters?.capacity?.includes(item?.value)}
                onChange={(e) => {
                  const newCapacity = e?.target?.checked
                    ? [...(filters?.capacity || []), item?.value]
                    : filters?.capacity?.filter(c => c !== item?.value);
                  onFilterChange({ ...filters, capacity: newCapacity });
                }}
                className="mb-2"
              />
            ))}
          </CheckboxGroup>
        </div>

        <div className="pt-6 border-t border-border">
          <Checkbox
            label="Featured Only"
            checked={filters?.featuredOnly}
            onChange={(e) => onFilterChange({ ...filters, featuredOnly: e?.target?.checked })}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;