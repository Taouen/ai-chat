import { CirclePicker } from 'react-color';

const ColorPicker = ({ chatColor, setChatColor }) => {
  const handleChangeComplete = (color) => {
    setChatColor(color.hex);
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
      width="85px"
    />
  );
};

export default ColorPicker;
