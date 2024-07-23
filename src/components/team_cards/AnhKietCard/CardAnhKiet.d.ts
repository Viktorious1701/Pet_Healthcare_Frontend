/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';

declare module '@/components/team_cards/AnhKietCard/CardAnhKiet' {
  const CardAnhKiet: React.ComponentType<{}>; // Use {} if no props, or specify props type
  export default CardAnhKiet;
}
