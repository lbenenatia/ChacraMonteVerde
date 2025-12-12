import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = () => {
  const weatherData = {
    current: {
      temp: 24,
      condition: 'Partly Cloudy',
      icon: 'CloudSun',
      humidity: 65,
      wind: 12
    },
    forecast: [
      { day: 'Mon', temp: 26, icon: 'Sun' },
      { day: 'Tue', temp: 23, icon: 'Cloud' },
      { day: 'Wed', temp: 25, icon: 'CloudSun' },
      { day: 'Thu', temp: 22, icon: 'CloudRain' }
    ],
    recommendations: [
      { activity: 'Garden Events', suitable: true },
      { activity: 'Pool Activities', suitable: true },
      { activity: 'Outdoor Dining', suitable: true }
    ]
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-organic-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl font-semibold text-foreground">
          Weather Forecast
        </h3>
        <div className="text-xs text-muted-foreground">
          Monte Verde Estate
        </div>
      </div>
      <div className="flex items-center space-x-6 mb-6 pb-6 border-b border-border">
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center">
          <Icon
            name={weatherData?.current?.icon}
            size={40}
            color="var(--color-accent)"
          />
        </div>
        <div>
          <div className="text-4xl font-bold text-foreground mb-1">
            {weatherData?.current?.temp}°C
          </div>
          <div className="text-sm text-muted-foreground">
            {weatherData?.current?.condition}
          </div>
          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Droplets" size={12} />
              <span>{weatherData?.current?.humidity}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Wind" size={12} />
              <span>{weatherData?.current?.wind} km/h</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {weatherData?.forecast?.map((day, index) => (
          <div key={index} className="text-center">
            <div className="text-xs text-muted-foreground mb-2">{day?.day}</div>
            <div className="w-10 h-10 mx-auto bg-muted rounded-lg flex items-center justify-center mb-2">
              <Icon name={day?.icon} size={20} color="var(--color-primary)" />
            </div>
            <div className="text-sm font-medium text-foreground">{day?.temp}°</div>
          </div>
        ))}
      </div>
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">
          Activity Recommendations
        </h4>
        <div className="space-y-2">
          {weatherData?.recommendations?.map((rec, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{rec?.activity}</span>
              <div className={`flex items-center space-x-1 ${rec?.suitable ? 'text-success' : 'text-warning'}`}>
                <Icon name={rec?.suitable ? 'CheckCircle' : 'AlertCircle'} size={14} />
                <span className="text-xs">{rec?.suitable ? 'Ideal' : 'Check'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;