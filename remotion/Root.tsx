import React from 'react';
import {Composition} from 'remotion';
import {WebByElieExplainer} from './WebByElieExplainer';
import {NotebookLmExplainer, NOTEBOOK_LM_TOTAL_FRAMES} from './NotebookLmExplainer';
import {TOTAL_FRAMES} from './narration.generated';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="WebByElieExplainer"
        component={WebByElieExplainer}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="NotebookLmExplainer"
        component={NotebookLmExplainer}
        durationInFrames={NOTEBOOK_LM_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
