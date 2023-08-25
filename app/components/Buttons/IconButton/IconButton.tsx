// Styles
import './IconButton.style.css';
// Global
import { classes } from '@/global/handleClassnames';

interface SearchButtonProps {
  buttonText?: string;
  buttonClassname?: string | null;
  icon?: JSX.Element;
  key?: number;
  disabled?: boolean;
  handleOnClick: () => void;
}

const IconButton: React.FC<SearchButtonProps> = ({
  buttonText,
  buttonClassname = null,
  icon,
  disabled = false,
  handleOnClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={handleOnClick}
      className={classes(['button', buttonClassname])}
    >
      {icon}
      {buttonText}
    </button>
  );
};
export default IconButton;
