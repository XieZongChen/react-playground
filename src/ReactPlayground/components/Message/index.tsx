import classnames from 'classnames';
import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';

export interface MessageProps {
  type: 'error' | 'warn'; // 错误类型
  content: string; // 错误内容
}

export const Message: React.FC<MessageProps> = (props) => {
  const { type, content } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!!content);
  }, [content]);

  return visible ? (
    <div className={classnames(styles.msg, styles[type])}>
      {/* 保证错误内容的格式 */}
      <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
      <button className={styles.dismiss} onClick={() => setVisible(false)}>
        ✕
      </button>
    </div>
  ) : null;
};
