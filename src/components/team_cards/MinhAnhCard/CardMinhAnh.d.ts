/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';

declare module '@/components/team_cards/MinhAnhCard/CardMinhAnh' {
  const CardMinhAnh: React.ComponentType<{}>; // Use {} if no props, or specify props type
  export default CardMinhAnh;
}