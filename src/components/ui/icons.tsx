import type { JSX, ReactNode, SVGProps } from 'react';
import type { DiseaseId } from '../../domain/types';

export type IconProps = SVGProps<SVGSVGElement> & { className?: string };
export type IconComponent = (props: IconProps) => JSX.Element;

function Icon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const UploadIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M17 8l-5-5-5 5" />
    <path d="M12 3v12" />
  </Icon>
);

export const FileIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M9 13h6M9 17h4" />
  </Icon>
);

export const ArrowRightIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

export const ArrowLeftIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </Icon>
);

export const DownloadIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M7 10l5 5 5-5" />
    <path d="M12 15V3" />
  </Icon>
);

export const RefreshIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
    <path d="M3 21v-5h5" />
  </Icon>
);

export const EditIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
  </Icon>
);

export const ShieldIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </Icon>
);

export const CheckIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M20 6L9 17l-5-5" />
  </Icon>
);

export const AlertIcon: IconComponent = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4M12 16h.01" />
  </Icon>
);

export const InfoIcon: IconComponent = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-4M12 8h.01" />
  </Icon>
);

export const HomeIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
  </Icon>
);

export const DnaIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M7 3c0 6 10 6 10 12s-4 6-4 6" />
    <path d="M17 3c0 6-10 6-10 12s4 6 4 6" />
    <path d="M8.5 7h7M8.5 17h7M10 12h4" />
  </Icon>
);

export const LeafIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M11 20A7 7 0 0 1 4 13c0-6 6-9 16-10-1 10-4 16-9 17z" />
    <path d="M4 21c4-6 7-9 11-11" />
  </Icon>
);

export const ReportIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M3 3v18h18" />
    <path d="M7 15l4-4 3 3 5-6" />
  </Icon>
);

export const HeartIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
  </Icon>
);

export const DropletIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M12 2.7l5.7 5.7a8 8 0 1 1-11.3 0z" />
  </Icon>
);

export const PulseIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </Icon>
);

export const BrainIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M9.5 3A2.5 2.5 0 0 0 7 5.5v.1A3 3 0 0 0 4.5 10a3 3 0 0 0 .5 5.4A3 3 0 0 0 9.5 20h.5V3.5z" />
    <path d="M14.5 3A2.5 2.5 0 0 1 17 5.5v.1a3 3 0 0 1 2.5 4.4 3 3 0 0 1-.5 5.4 3 3 0 0 1-4.5 4.6H14V3.5z" />
  </Icon>
);

export const GaugeIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M3.5 17a9 9 0 1 1 17 0" />
    <path d="M12 14l4-5" />
    <circle cx="12" cy="14.5" r="1.2" />
  </Icon>
);

export const ZapIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
  </Icon>
);

export const ArrhythmiaIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M2 12h3l2-3 2 6 2-9 2 11 2-8 2 5 1-2h4" />
  </Icon>
);

export const IntestineIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M6 20V8a4 4 0 0 1 4-4h6a3 3 0 0 1 0 6h-5a2 2 0 0 0 0 4h5a3 3 0 0 1 0 6h-3" />
  </Icon>
);

export const LungsIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M12 3v8M12 11l-3 2M12 11l3 2" />
    <path d="M8.5 7C5 7 3 12 3 17a3 3 0 0 0 4 2.8l2.5-1V9a2 2 0 0 0-1-2z" />
    <path d="M15.5 7C19 7 21 12 21 17a3 3 0 0 1-4 2.8l-2.5-1V9a2 2 0 0 1 1-2z" />
  </Icon>
);

export const DISEASE_ICON: Record<DiseaseId, IconComponent> = {
  cad: HeartIcon,
  stroke: ZapIcon,
  afib: ArrhythmiaIcon,
  hypertension: GaugeIcon,
  t2d: DropletIcon,
  crc: IntestineIcon,
  asthma: LungsIcon,
  alzheimer: BrainIcon,
};
