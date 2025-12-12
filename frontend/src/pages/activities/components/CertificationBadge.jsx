import React from 'react';
import Icon from '../../../components/AppIcon';

const CertificationBadge = ({ certification }) => {
  return (
    <div className="bg-card rounded-lg p-6 text-center shadow-organic-sm hover:shadow-organic-md transition-organic">
      <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
        <Icon
          name={certification?.icon}
          size={40}
          color="var(--color-primary)"
        />
      </div>
      <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
        {certification?.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-3">
        {certification?.issuer}
      </p>
      <div className="inline-flex items-center space-x-1 text-xs text-success">
        <Icon name="CheckCircle" size={14} />
        <span>Certified {certification?.year}</span>
      </div>
    </div>
  );
};

export default CertificationBadge;