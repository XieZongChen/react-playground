import classnames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';

import styles from './index.module.scss';

export interface FileNameItemProps {
  value: string;
  actived: boolean;
  creating: boolean;
  onClick: () => void;
  onEditComplete: (name: string) => void;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, actived = false, creating, onClick, onEditComplete } = props;

  const [name, setName] = useState(value);
  const [editing, setEditing] = useState(false);
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
        <span onDoubleClick={handleDoubleClick}>{name}</span>
      )}
    </div>
  );
};
