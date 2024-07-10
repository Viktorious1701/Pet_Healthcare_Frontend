/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';

declare module '@/components/team_cards/ThinhAnCard/CardThinhAn' {
  const CardThinhAn: React.ComponentType<{}>; // Use {} if no props, or specify props type
  export default CardThinhAn;
}