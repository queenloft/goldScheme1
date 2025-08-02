import {FontAwesome } from '@react-native-vector-icons/fontawesome';


const RenderIcon = ({ name, color, size }) => {
  return <FontAwesome  name={name} color={color} size={size} />;
};

export default RenderIcon;