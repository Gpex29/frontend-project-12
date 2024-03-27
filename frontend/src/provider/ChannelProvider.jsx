import { useMemo, useState } from 'react';
import ChannelContext from '../context/ChannelContext';

const ChannelProvider = ({ children }) => {
  const [currentChannelId, setCurrentChannelId] = useState('1');
  const chooseChannel = useMemo(() => (id) => setCurrentChannelId(id), []);
  const contextValue = useMemo(
    () => ({ currentChannelId, chooseChannel }),
    [currentChannelId, chooseChannel],
  );

  return (
    <ChannelContext.Provider value={contextValue}>
      {children}
    </ChannelContext.Provider>
  );
};

export default ChannelProvider;
