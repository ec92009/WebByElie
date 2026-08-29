import React from 'react';
import { Series } from 'remotion';
import { PageReassemblyComposition } from './PageReassembly';
import { SeoHarvestComposition } from './SeoHarvest';
import { AioRecommendationsComposition } from './AioRecommendations';
import { SavingsCatComposition } from './SavingsCat';

export const AllFourPreviewComposition: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={330}>
        <PageReassemblyComposition />
      </Series.Sequence>
      <Series.Sequence durationInFrames={330}>
        <SeoHarvestComposition />
      </Series.Sequence>
      <Series.Sequence durationInFrames={330}>
        <AioRecommendationsComposition />
      </Series.Sequence>
      <Series.Sequence durationInFrames={330}>
        <SavingsCatComposition />
      </Series.Sequence>
    </Series>
  );
};
