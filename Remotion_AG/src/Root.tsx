import React from 'react';
import { Composition } from 'remotion';
import { PageReassemblyComposition } from './compositions/PageReassembly';
import { PageReassemblyLandscapeReviewComposition } from './compositions/PageReassemblyLandscapeReview';
import { PageReassemblyPortraitComposition } from './compositions/PageReassemblyPortrait';
import { SeoHarvestComposition } from './compositions/SeoHarvest';
import { SeoHarvestPortraitComposition } from './compositions/SeoHarvestPortrait';
import { AioRecommendationsComposition } from './compositions/AioRecommendations';
import { AioRecommendationsPortraitComposition } from './compositions/AioRecommendationsPortrait';
import { SavingsCatComposition } from './compositions/SavingsCat';
import { AllFourPreviewComposition } from './compositions/AllFourPreview';
import { CostEfficiency } from './compositions/CostEfficiency';
import { CostEfficiencyPortraitComposition } from './compositions/CostEfficiencyPortrait';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PageReassembly"
        component={PageReassemblyComposition}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="PageReassemblyPortrait"
        component={PageReassemblyPortraitComposition}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1440}
      />
      <Composition
        id="PageReassemblyLandscapeReview"
        component={PageReassemblyLandscapeReviewComposition}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SeoHarvestPortrait"
        component={SeoHarvestPortraitComposition}
        durationInFrames={330}
        fps={30}
        width={1080}
        height={1440}
      />
      <Composition
        id="AioRecommendationsPortrait"
        component={AioRecommendationsPortraitComposition}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1440}
      />
      <Composition
        id="CostEfficiencyPortrait"
        component={CostEfficiencyPortraitComposition}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1440}
      />
      <Composition
        id="SeoHarvest"
        component={SeoHarvestComposition}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AioRecommendations"
        component={AioRecommendationsComposition}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SavingsCat"
        component={SavingsCatComposition}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AllFourPreview"
        component={AllFourPreviewComposition}
        durationInFrames={1320}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CostEfficiency"
        component={CostEfficiency}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
