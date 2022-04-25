import cx from 'classnames';
import React, { FC } from 'react';
import { IScoreProps } from './interfaces';
import Text from '../text';
import Heading from '../heading';
import Link from '../link';
import Tile from '../../molecules/tile';
import { TSize } from '../../../types/size';

const variables = {
  scoreSize: 120,
  scoreStrokeWidth: 12,
};

const successScore = (textSize?: TSize) => (
  <Text size={textSize || 'regular'} color="black">
    You’ve scored extremely high on your eligibility check.
  </Text>
);

const partialScore = (score: number, textSize?: TSize) => (
  <Text size={textSize || 'regular'} color="black">
    You’ve scored high on your eligibility check.
  </Text>
);

const failScore = (textSize?: TSize) => (
  <>
    <Text size={textSize || 'regular'} color="black">
      You’ve scored slightly under average on your eligibility check.
    </Text>
    <Heading tag="span" color="black" size="regular">
      Call{` `}
      <Link className="InfinityNumber" color="teal" href="01442838195">
        01442 838 195
      </Link>
    </Heading>
  </>
);

const Score: FC<IScoreProps> = props => {
  const { score, className, textSize } = props;
  const actualScore = Math.max(Math.min(100, score), 0);
  const size = variables.scoreSize;
  const strokeWidth = variables.scoreStrokeWidth;
  const halfSize = size / 2;
  const rItem = halfSize - strokeWidth / 2;
  const circumference = 2 * Math.PI * rItem;
  const visibleProportion = 0.75;
  const scorePercentage = actualScore / 100;

  const selectScore = () => {
    if (actualScore <= 50) {
      return failScore(textSize);
    }
    if (actualScore >= 90) {
      return successScore(textSize);
    }
    return partialScore(actualScore, textSize);
  };

  return (
    <div className={cx(`score`, className)}>
      <Tile centered>
        <div className="score-indicator--wrapper">
          <svg
            className="score-indicator"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
          >
            <defs>
              <linearGradient
                id="progress-stops"
                gradientTransform="rotate(-90)"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="var(--stop-1)" />
                <stop offset="50%" stopColor="var(--stop-2)" />
                <stop offset="90%" stopColor="var(--stop-3)" />
                <stop offset="100%" stopColor="var(--stop-4)" />
              </linearGradient>
            </defs>
            <circle
              className="score-indicator--progress"
              cx={halfSize}
              cy={halfSize}
              r={rItem}
              fill="none"
              strokeWidth={strokeWidth}
            />
            <circle
              className="score-indicator--track"
              cx={halfSize}
              cy={halfSize}
              r={rItem}
              fill="none"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference * visibleProportion * scorePercentage
              }
              transform={`rotate(${135 +
                360 *
                  scorePercentage *
                  visibleProportion} ${halfSize} ${halfSize})`}
            />
          </svg>
          <Heading tag="span" color="black" size="large">
            {actualScore}%
          </Heading>
        </div>
        <div className="-distribute-content">{selectScore()}</div>
      </Tile>
    </div>
  );
};

export default React.memo(Score);
