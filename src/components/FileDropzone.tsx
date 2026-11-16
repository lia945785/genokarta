import { useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { FORMAT_LABEL, inspectGenomeFile } from '../domain/fileValidation';
import type { GenomeFileInfo } from '../domain/types';
import { formatFileSize, formatInt } from '../utils/format';
import { Button } from './ui/Button';
import { CheckIcon, RefreshIcon, UploadIcon } from './ui/icons';
import './FileDropzone.css';

/** Стани зони завантаження (див. docs/upload-states.png). */
type DropzoneStatus = 'idle' | 'dragOver' | 'checking' | 'error';

interface FileDropzoneProps {
  file: GenomeFileInfo | null;
  onAccepted: (file: GenomeFileInfo) => void;
  onCleared: () => void;
  /** Почалася перевірка нового файлу: сторінка ховає застарілі помилки на кшталт «Спершу додайте файл». */
  onCheckStarted?: () => void;
}

const DEMO_FILE_NAME = 'demo-genome.txt';

export function FileDropzone({ file, onAccepted, onCleared, onCheckStarted }: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<DropzoneStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  async function checkFile(selected: File) {
    onCheckStarted?.();
    setStatus('checking');
    setError(null);
    const result = await inspectGenomeFile(selected);
    if (result.ok) {
      setStatus('idle');
      onAccepted({
        name: selected.name,
        sizeBytes: selected.size,
        format: result.format,
        markerCount: result.markerCount,
      });
    } else {
      setError(result.error);
      setStatus('error');
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    // Скидаємо значення, щоб повторний вибір того самого файлу теж спрацював.
    event.target.value = '';
    if (selected) void checkFile(selected);
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (status !== 'checking') setStatus('dragOver');
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    setStatus(error ? 'error' : 'idle');
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const dropped = event.dataTransfer.files[0];
    if (dropped) {
      void checkFile(dropped);
    } else {
      setStatus(error ? 'error' : 'idle');
    }
  }

  async function loadDemoFile() {
    onCheckStarted?.();
    setStatus('checking');
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}${DEMO_FILE_NAME}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      await checkFile(new File([blob], DEMO_FILE_NAME, { type: 'text/plain' }));
    } catch {
      setError('Не вдалося відкрити демо-файл. Оновіть сторінку й спробуйте ще раз або додайте власний файл.');
      setStatus('error');
    }
  }

  if (file) {
    return (
      <div className="file-ready" role="status">
        <div className="file-ready__head">
          <span className="file-ready__badge" aria-hidden="true">
            <CheckIcon />
          </span>
          <div className="file-ready__title">
            <p className="file-ready__name mono">{file.name}</p>
            <p className="file-ready__caption">Файл перевірено, можна переходити далі</p>
          </div>
          <Button color="secondary" size="sm" iconLeading={RefreshIcon} onClick={onCleared}>
            Замінити файл
          </Button>
        </div>
        <dl className="file-facts">
          <div className="tile">
            <dt>Формат</dt>
            <dd>{FORMAT_LABEL[file.format]}</dd>
          </div>
          <div className="tile">
            <dt>Маркерів</dt>
            <dd className="num">{formatInt(file.markerCount)}</dd>
          </div>
          <div className="tile">
            <dt>Розмір</dt>
            <dd className="num">{formatFileSize(file.sizeBytes)}</dd>
          </div>
        </dl>
        <p className="field-hint">
          Демо-версія: генетична частина звіту складається з прикладових даних, а не з цього файлу.
        </p>
      </div>
    );
  }

  const title =
    status === 'checking'
      ? 'Перевіряємо файл…'
      : status === 'dragOver'
        ? 'Відпустіть файл, щоб перевірити його'
        : 'Перетягніть файл сюди';

  return (
    <div className="dropzone-wrap">
      <div
        className={`dropzone ${status === 'dragOver' ? 'dropzone--over' : ''} ${status === 'error' ? 'dropzone--error' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        aria-busy={status === 'checking'}
      >
        <span className="dropzone__icon" aria-hidden="true">
          <UploadIcon />
        </span>
        <p className="dropzone__title" aria-live="polite">
          {title}
        </p>
        <p className="dropzone__hint">Сирі дані 23andMe, AncestryDNA, MyHeritage або VCF до 50 МБ</p>
        <p className="dropzone__formats" aria-hidden="true">
          .txt .csv .tsv .vcf
        </p>
        <Button
          color="primary"
          size="md"
          iconLeading={UploadIcon}
          onClick={() => inputRef.current?.click()}
          isLoading={status === 'checking'}
          showTextWhileLoading
        >
          Обрати файл
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept=".txt,.csv,.tsv,.vcf"
          hidden
          onChange={handleInputChange}
          data-testid="genome-input"
        />
      </div>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
      <p className="dropzone__demo">
        Немає файлу під рукою?{' '}
        <Button color="link-color" onClick={loadDemoFile} isDisabled={status === 'checking'}>
          Скористатися демо-файлом
        </Button>
      </p>
    </div>
  );
}
