// Styles
import './IconButton.style.css';

interface SearchButtonProps {
  buttonText?: string;
  icon: JSX.Element;
  handleOnClick: () => void;
}

const IconButton: React.FC<SearchButtonProps> = ({
  buttonText,
  icon,
  handleOnClick,
}) => {
  return (
    <button
      onClick={handleOnClick}
      className={'search-button button-render-animation'}
    >
      <div className="glass-and-search">
        {icon}
        {buttonText}
      </div>
    </button>
  );
};
export default IconButton;
