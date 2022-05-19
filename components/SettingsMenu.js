import { CirclePicker } from 'react-color';

const SettingsMenu = ({ chatColor, setChatColor }) => {
  const handleChangeComplete = (color) => {
    setChatColor(color.hex);
    /* switch (color.hex) {
      case '#FECACA':
        selected = 'bg-red-200';
        console.log('red');
        break;
      case '#FED7AA':
        selected = 'bg-orange-200';
        break;
      case '#FEF08A':
        selected = 'bg-yellow-200';
        break;
      case '#BBF7D0':
        selected = 'bg-green-200';
        break;
      case '#A5F3FC':
        selected = 'bg-cyan-200';
        break;
      case '#BFDBFE':
        selected = 'bg-blue-200';
        break;
      case '#DDD6FE':
        selected = 'bg-violet-200';
        break;
      case '#FBCFE8':
        selected = 'bg-pink-200';
        break;
      default:
        break;
    } */
  };

  return (
    <CirclePicker
      color={chatColor}
      colors={[
        '#FECACA',
        '#FED7AA',
        '#FEF08A',
        '#BBF7D0',
        '#A5F3FC',
        '#BFDBFE',
        '#DDD6FE',
        '#FBCFE8',
      ]}
      onChangeComplete={handleChangeComplete}
      width="200px"
    />
  );
};

export default SettingsMenu;
