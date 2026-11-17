import type { ReactNode } from 'react';
import { resolveRoute, type FlowState, type Route } from '../routing/routes';
import { FileIcon, HomeIcon, LeafIcon, ReportIcon, ShieldIcon, type IconComponent } from './ui/icons';
import './AppShell.css';

interface NavItem {
  route: Route;
  label: string;
  icon: IconComponent;
}

const NAV: readonly NavItem[] = [
  { route: 'home', label: 'Огляд', icon: HomeIcon },
  { route: 'upload', label: 'Файл ДНК', icon: FileIcon },
  { route: 'lifestyle', label: 'Спосіб життя', icon: LeafIcon },
  { route: 'results', label: 'Звіт', icon: ReportIcon },
];

interface AppShellProps {
  route: Route;
  flow: FlowState;
  reportStale: boolean;
  fileName: string | null;
  onNavigate: (route: Route) => void;
  children: ReactNode;
}

function statusText(route: Route, flow: FlowState, reportStale: boolean, fileName: string | null): string {
  switch (route) {
    case 'home':
      return 'Як це працює';
    case 'upload':
      return fileName ?? 'Файл ще не додано';
    case 'lifestyle':
      if (!flow.hasFile || !flow.hasDiseases) return 'Спершу додайте файл';
      if (!flow.hasReport) return 'Чекає відповідей';
      return reportStale ? 'Зміни ще не у звіті' : 'Відповіді у звіті';
    case 'results':
      if (!flow.hasReport) return 'Ще не сформовано';
      return reportStale ? 'Потребує оновлення' : 'Звіт готовий';
  }
}

function BrandMark() {
  return (
    <span className="brand__mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="square">
        <path className="brand__strand-a" d="M7 3c0 6 10 6 10 12s-4 6-4 6" />
        <path className="brand__strand-b" d="M17 3c0 6-10 6-10 12s4 6 4 6" />
      </svg>
    </span>
  );
}

export function AppShell({ route, flow, reportStale, fileName, onNavigate, children }: AppShellProps) {
  return (
    <div className="shell">
      <aside className="sidebar no-print">
        <a href="#" className="brand">
          <BrandMark />
          <span className="brand__text">
            <span className="brand__name">Генокарта</span>
            <span className="brand__tag">гени й спосіб життя</span>
          </span>
        </a>

        <nav aria-label="Етапи аналізу" className="sidebar__nav">
          <ul className="nav">
            {NAV.map((item) => {
              const available = resolveRoute(item.route, flow) === item.route;
              const active = item.route === route;
              const Icon = item.icon;
              return (
                <li key={item.route}>
                  <button
                    type="button"
                    className={`nav__item ${active ? 'is-active' : ''}`}
                    aria-current={active ? 'page' : undefined}
                    disabled={!available}
                    onClick={() => onNavigate(item.route)}
                  >
                    <span className="nav__icon">
                      <Icon />
                    </span>
                    <span className="nav__text">
                      <span className="nav__label">{item.label}</span>
                      <span className={`nav__status ${item.route === 'upload' && fileName ? 'mono' : ''}`}>
                        {statusText(item.route, flow, reportStale, fileName)}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="privacy-card">
          <ShieldIcon />
          <p className="privacy-card__title">Файл не залишає пристрій</p>
          <p className="privacy-card__text">
            Файл ДНК перевіряється у вашому браузері, а відповіді анкети зникають після закриття
            вкладки.
          </p>
        </div>

      </aside>

      <div className="shell__main">{children}</div>
    </div>
  );
}
