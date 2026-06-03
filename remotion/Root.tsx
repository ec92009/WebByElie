import React from 'react';
import {Composition} from 'remotion';
import {WebByElieExplainer} from './WebByElieExplainer';

export const Root: React.FC = () => {
  return (
    <Composition
      id="WebByElieExplainer"
      component={WebByElieExplainer}
      durationInFrames={1980}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
