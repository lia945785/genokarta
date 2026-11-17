import { geneticCategory } from '../../domain/genetics';
import './PercentileBar.css';

const MINOR_TICKS = [10, 30, 40, 50, 60, 70, 90];
const MAJOR_TICKS = [0, 20, 80, 100];

export function PercentileBar({ percentile }: { percentile: number }) {
  const value = Math.min(Math.max(percentile, 0), 100);
  const category = geneticCategory(value);

  return (
    <figure className={`gauge gauge--${category}`}>
      <div
        className="gauge__track"
        role="img"
        aria-label={`Перцентиль ${Math.round(value)} зі 100. Низька зона до 20, середня від 20 до 80, висока від 80.`}
      >
        <span className="gauge__fill" style={{ width: `${value}%` }} />
        <span className="gauge__cursor" style={{ left: `${value}%` }} />
      </div>
      <div className="gauge__bands" aria-hidden="true">
        <span className="gauge__band gauge__band--low" />
        <span className="gauge__band gauge__band--intermediate" />
        <span className="gauge__band gauge__band--high" />
      </div>
      <div className="gauge__ticks" aria-hidden="true">
        {MINOR_TICKS.map((tick) => (
          <span key={tick} className="gauge__tick" style={{ left: `${tick}%` }} />
        ))}
        {MAJOR_TICKS.map((tick) => (
          <span key={tick} className="gauge__tick gauge__tick--major" style={{ left: `${tick}%` }}>
            <span
              className={`gauge__tick-label ${tick === 0 ? 'gauge__tick-label--start' : ''} ${tick === 100 ? 'gauge__tick-label--end' : ''}`}
            >
              {tick}
            </span>
          </span>
        ))}
      </div>
      <div className="gauge__zones" aria-hidden="true">
        <span className="gauge__zone gauge__zone--low">низька</span>
        <span className="gauge__zone gauge__zone--intermediate">середня</span>
        <span className="gauge__zone gauge__zone--high">висока</span>
      </div>
    </figure>
  );
}
