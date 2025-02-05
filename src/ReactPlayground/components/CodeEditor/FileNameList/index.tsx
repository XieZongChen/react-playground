import { useContext, useEffect, useState } from 'react';
import { ENTRY_FILE_NAME } from '@/ReactPlayground/files';
import { PlaygroundContext } from '../../../PlaygroundContext';
import { FileNameItem } from './FileNameItem';
import styles from './index.module.scss';

export default function FileNameList() {
  const {
    files,
    removeFile,
    addFile,
    updateFileName,
    selectedFileName,
    setSelectedFileName,
  } = useContext(PlaygroundContext);

  const [tabs, setTabs] = useState(['']);

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  const handleEditComplete = (name: string, prevName: string) => {
    updateFileName(prevName, name);
    setSelectedFileName(name);

    setCreating(false);
  };

  const [creating, setCreating] = useState(false);

  const addTab = () => {
    const newFileName = 'Comp' + Math.random().toString().slice(2, 8) + '.tsx';
    addFile(newFileName);
    setSelectedFileName(newFileName);
    setCreating(true);
  };

  const handleRemove = (name: string) => {
    removeFile(name);
    setSelectedFileName(ENTRY_FILE_NAME);
  };

  return (
    <div className={styles.tabs}>
      {tabs.map((item, index, arr) => (
        <FileNameItem
          key={item + index}
          value={item}
          creating={creating && index === arr.length - 1}
          actived={selectedFileName === item}
          onClick={() => setSelectedFileName(item)}
          onEditComplete={(name: string) => handleEditComplete(name, item)}
          onRemove={(e) => {
            e.stopPropagation();
            handleRemove(item);
          }}
        ></FileNameItem>
      ))}
      <div className={styles.add} onClick={addTab}>
        +
      </div>
    </div>
  );
}
