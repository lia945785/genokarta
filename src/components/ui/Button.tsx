import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { IconComponent } from './icons';
import './Button.css';

/**
 * Кнопка з дизайн-системи Untitled UI (https://www.untitledui.com/react/components/buttons,
 * ліцензія MIT). API повторює оригінал: color, size, iconLeading, iconTrailing,
 * isLoading, isDisabled. Оригінал побудовано на Tailwind CSS і React Aria; тут ті самі
 * розміри, кольори й тіні перенесено у звичайний CSS (Button.css), щоб не тягнути в
 * проєкт Tailwind заради одного компонента. Перейти на оригінал можна, змінивши імпорт.
 */
export type ButtonColor = 'primary' | 'secondary' | 'tertiary' | 'link-color' | 'link-gray';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'disabled'> {
  color?: ButtonColor;
  size?: ButtonSize;
  iconLeading?: IconComponent;
  iconTrailing?: IconComponent;
  isLoading?: boolean;
  isDisabled?: boolean;
  /** Показувати текст поруч зі спінером під час завантаження. */
  showTextWhileLoading?: boolean;
  children?: ReactNode;
}

export function Button({
  color = 'primary',
  size = 'sm',
  iconLeading: IconLeading,
  iconTrailing: IconTrailing,
  isLoading = false,
  isDisabled = false,
  showTextWhileLoading = false,
  className = '',
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  const isIconOnly = !children && Boolean(IconLeading || IconTrailing);
  const classes = [
    'btn',
    `btn--${size}`,
    `btn--${color}`,
    isIconOnly ? 'btn--icon-only' : '',
    isLoading ? 'is-loading' : '',
    isLoading && showTextWhileLoading ? 'is-loading-text' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      {...props}
      type={type}
      className={classes}
      disabled={isDisabled || isLoading}
      aria-busy={isLoading || undefined}
    >
      {/* Під час завантаження індикатор займає місце іконки, а не стоїть поруч із нею. */}
      {IconLeading && !isLoading && <IconLeading className="btn__icon" data-icon="leading" />}
      {isLoading && (
        <svg className="btn__icon btn__spinner" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="8" strokeWidth="2" stroke="currentColor" opacity="0.3" />
          <circle
            cx="10"
            cy="10"
            r="8"
            strokeWidth="2"
            stroke="currentColor"
            strokeDasharray="12.5 50"
            strokeLinecap="round"
          />
        </svg>
      )}
      {children && <span className="btn__text">{children}</span>}
      {IconTrailing && <IconTrailing className="btn__icon" data-icon="trailing" />}
    </button>
  );
}
