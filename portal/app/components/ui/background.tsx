// components/BackgroundWrapper.js
import PropTypes from 'prop-types';

const BackgroundWrapper = ({ isDark = false, children }: Readonly<{
    children: React.ReactNode;
  }>) => {
  // 使用动态类名根据 isDark 的值设置背景
  const className = [
    'absolute inset-0',
    isDark ? 'bg-dark dark:bg-transparent' : '',
  ].join(' ');

  return <div className={className}>{children}</div>;
};

BackgroundWrapper.propTypes = {
  isDark: PropTypes.bool,
  children: PropTypes.node.isRequired, // 确保 children 被传递
};

export default BackgroundWrapper;
