import { useId, useState } from 'react';
import { markerContribution, sortMarkers, type SortDirection } from '../../domain/genetics';
import type { Marker } from '../../domain/types';
import { formatNumber, formatSigned } from '../../utils/format';
import './MarkersTable.css';

/** Генотип у вигляді моноширинного бейджа; ефектні алелі підсвічено. */
function Genotype({ genotype, effectAllele }: { genotype: string; effectAllele: string }) {
  return (
    <span className="geno">
      {[...genotype].map((letter, index) => (
        <span key={index} className={letter === effectAllele ? 'geno__allele is-effect' : 'geno__allele'}>
          {letter}
        </span>
      ))}
    </span>
  );
}

export function MarkersTable({ markers }: { markers: readonly Marker[] }) {
  const captionId = useId();
  const [direction, setDirection] = useState<SortDirection>('desc');
  const rows = sortMarkers(markers, direction);

  return (
    <div className="markers-block">
      <div className="table-wrap" role="region" aria-labelledby={captionId} tabIndex={0}>
        <table className="markers">
          <caption id={captionId}>Маркери з найбільшим внеском</caption>
          <thead>
            <tr>
              <th scope="col">Маркер</th>
              <th scope="col">Ген</th>
              <th scope="col">Генотип</th>
              <th scope="col">Ефект. алель</th>
              <th scope="col" className="num">
                Вага
              </th>
              <th
                scope="col"
                className="num"
                aria-sort={direction === 'desc' ? 'descending' : 'ascending'}
              >
                <button
                  type="button"
                  className="sort-button"
                  onClick={() => setDirection(direction === 'desc' ? 'asc' : 'desc')}
                >
                  Внесок
                  <span aria-hidden="true">{direction === 'desc' ? '↓' : '↑'}</span>
                  <span className="visually-hidden">
                    , змінити порядок сортування
                  </span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((marker) => {
              const contribution = markerContribution(marker);
              return (
                <tr key={marker.rsid}>
                  <td className="mono rsid">{marker.rsid}</td>
                  <td className="gene">{marker.gene}</td>
                  <td>
                    <Genotype genotype={marker.genotype} effectAllele={marker.effectAllele} />
                  </td>
                  <td className="mono">{marker.effectAllele}</td>
                  <td className="num">{formatNumber(marker.weight)}</td>
                  <td className="num">
                    <span
                      className={
                        contribution < 0
                          ? 'contribution contribution--protective'
                          : contribution === 0
                            ? 'contribution contribution--zero'
                            : 'contribution'
                      }
                    >
                      {formatSigned(contribution)}
                    </span>
                    {contribution < 0 && <span className="contribution-tag">знижує</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="table-note">
        Ефектний алель — варіант гена, який у дослідженнях пов’язаний із вищим ризиком. Внесок =
        кількість ефектних алелів у вашому генотипі × вага маркера. Ефектні алелі в генотипі
        підсвічено. Ваги в демо-версії умовні.
      </p>
    </div>
  );
}
