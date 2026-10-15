'use client';

import React from 'react';
import { Coordinates, Restaurant, DistanceRadius } from '@/types/restaurant';
import { KakaoMapView } from './KakaoMapView';

interface MapContainerProps {
  center: Coordinates;
  centerName: string;
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  radiusFilter: DistanceRadius;
}

export function MapContainer({
  center,
  centerName,
  restaurants,
  selectedRestaurant,
  onSelectRestaurant,
  radiusFilter,
}: MapContainerProps) {
  return (
    <KakaoMapView
      center={center}
      centerName={centerName}
      restaurants={restaurants}
      selectedRestaurant={selectedRestaurant}
      onSelectRestaurant={onSelectRestaurant}
      radiusFilter={radiusFilter}
    />
  );
}
