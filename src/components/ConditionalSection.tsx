import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  isVisible: boolean;
}

const ConditionalSection = ({ children, isVisible }: Props) => {
  return isVisible ? <>{children}</> : null;
};

export default ConditionalSection;
