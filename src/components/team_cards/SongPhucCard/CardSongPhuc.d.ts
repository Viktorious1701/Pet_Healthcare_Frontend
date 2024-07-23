/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';

declare module '@/components/team_cards/SongPhucCard/CardSongPhuc' {
  const CardSongPhuc: React.ComponentType<{}>; // Use {} if no props, or specify props type
  export default CardSongPhuc;
}
