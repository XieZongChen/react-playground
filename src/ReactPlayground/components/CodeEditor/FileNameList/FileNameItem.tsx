import classnames from 'classnames';
import React, { useState, useRef, useEffect, MouseEventHandler } from 'react';

import styles from './index.module.scss';

export interface FileNameItemProps {
  value: string;
  actived: boolean;
  creating: boolean;
  onClick: () => void;
  onEditComplete: (name: string) => void;
  onRemove: MouseEventHandler;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const {
    value,
    actived = false,
    creating,
    onClick,
    onRemove,
    onEditComplete,
  } = props;

  const [name, setName] = useState(value);
  const [editing, setEditing] = useState(creating);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 0);
  };

  const handleInputBlur = () => {
    setEditing(false);
    onEditComplete(name);
  };

  useEffect(() => {
    if (creating) {
      inputRef?.current?.focus();
    }
  }, [creating]);

  return (
    <div
      className={classnames(
        styles['tab-item'],
        actived ? styles.actived : null
      )}
      onClick={onClick}
    >
      {editing ? (
        <input
          ref={inputRef}
          className={styles['tabs-item-input']}
          value={name}
          onBlur={handleInputBlur}
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <>
          <span onDoubleClick={handleDoubleClick}>{name}</span>
          <span style={{ marginLeft: 5, display: 'flex' }} onClick={onRemove}>
            <svg width='12' height='12' viewBox='0 0 24 24'>
              <line stroke='#999' x1='18' y1='6' x2='6' y2='18'></line>
              <line stroke='#999' x1='6' y1='6' x2='18' y2='18'></line>
            </svg>
          </span>
        </>
      )}
    </div>
  );
};
