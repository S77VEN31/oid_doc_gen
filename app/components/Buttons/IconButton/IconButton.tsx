// Styles
import './IconButton.style.css';
import { classes } from '@/global/handleClassnames';
interface SearchButtonProps {
  buttonText?: string;
  buttonClassname?: string | null;
  icon?: JSX.Element;
  key?: number;
  handleOnClick: () => void;
}

const IconButton: React.FC<SearchButtonProps> = ({
  buttonText,
  buttonClassname = null,
  icon,
  handleOnClick,
}) => {
  return (
    <button
      onClick={handleOnClick}
      className={classes(['button', buttonClassname])}
    >
      {icon}
      {buttonText}
    </button>
  );
};
export default IconButton;
